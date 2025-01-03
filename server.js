const fastify = require('fastify')();
const path = require('path');
const socketIo = require('socket.io');

// Serve static files (like your CSS, JS, etc.)
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // Static assets will be available under "/public/"
});

// Create a basic route for the homepage
fastify.get('/', (request, reply) => {
  reply.sendFile('index.html');  // Make sure the path is correct
});

// Create a socket connection on the server
const server = fastify.listen(3000, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

const io = socketIo(server);

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('chat-message', (message) => {
    io.emit('chat-message', message);  // Broadcast the message to all clients
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
