const express = require('express');
const router = express.Router();
const Procurement = require('../models/Procurement');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

/**
 * GET /api/v1/procurement/:bookingId
 */
router.get('/:bookingId', async (req, res) => {
  try {
    const procurement = await Procurement.findOne({ bookingId: req.params.bookingId });
    if (!procurement) {
      return res.status(404).json({ success: false, message: 'Procurement record not found' });
    }
    return res.json({ success: true, data: procurement });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/v1/procurement/:bookingId/verify
 * Stage 3: Document Verification
 */
router.post('/:bookingId/verify', async (req, res) => {
  try {
    const { verifiedBy = 'Operator Sharma', notes } = req.body;
    const procurement = await Procurement.findOneAndUpdate(
      { bookingId: req.params.bookingId },
      {
        verification: {
          status: 'VERIFIED',
          verifiedBy,
          verifiedAt: new Date(),
          notes,
        },
      },
      { new: true }
    );
    await Booking.findByIdAndUpdate(req.params.bookingId, { status: 'VERIFIED' });
    return res.json({ success: true, data: procurement });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/v1/procurement/:bookingId/quality
 * Stage 4: Quality Inspection
 */
router.post('/:bookingId/quality', async (req, res) => {
  try {
    const { grade = 'GRADE_A', moisturePercentage = 11.2, foreignMatterPercentage = 0.8, inspectorId = 'QI-402' } = req.body;
    const procurement = await Procurement.findOneAndUpdate(
      { bookingId: req.params.bookingId },
      {
        quality: {
          status: grade === 'REJECTED' ? 'REJECTED' : grade,
          grade: grade === 'GRADE_A' ? 'A (FAQ)' : 'B (Acceptable)',
          moisturePercentage,
          foreignMatterPercentage,
          inspectorId,
          checkedAt: new Date(),
        },
      },
      { new: true }
    );
    await Booking.findByIdAndUpdate(req.params.bookingId, {
      status: grade === 'REJECTED' ? 'REJECTED' : 'QUALITY_CHECK',
    });
    return res.json({ success: true, data: procurement });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/v1/procurement/:bookingId/weigh
 * Stage 5: Weighbridge Capture
 */
router.post('/:bookingId/weigh', async (req, res) => {
  try {
    const { grossWeightKg = 5200, tareWeightKg = 1200, weighbridgeId = 'WB-01' } = req.body;
    const netWeightKg = grossWeightKg - tareWeightKg;
    const quantityQuintals = Math.round((netWeightKg / 100) * 100) / 100;

    const baseMspRate = 4892; // e.g. Soybean MSP per quintal
    const totalAmount = Math.round(quantityQuintals * baseMspRate);

    const procurement = await Procurement.findOneAndUpdate(
      { bookingId: req.params.bookingId },
      {
        weighing: {
          grossWeightKg,
          tareWeightKg,
          netWeightKg,
          quantityQuintals,
          weighbridgeId,
          weighedAt: new Date(),
        },
        pricing: {
          baseMspRate,
          totalAmount,
        },
      },
      { new: true }
    );

    await Booking.findByIdAndUpdate(req.params.bookingId, { status: 'WEIGHING' });
    return res.json({ success: true, data: procurement });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/v1/procurement/:bookingId/accept
 * Stage 6 & 7: Acceptance & J-Form Bill Generation
 */
router.post('/:bookingId/accept', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const jFormNumber = `JF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const procurement = await Procurement.findOneAndUpdate(
      { bookingId: req.params.bookingId },
      {
        acceptance: {
          status: 'ACCEPTED',
          acceptedAt: new Date(),
        },
        jFormNumber,
      },
      { new: true }
    );

    await Booking.findByIdAndUpdate(req.params.bookingId, { status: 'BILL_GENERATED' });

    // Automatically trigger payment record creation
    const amount = procurement.pricing ? procurement.pricing.totalAmount : 195680;
    const expectedCreditDate = new Date();
    expectedCreditDate.setDate(expectedCreditDate.getDate() + 2); // 48-hour DBT SLA

    const payment = await Payment.create({
      bookingId: booking._id,
      procurementId: procurement._id,
      farmerId: booking.farmerId,
      amount,
      status: 'PROCESSING',
      transactionReference: `PFMS${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      expectedCreditDate,
    });

    return res.json({
      success: true,
      message: 'Procurement accepted and J-Form generated successfully',
      data: {
        procurement,
        payment,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
