

import express from 'express';
const router=express.Router();
import {
    getGigs,
    createGig,
    getGigById,
    getMyGigs,
    applyToGig,
} from '../controllers/gigController.js'
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getGigs).post(protect,createGig);
router.route('/mygigs').get(protect,getMyGigs)
router.route('/:id').get(getGigById);
router.route('/:id/apply').post(protect,applyToGig);

export default router;