const express = require('express');
const router = express.Router();
const QueueToken = require('../models/QueueToken');
const Centre = require('../models/Centre');
const { broadcastQueueUpdate } = require('../services/queueService');

/**
 * GET /api/v1/queue/:centreId
 * Get live queue status for a procurement centre
 */
router.get('/:centreId', async (req, res) => {
  try {
    const { centreId } = req.params;

    const servingToken = await QueueToken.findOne({ centreId, status: 'SERVING' });
    const waitingTokens = await QueueToken.find({ centreId, status: 'WAITING' }).sort({ createdAt: 1 });
    const centre = await Centre.findById(centreId);

    const activeCounters = centre ? centre.activeCounters : 2;
    const processingRate = centre ? centre.processingRate : 5; // per hour
    const avgMinutesPerFarmer = Math.round(60 / (processingRate * activeCounters)) || 10;

    return res.json({
      success: true,
      data: {
        centreId,
        nowServing: servingToken ? servingToken.tokenNumber : (waitingTokens[0] ? waitingTokens[0].tokenNumber : 'None'),
        waitingCount: waitingTokens.length,
        activeCounters,
        estimatedWaitMinutes: waitingTokens.length * avgMinutesPerFarmer,
        waitingQueue: waitingTokens.map((t, idx) => ({
          tokenNumber: t.tokenNumber,
          position: idx + 1,
          estimatedWait: (idx + 1) * avgMinutesPerFarmer,
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/v1/queue/:centreId/next
 * Operator calls the next waiting token
 */
router.post('/:centreId/next', async (req, res) => {
  try {
    const { centreId } = req.params;

    // Complete currently serving token
    await QueueToken.findOneAndUpdate(
      { centreId, status: 'SERVING' },
      { status: 'COMPLETED', completedAt: new Date() }
    );

    // Pick first waiting token
    const nextToken = await QueueToken.findOneAndUpdate(
      { centreId, status: 'WAITING' },
      { status: 'SERVING', calledAt: new Date() },
      { new: true, sort: { createdAt: 1 } }
    );

    const remainingWaiting = await QueueToken.countDocuments({ centreId, status: 'WAITING' });

    // Update centre queue count
    await Centre.findByIdAndUpdate(centreId, { currentQueue: remainingWaiting });

    const queueData = {
      nowServing: nextToken ? nextToken.tokenNumber : 'None',
      waitingCount: remainingWaiting,
      estimatedWaitMinutes: remainingWaiting * 10,
    };

    broadcastQueueUpdate(centreId, queueData);

    return res.json({
      success: true,
      message: nextToken ? `Now serving token ${nextToken.tokenNumber}` : 'No more tokens in queue',
      data: queueData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
