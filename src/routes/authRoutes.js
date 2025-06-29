import express from 'express'
import { login, register, authenticate, getProfile, forgotPassword, resetPassword } from '../controllers/authController.js'
import { uploadProfilePhoto } from '../middleware/uploadPhotoProfile.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', uploadProfilePhoto.single('photo'), register)
router.get('/profile', authenticate, getProfile)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router
