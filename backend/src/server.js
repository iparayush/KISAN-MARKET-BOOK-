require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const { connectDB, getDbStatus } = require('./config/database');
const { initQueueService } = require('./services/queueService');

const authRoutes = require('./routes/auth.routes');
const centreRoutes = require('./routes/centre.routes');
const slotRoutes = require('./routes/slot.routes');
const bookingRoutes = require('./routes/booking.routes');
const queueRoutes = require('./routes/queue.routes');
const procurementRoutes = require('./routes/procurement.routes');
const paymentRoutes = require('./routes/payment.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});
initQueueService(io);

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    platform: 'KisanProcure API',
    problemStatement: 'SIH26032',
    database: getDbStatus() ? 'Connected (MongoDB)' : 'Standby / Local',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/centres', centreRoutes);
app.use('/api/v1/slots', slotRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/queue', queueRoutes);
app.use('/api/v1/procurement', procurementRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5001;

// Connect to DB and Start Server
connectDB().finally(() => {
  server.listen(PORT, () => {
    console.log(`🌾 KisanProcure API Server running on port ${PORT}`);
    console.log(`📡 WebSocket / Socket.IO live at ws://localhost:${PORT}`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  });
});
