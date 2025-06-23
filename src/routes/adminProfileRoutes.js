import express from 'express';
import { authenticate } from '../controllers/authController.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import { updateAdminProfile, logout } from '../controllers/updateProfileAdminController.js';

const router = express.Router();

router.use(authenticate, authorizeRole('admin'));

router.put('/profile', updateAdminProfile);
router.post('/logout', logout);

export default router;