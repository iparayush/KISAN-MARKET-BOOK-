const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmer',
      required: true,
      index: true,
    },
    cropName: {
      type: String,
      required: true,
      trim: true,
    },
    variety: {
      type: String,
      trim: true,
    },
    expectedQuantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      default: 'quintal',
    },
    season: {
      type: String,
      enum: ['Kharif', 'Rabi', 'Zaid'],
      default: 'Kharif',
    },
    mspPerQuintal: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['REGISTERED', 'VERIFIED', 'PROCURED'],
      default: 'REGISTERED',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Crop', cropSchema);
