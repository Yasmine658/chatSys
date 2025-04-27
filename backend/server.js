const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();
dotenv.config();
connectDB();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

const Message = require('./models/Message');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async ({ senderId, receiverId, content }) => {
    const message = await Message.create({ sender: senderId, receiver: receiverId, content });
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

