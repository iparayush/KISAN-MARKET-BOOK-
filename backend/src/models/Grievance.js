const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true,
      required: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmer',
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: ['PAYMENT_DELAY', 'QUALITY_DISPUTE', 'WEIGHT_DISCREPANCY', 'QUEUE_DELAY', 'OTHER'],
      default: 'OTHER',
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'],
      default: 'OPEN',
      index: true,
    },
    resolutionNotes: String,
    resolvedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Grievance', grievanceSchema);
