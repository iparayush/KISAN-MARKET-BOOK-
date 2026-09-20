const mongoose = require('mongoose');

const centreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      index: true,
    },
    state: {
      type: String,
      default: 'Maharashtra',
    },
    address: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [Longitude, Latitude]
        required: true,
      },
    },
    dailyCapacity: {
      type: Number,
      required: true,
      default: 500,
    },
    activeCounters: {
      type: Number,
      default: 2,
    },
    currentQueue: {
      type: Number,
      default: 0,
    },
    processingRate: {
      type: Number,
      default: 6, // farmers served per hour per counter
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'CONGESTED'],
      default: 'ACTIVE',
    },
    operatingHours: {
      open: { type: String, default: '08:00' },
      close: { type: String, default: '18:00' },
    },
  },
  {
    timestamps: true,
  }
);

centreSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Centre', centreSchema);
