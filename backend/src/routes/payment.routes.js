const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

/**
 * GET /api/v1/payments/farmer/:farmerId
 */
router.get('/farmer/:farmerId', async (req, res) => {
  try {
    const payments = await Payment.find({ farmerId: req.params.farmerId })
      .populate('bookingId')
      .populate('procurementId')
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: payments.length, data: payments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/v1/payments/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('farmerId')
      .populate('procurementId');
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }
    return res.json({ success: true, data: payment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
