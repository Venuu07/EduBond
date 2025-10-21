import express from 'express';
const router = express.Router();
import { getRooms, createRoom } from '../controllers/roomController.js';
import { protect } from '../middleware/authMiddleware.js'; // Assuming creation is protected

router.route('/').get(getRooms).post(protect, createRoom);

export default router;