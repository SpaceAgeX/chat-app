const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const dns = require('node:dns');
const os = require('node:os');

const options = { family: 4 };
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for incoming messages
    socket.on('chat message', (msg) => {
        // Broadcast the message to everyone except the sender
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

dns.lookup(os.hostname(), options, (err, addr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`http://${addr}:${PORT}`);
    }
});
