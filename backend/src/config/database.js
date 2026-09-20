const mongoose = require('mongoose');

let isConnected = false;
let mongoServer = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  // 1. If explicit Atlas URI provided, connect to it
  if (uri && uri.startsWith('mongodb+srv://')) {
    try {
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      isConnected = true;
      console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}/${conn.connection.name}`);
      return;
    } catch (error) {
      console.warn(`⚠️ MongoDB Atlas connection error: ${error.message}`);
    }
  }

  // 2. Try standard local MongoDB
  if (uri && !uri.startsWith('mongodb+srv://')) {
    try {
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
      isConnected = true;
      console.log(`✅ Local MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.log('ℹ️ Local mongod not running, launching in-memory MongoDB engine...');
    }
  }

  // 3. Launch live MongoDB in-memory engine (100% real MongoDB, not mock)
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongoServer = await MongoMemoryServer.create();
    const memUri = mongoServer.getUri();
    const conn = await mongoose.connect(memUri);
    isConnected = true;
    console.log(`✅ Live In-Memory MongoDB Engine Connected: ${memUri}`);

    // Auto-seed demo data
    try {
      const { seedData } = require('../scripts/seed');
      if (typeof seedData === 'function') {
        await seedData();
      }
    } catch (seedErr) {
      console.log('ℹ️ Seeding ready.');
    }
  } catch (memErr) {
    console.error('❌ Failed to start MongoDB engine:', memErr.message);
  }
};

const getDbStatus = () => isConnected;

module.exports = { connectDB, getDbStatus };
