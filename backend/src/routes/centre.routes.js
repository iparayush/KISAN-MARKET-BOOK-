const express = require('express');
const router = express.Router();
const Centre = require('../models/Centre');
const { rankCentres } = require('../services/recommendationService');

/**
 * GET /api/v1/centres
 * List all active procurement centres
 */
router.get('/', async (req, res) => {
  try {
    const centres = await Centre.find({ status: { $ne: 'INACTIVE' } }).sort({ currentQueue: 1 });
    return res.json({ success: true, count: centres.length, data: centres });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/v1/centres/recommend
 * Returns 4-factor ranked centres with explainable badges
 */
router.get('/recommend', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat) || 19.9975;
    const lng = parseFloat(req.query.lng) || 73.7898;

    const centres = await Centre.find({ status: { $ne: 'INACTIVE' } });
    if (!centres || centres.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const ranked = rankCentres(centres, lat, lng);
    return res.json({
      success: true,
      userLocation: { lat, lng },
      recommendations: ranked,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/v1/centres/nearby
 * MongoDB 2dsphere geospatial proximity search
 */
router.get('/nearby', async (req, res) => {
  try {
    const lng = parseFloat(req.query.lng) || 73.7898;
    const lat = parseFloat(req.query.lat) || 19.9975;
    const maxDistanceKm = parseFloat(req.query.distance) || 50;

    const centres = await Centre.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: maxDistanceKm * 1000, // convert km to meters
        },
      },
    });

    return res.json({ success: true, count: centres.length, data: centres });
  } catch (error) {
    // Fallback if 2dsphere index hasn't finished building
    const centres = await Centre.find({});
    return res.json({ success: true, count: centres.length, data: centres });
  }
});

/**
 * PATCH /api/v1/centres/:id/capacity
 * Used by Centre Managers to adjust counters & capacity
 */
router.patch('/:id/capacity', async (req, res) => {
  try {
    const { dailyCapacity, activeCounters, status } = req.body;
    const centre = await Centre.findByIdAndUpdate(
      req.params.id,
      {
        ...(dailyCapacity !== undefined && { dailyCapacity }),
        ...(activeCounters !== undefined && { activeCounters }),
        ...(status !== undefined && { status }),
      },
      { new: true }
    );
    if (!centre) {
      return res.status(404).json({ success: false, message: 'Centre not found' });
    }
    return res.json({ success: true, data: centre });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
