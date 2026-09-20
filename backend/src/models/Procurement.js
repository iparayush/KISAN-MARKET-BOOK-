const mongoose = require('mongoose');

const procurementSchema = new mongoose.Schema(
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
    },
    verification: {
      status: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED'],
        default: 'PENDING',
      },
      verifiedBy: String,
      verifiedAt: Date,
      notes: String,
    },
    quality: {
      status: {
        type: String,
        enum: ['PENDING', 'GRADE_A', 'GRADE_B', 'REJECTED'],
        default: 'PENDING',
      },
      grade: String,
      moisturePercentage: Number,
      foreignMatterPercentage: Number,
      inspectorId: String,
      checkedAt: Date,
    },
    weighing: {
      grossWeightKg: Number,
      tareWeightKg: Number,
      netWeightKg: Number,
      quantityQuintals: Number,
      weighbridgeId: String,
      weighedAt: Date,
    },
    pricing: {
      baseMspRate: Number,
      bonusPerQuintal: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 },
      totalAmount: Number,
    },
    jFormNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    acceptance: {
      status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
        default: 'PENDING',
      },
      acceptedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Procurement', procurementSchema);
