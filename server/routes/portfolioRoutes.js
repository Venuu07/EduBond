import express from 'express';
const router = express.Router();
import { getMyPortfolio,
    getUserPortfolio,
 } from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getMyPortfolio);

router.route('/user/:userId').get(getUserPortfolio);

export default router;