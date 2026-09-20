const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    aadhaarHash: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ['farmer', 'operator', 'manager', 'admin'],
      default: 'farmer',
    },
    preferredLanguage: {
      type: String,
      enum: ['en', 'mr', 'hi'],
      default: 'mr',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
