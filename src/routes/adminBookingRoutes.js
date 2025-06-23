import express from 'express';
import { 
  getAllReservations, 
  markReservationDone, 
  cancelReservation 
} from '../controllers/adminBookingController.js';
// import { authenticate } from '../controllers/authController.js';

// Belum ada autentikasi dan role middleware
const router = express.Router();

// GET all reservations with pagination
router.get('/', getAllReservations);

// PATCH mark reservation as done
router.patch('/:id/done', markReservationDone);

// PATCH cancel reservation
router.patch('/:id/cancel', cancelReservation);

export default router;