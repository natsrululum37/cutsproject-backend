import express from 'express';
import { 
  getAdminProfile, 
  updateAdminProfile,
  logout 
} from '../controllers/adminProfileController.js';
import { authenticate } from '../controllers/authController.js'; // path yang benar
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Semua route memerlukan autentikasi dan role admin
router.use(authenticate, authorizeRole('admin'));

// GET admin profile
router.get('/profile', getAdminProfile);

// PUT update admin profile
router.put('/profile', updateAdminProfile);

// Logout
router.post('/logout', logout);

export default router;