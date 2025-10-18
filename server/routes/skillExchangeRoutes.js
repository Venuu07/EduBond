import express from 'express';
const router=express.Router();
import {protect} from '../middleware/authMiddleware.js'
import { getExchanges,
         createExchange 
        ,getExchangeById
        ,proposeSwap,
        acceptProposal
        } from '../controllers/skillExchangeController.js';

router.route('/').get(getExchanges).post(protect,createExchange);

router.route('/:id/propose').post(protect, proposeSwap);
router.route('/:id/accept').put(protect, acceptProposal);

router.route('/:id').get(getExchangeById);

export default router;