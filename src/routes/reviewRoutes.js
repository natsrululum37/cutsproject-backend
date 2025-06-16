import express from 'express';
import { getAllReviews, getReviewById, createReview } from '../controllers/reviewController.js';
import { validateReview, validate } from '../middleware/validation.js';

const router = express.Router();

// Get all reviews
router.get('/', getAllReviews);

// Get review by ID
router.get('/:id', getReviewById);

// Create new review
router.post('/', validateReview, validate, createReview);

export default router;