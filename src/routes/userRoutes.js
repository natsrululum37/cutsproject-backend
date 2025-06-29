import express from 'express';
import { getProfile, changePassword, updateProfile } from '../controllers/userController.js';
import { authenticate } from '../controllers/authController.js';
import { uploadProfilePhoto } from '../middleware/uploadPhotoProfile.js';

const router = express.Router();

router.get('/profile', authenticate, getProfile);
router.post('/change-password', authenticate, changePassword);
router.put('/profile', authenticate, uploadProfilePhoto.single('photo'), updateProfile);

export default router;