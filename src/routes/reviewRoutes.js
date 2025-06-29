import express from 'express';
import { getAllReviews, getReviewById, createReview } from '../controllers/reviewController.js';
import { uploadReviewAvatar } from '../middleware/uploadReviewAvatar.js';

const router = express.Router();

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.post('/', uploadReviewAvatar.single('avatar'), createReview);

export default router;