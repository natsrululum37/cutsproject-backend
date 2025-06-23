import express from 'express';
import { 
  getAdminReviews, 
  softDeleteReview, 
  restoreReview 
} from '../controllers/adminReviewController.js';
import { authenticate } from '../controllers/authController.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Semua route memerlukan autentikasi dan role admin
// Uncomment ketika siap menggunakan auth
router.use(authenticate, authorizeRole('admin'));

// GET reviews for admin with search and pagination
router.get('/', getAdminReviews);

// PATCH soft delete review
router.patch('/:id/delete', softDeleteReview);

// PATCH restore review
router.patch('/:id/restore', restoreReview);

export default router;