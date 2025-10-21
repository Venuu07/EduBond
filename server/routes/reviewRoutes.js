import express from 'express';
const router = express.Router();
import { createReview,
        getUserReviews
 } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

// Create review route (protected)
router.route('/').post(protect, createReview);

router.route('/user/:userId').get(getUserReviews);

export default router;