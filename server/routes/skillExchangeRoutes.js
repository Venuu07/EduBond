import express from 'express';
const router=express.Router();
import {protect} from '../middleware/authMiddleware.js'
import { getExchanges,
         createExchange 
        ,getExchangeById
        } from '../controllers/skillExchangeController.js';

router.route('/').get(getExchanges).post(protect,createExchange);
router.route('/:id').get(getExchangeById);

export default router;