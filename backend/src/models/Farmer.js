const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    village: {
      type: String,
      required: true,
    },
    taluka: String,
    district: {
      type: String,
      required: true,
      index: true,
    },
    state: {
      type: String,
      default: 'Maharashtra',
    },
    pincode: String,
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      bankName: String,
      accountHolderName: String,
    },
    landHoldingAcres: {
      type: Number,
      default: 0,
    },
    preferredLanguage: {
      type: String,
      enum: ['en', 'mr', 'hi'],
      default: 'mr',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Farmer', farmerSchema);
