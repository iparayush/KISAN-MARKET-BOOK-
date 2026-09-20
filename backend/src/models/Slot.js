const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema(
  {
    centreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Centre',
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    startTime: {
      type: String,
      required: true, // e.g. "09:00"
    },
    endTime: {
      type: String,
      required: true, // e.g. "11:00"
    },
    capacity: {
      type: Number,
      required: true,
      default: 20,
    },
    bookedCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['AVAILABLE', 'FULL', 'CLOSED'],
      default: 'AVAILABLE',
    },
  },
  {
    timestamps: true,
  }
);

slotSchema.index({ centreId: 1, date: 1 });

module.exports = mongoose.model('Slot', slotSchema);
