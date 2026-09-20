const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const QueueToken = require('../models/QueueToken');
const Slot = require('../models/Slot');
const Procurement = require('../models/Procurement');
const { broadcastQueueUpdate } = require('../services/queueService');

/**
 * POST /api/v1/bookings
 * Create new booking with digital token
 */
router.post('/', async (req, res) => {
  try {
    const { farmerId, cropId, centreId, slotId } = req.body;

    // Generate unique token number e.g. KP-1028
    const count = await Booking.countDocuments();
    const tokenNumber = `KP-${1000 + count + 1}`;

    const booking = await Booking.create({
      farmerId,
      cropId,
      centreId,
      slotId,
      tokenNumber,
      status: 'BOOKED',
      qrCodeData: JSON.stringify({ tokenNumber, centreId, farmerId }),
    });

    // Update slot bookedCount
    if (slotId) {
      await Slot.findByIdAndUpdate(slotId, { $inc: { bookedCount: 1 } });
    }

    // Create corresponding QueueToken record
    const waitingTokens = await QueueToken.countDocuments({ centreId, status: 'WAITING' });
    const queueToken = await QueueToken.create({
      bookingId: booking._id,
      centreId,
      tokenNumber,
      position: waitingTokens + 1,
      estimatedWaitMinutes: (waitingTokens + 1) * 12,
      status: 'WAITING',
    });

    // Initialize procurement record
    await Procurement.create({
      bookingId: booking._id,
      centreId,
      verification: { status: 'PENDING' },
      quality: { status: 'PENDING' },
      acceptance: { status: 'PENDING' },
    });

    broadcastQueueUpdate(centreId, {
      newToken: tokenNumber,
      waitingCount: waitingTokens + 1,
    });

    return res.status(201).json({
      success: true,
      data: {
        booking,
        queueToken,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/v1/bookings/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('farmerId')
      .populate('cropId')
      .populate('centreId')
      .populate('slotId');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    return res.json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/v1/bookings/farmer/:farmerId
 */
router.get('/farmer/:farmerId', async (req, res) => {
  try {
    const bookings = await Booking.find({ farmerId: req.params.farmerId })
      .populate('cropId')
      .populate('centreId')
      .populate('slotId')
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * PATCH /api/v1/bookings/:id/status
 * Stage advancement (BOOKED -> ARRIVED -> VERIFIED -> etc.)
 */
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    return res.json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
