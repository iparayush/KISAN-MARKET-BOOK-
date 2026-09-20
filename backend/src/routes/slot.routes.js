const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');

/**
 * GET /api/v1/slots/:centreId
 * List available slots for a given centre
 */
router.get('/:centreId', async (req, res) => {
  try {
    const { centreId } = req.params;
    const slots = await Slot.find({ centreId }).sort({ date: 1, startTime: 1 });
    return res.json({ success: true, count: slots.length, data: slots });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/v1/slots
 * Create slot
 */
router.post('/', async (req, res) => {
  try {
    const { centreId, date, startTime, endTime, capacity = 25 } = req.body;
    const slot = await Slot.create({
      centreId,
      date: new Date(date),
      startTime,
      endTime,
      capacity,
      bookedCount: 0,
      status: 'AVAILABLE',
    });
    return res.status(201).json({ success: true, data: slot });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
