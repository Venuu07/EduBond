import express from 'express';
import { getExchanges,createExchange } from '../controllers/skillExchangeController.js';
const router=express.Router();
import {protect} from '../middleware/authMiddleware.js'

router.route('/').get(getExchanges).post(protect,createExchange);

export default router;