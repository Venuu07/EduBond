

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors'; 
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import errorHandler from './middleware/errorMiddleware.js';
import gigRoutes from './routes/gigRoutes.js'

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;


app.get('/', (req, res) => {
  res.send('The EduBond server is live and auto-restarting!');
});

app.use('/api/users',userRoutes)

app.use('/api/gigs',gigRoutes);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});