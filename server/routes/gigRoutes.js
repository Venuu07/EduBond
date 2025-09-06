import express from 'express';
const router=express.Router();
import {
    getGigs,
    createGig,
    getGigById,
} from '../controllers/gigController.js'
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getGigs).post(protect,createGig);
router.route('/:id').get(getGigById);

export default router;