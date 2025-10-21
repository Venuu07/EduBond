

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; 
import http from 'http';
import { Server } from 'socket.io';

import connectDB from './config/db.js'
import Message from './models/messageModel.js';
import User from './models/userModel.js';


import userRoutes from './routes/userRoutes.js'
import errorHandler from './middleware/errorMiddleware.js';
import gigRoutes from './routes/gigRoutes.js'
import skillExchangeRoutes from './routes/skillExchangeRoutes.js'
import portfolioRoutes from './routes/portfolioRoutes.js'
import mentorshipRoutes from './routes/mentorshipRoutes.js'
import messageRoutes from './routes/messageRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import roomRoutes from './routes/roomRoutes.js';

import mongoose from 'mongoose';

connectDB();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});
app.use(express.json());
app.use(cors());

const PORT = 5000;


app.get('/', (req, res) => {
  res.send('The EduBond server is live and auto-restarting!');
});

app.use('/api/users',userRoutes)
app.use('/api/gigs',gigRoutes);
app.use('/api/exchanges',skillExchangeRoutes);

//portfollio routes
app.use('/api/portfolio',portfolioRoutes);

app.use('/api/mentorship',mentorshipRoutes);

app.use('/api/messages', messageRoutes);

app.use('/api/reviews', reviewRoutes);
app.use('/api/rooms', roomRoutes);

app.use(errorHandler)

io.on('connection', (socket) => {
  console.log(`A user connected:, ${socket.id}`);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

 socket.on('sendMessage', async (data) => { // Make the handler async
    console.log('Message received on server:', data); // Log received data

    // 2. Prepare message data for saving (ensure author info is structured)
    // We assume the client sends authorId and authorName now
    const messageToSave = {
      room: data.room,
      author: {
        id: data.authorId, // Expecting ID from client
        name: data.authorName // Expecting Name from client
      },
      text: data.text
    };

    try {
      // 3. Save the message to the database
      const savedMessage = await Message.create(messageToSave);
      console.log('Message saved:', savedMessage._id);

      // 4. Prepare data to broadcast (include saved ID and createdAt)
      const messageToBroadcast = {
        _id: savedMessage._id, // Include the database ID
        room: savedMessage.room,
        author: savedMessage.author, // Send the author object
        text: savedMessage.text,
        createdAt: savedMessage.createdAt // Include the timestamp
      };

      // 5. Broadcast the *saved* message data to the room
      io.to(data.room).emit('receiveMessage', messageToBroadcast);

    } catch (error) {
      console.error('Error saving message:', error);
      // Optional: Emit an error back to the sender
      socket.emit('messageError', { message: 'Failed to save message', error: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`MongoDB Connected: ${mongoose.connection.host}`); // Add Mongoose connection host log
  console.log(`Server is running on http://localhost:${PORT}`);
});