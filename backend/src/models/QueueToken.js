const mongoose = require('mongoose');

const queueTokenSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
      unique: true,
    },
    centreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Centre',
      required: true,
      index: true,
    },
    tokenNumber: {
      type: String,
      required: true,
      index: true,
    },
    assignedCounter: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['WAITING', 'CALLED', 'SERVING', 'COMPLETED', 'SKIPPED'],
      default: 'WAITING',
      index: true,
    },
    position: {
      type: Number,
      default: 1,
    },
    estimatedWaitMinutes: {
      type: Number,
      default: 15,
    },
    calledAt: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('QueueToken', queueTokenSchema);
