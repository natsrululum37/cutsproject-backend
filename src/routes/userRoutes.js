import express from 'express';
import { changePassword } from '../controllers/userController.js';
import { authenticate } from '../controllers/authController.js';

const router = express.Router();

router.post('/change-password', authenticate, changePassword);

export default router;