import express from 'express';
const router = express.Router();
import { getRoomMessages } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

// Route to get messages for a specific room, protected
router.route('/:roomName').get(protect, getRoomMessages);

export default router;