import express from 'express';
import { createBooking, getBookingById, checkAvailability } from '../controllers/bookingController.js';
import { validateBooking, validate } from '../middleware/validation.js';

const router = express.Router();

// Create new booking
router.post('/', validateBooking, validate, createBooking);

// ✅ FIXED: Check time slot availability - MUST be BEFORE /:id route
router.get('/check-availability', checkAvailability);

// ✅ FIXED: Get booking by ID - MUST be AFTER all specific routes
router.get('/:id', getBookingById);

export default router;