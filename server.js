const express = require('express'); // Or use fastify if preferred
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the index.html file
app.use(express.static(path.join(__dirname)));

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('chat-message', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat-message', msg); // Broadcast to all clients
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
