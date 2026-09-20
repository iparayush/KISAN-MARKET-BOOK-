const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmer',
      required: true,
      index: true,
    },
    cropId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crop',
      required: true,
    },
    centreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Centre',
      required: true,
      index: true,
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Slot',
      required: true,
    },
    tokenNumber: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: [
        'BOOKED',
        'ARRIVED',
        'VERIFIED',
        'QUALITY_CHECK',
        'WEIGHING',
        'ACCEPTED',
        'BILL_GENERATED',
        'PAYMENT_PROCESSING',
        'PAID',
        'CANCELLED',
        'NO_SHOW',
      ],
      default: 'BOOKED',
      index: true,
    },
    qrCodeData: String,
    cancellationReason: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
