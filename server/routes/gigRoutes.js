

import express from 'express';
const router=express.Router();
import {
    getGigs,
    createGig,
    getGigById,
    getMyGigs,
    applyToGig,
    acceptApplicant,
    completeGig,
} from '../controllers/gigController.js'
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getGigs).post(protect,createGig);

router.route('/mygigs').get(protect,getMyGigs)

router.route('/:id/apply').post(protect,applyToGig);

router.route('/:id/accept').put(protect,acceptApplicant);

router.route('/:id/complete').put(protect,completeGig)

router.route('/:id').get(getGigById);



export default router;