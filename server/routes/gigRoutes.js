import express from 'express';
const router=express.Router();
import {
    getGigs,
    createGig
} from '../controllers/gigController.js'
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getGigs).post(protect,createGig);

export default router;