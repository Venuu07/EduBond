

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; 
import http from 'http';
import { Server } from 'socket.io';

import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import errorHandler from './middleware/errorMiddleware.js';
import gigRoutes from './routes/gigRoutes.js'
import skillExchangeRoutes from './routes/skillExchangeRoutes.js'
import portfolioRoutes from './routes/portfolioRoutes.js'


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

app.use(errorHandler)

io.on('connection', (socket) => {
  console.log(`A user connected:, ${socket.id}`);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on('sendMessage', (data) =>{

    io.to(data.room).emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});