import express from 'express';
const router = express.Router();
import { getMyPortfolio } from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getMyPortfolio);

export default router;