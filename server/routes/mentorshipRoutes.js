import express from 'express';
const router = express.Router();
import {
    getSessions,
    createSession,
    getSessionById,
    bookSlot,
    getMyBookedSessions,
    getMyOfferedSessions
} from '../controllers/mentorshipController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getSessions).post(protect, createSession);

router.route('/mybookings').get(protect, (req, res, next) => {
  console.log('HIT /mybookings route'); // Log when this specific route is hit
  getMyBookedSessions(req, res, next); // Then pass control to the actual controller
});

router.route('/myoffers').get(protect, (req, res, next) => {
  console.log('HIT /myoffers route'); // Log when this specific route is hit
  getMyOfferedSessions(req, res, next); // Then pass control to the actual controller
})

router.route('/:id').get(getSessionById);

router.route('/:sessionId/book/:slotId').put(protect, bookSlot);

export default router;