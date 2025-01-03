// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static files (HTML, CSS, JS) from the "public" folder
app.use(express.static('public'));

// Handle a new user connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle receiving messages from the client
  socket.on('chat-message', (msg) => {
    // Broadcast the message to all users
    io.emit('chat-message', msg);
  });
  
  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Set the server to listen on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
