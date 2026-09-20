require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');

const User = require('../models/User');
const Farmer = require('../models/Farmer');
const Centre = require('../models/Centre');
const Crop = require('../models/Crop');
const Slot = require('../models/Slot');
const Booking = require('../models/Booking');
const QueueToken = require('../models/QueueToken');
const Procurement = require('../models/Procurement');
const Payment = require('../models/Payment');

const seedData = async () => {
  if (mongoose.connection.readyState === 0) {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kisanprocure';
    console.log(`Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  }

  try {
    console.log('Clearing existing records...');

    await Promise.all([
      User.deleteMany({}),
      Farmer.deleteMany({}),
      Centre.deleteMany({}),
      Crop.deleteMany({}),
      Slot.deleteMany({}),
      Booking.deleteMany({}),
      QueueToken.deleteMany({}),
      Procurement.deleteMany({}),
      Payment.deleteMany({}),
    ]);

    console.log('Seeding Centres with 2dsphere coordinates...');
    const centres = await Centre.create([
      {
        name: 'नाशिक एपीएमसी मुख्य केंद्र (Nashik APMC Main)',
        district: 'Nashik',
        state: 'Maharashtra',
        address: 'Market Yard, Panchavati, Nashik',
        location: { type: 'Point', coordinates: [73.7898, 19.9975] },
        dailyCapacity: 800,
        activeCounters: 4,
        currentQueue: 18,
        processingRate: 6,
        status: 'ACTIVE',
      },
      {
        name: 'पिंपळगाव बसवंत उपकेंद्र (Pimpalgaon Baswant Sub-Centre)',
        district: 'Nashik',
        state: 'Maharashtra',
        address: 'APMC Complex, Mumbai-Agra Highway, Pimpalgaon',
        location: { type: 'Point', coordinates: [73.985, 20.17] },
        dailyCapacity: 600,
        activeCounters: 3,
        currentQueue: 8,
        processingRate: 5,
        status: 'ACTIVE',
      },
      {
        name: 'दिंडोरी खरेदी केंद्र (Dindori Procurement Centre)',
        district: 'Nashik',
        state: 'Maharashtra',
        address: 'Near Bus Stand, Dindori',
        location: { type: 'Point', coordinates: [73.83, 20.2] },
        dailyCapacity: 450,
        activeCounters: 2,
        currentQueue: 4,
        processingRate: 5,
        status: 'ACTIVE',
      },
      {
        name: 'लासलगाव कांदा व धान्य केंद्र (Lasalgaon Procurement Centre)',
        district: 'Nashik',
        state: 'Maharashtra',
        address: 'Station Road, Lasalgaon',
        location: { type: 'Point', coordinates: [74.228, 20.147] },
        dailyCapacity: 1000,
        activeCounters: 5,
        currentQueue: 26,
        processingRate: 7,
        status: 'CONGESTED',
      },
    ]);

    console.log('Seeding Demo Farmer User...');
    const farmerUser = await User.create({
      phone: '9876543210',
      role: 'farmer',
      preferredLanguage: 'mr',
    });

    const farmer = await Farmer.create({
      userId: farmerUser._id,
      name: 'आनंदराव बापूराव पाटील (Anandrao Patil)',
      phone: '9876543210',
      village: 'पिंपळगाव (Pimpalgaon)',
      taluka: 'निफाड (Niphad)',
      district: 'नाशिक (Nashik)',
      state: 'Maharashtra',
      landHoldingAcres: 4.5,
      bankDetails: {
        bankName: 'State Bank of India',
        accountNumber: '••••••••4821',
        ifscCode: 'SBIN0001234',
        accountHolderName: 'Anandrao B. Patil',
      },
    });

    console.log('Seeding Registered Crops...');
    const crop = await Crop.create({
      farmerId: farmer._id,
      cropName: 'सोयाबीन (Soybean)',
      variety: 'JS-335 (Grade A)',
      expectedQuantity: 40,
      unit: 'quintal',
      season: 'Kharif',
      mspPerQuintal: 4892,
      status: 'VERIFIED',
    });

    console.log('Seeding Slots...');
    const today = new Date();
    const slot = await Slot.create({
      centreId: centres[1]._id, // Pimpalgaon
      date: today,
      startTime: '09:00',
      endTime: '11:00',
      capacity: 30,
      bookedCount: 12,
      status: 'AVAILABLE',
    });

    console.log('Seeding Active Booking & Token...');
    const booking = await Booking.create({
      farmerId: farmer._id,
      cropId: crop._id,
      centreId: centres[1]._id,
      slotId: slot._id,
      tokenNumber: 'KP-1028',
      status: 'QUALITY_CHECK',
      qrCodeData: JSON.stringify({ tokenNumber: 'KP-1028', farmerId: farmer._id }),
    });

    await QueueToken.create({
      bookingId: booking._id,
      centreId: centres[1]._id,
      tokenNumber: 'KP-1028',
      position: 3,
      estimatedWaitMinutes: 25,
      status: 'WAITING',
    });

    const procurement = await Procurement.create({
      bookingId: booking._id,
      centreId: centres[1]._id,
      verification: {
        status: 'VERIFIED',
        verifiedBy: 'Operator S. Jadhav',
        verifiedAt: new Date(),
        notes: 'Aadhaar and 7/12 land record matched.',
      },
      quality: {
        status: 'GRADE_A',
        grade: 'Grade A (FAQ)',
        moisturePercentage: 11.4,
        foreignMatterPercentage: 0.7,
        inspectorId: 'QI-402',
        checkedAt: new Date(),
      },
      weighing: {
        grossWeightKg: 5240,
        tareWeightKg: 1240,
        netWeightKg: 4000,
        quantityQuintals: 40,
        weighbridgeId: 'WB-02',
        weighedAt: new Date(),
      },
      pricing: {
        baseMspRate: 4892,
        bonusPerQuintal: 0,
        totalAmount: 195680,
      },
      jFormNumber: 'JF-2026-984210',
      acceptance: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
    });

    const creditDate = new Date();
    creditDate.setDate(creditDate.getDate() + 2);

    await Payment.create({
      bookingId: booking._id,
      procurementId: procurement._id,
      farmerId: farmer._id,
      amount: 195680,
      status: 'PROCESSING',
      transactionReference: 'PFMS2026092049281',
      expectedCreditDate: creditDate,
    });

    console.log('✅ Demo data successfully seeded into MongoDB!');
    if (require.main === module) {
      process.exit(0);
    }
    return true;
  } catch (err) {
    console.error('Seed Error:', err.message);
    if (require.main === module) {
      process.exit(1);
    }
    throw err;
  }
};

if (require.main === module) {
  seedData();
}

module.exports = { seedData };
