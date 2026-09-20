/**
 * Live Queue Service with Socket.IO Event Broadcasting
 */

let ioInstance = null;

const initQueueService = (io) => {
  ioInstance = io;
  console.log('📡 Queue Service initialized with Socket.IO');

  io.on('connection', (socket) => {
    // Client joins a centre-specific queue room
    socket.on('join:centre', (centreId) => {
      socket.join(`centre:${centreId}`);
      console.log(`Socket ${socket.id} joined room centre:${centreId}`);
    });

    socket.on('leave:centre', (centreId) => {
      socket.leave(`centre:${centreId}`);
    });
  });
};

const broadcastQueueUpdate = (centreId, queueData) => {
  if (ioInstance) {
    ioInstance.to(`centre:${centreId}`).emit('queue:update', {
      centreId,
      timestamp: new Date().toISOString(),
      ...queueData,
    });
    // Also emit to all clients for live admin/operator dashboards
    ioInstance.emit('queue:global_update', {
      centreId,
      timestamp: new Date().toISOString(),
      ...queueData,
    });
  }
};

module.exports = {
  initQueueService,
  broadcastQueueUpdate,
};
