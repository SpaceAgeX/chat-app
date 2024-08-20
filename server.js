const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const dns = require('node:dns');
const os = require('node:os');

const options = { family: 4 };

let userCount = 0;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Socket.io for real-time messaging
io.on('connection', (socket) => {
    userCount++;
    

    // Broadcast the updated user count
    io.emit('user count', userCount);

    // Listen for incoming messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        userCount--;
        

        // Broadcast the updated user count
        io.emit('user count', userCount);
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
