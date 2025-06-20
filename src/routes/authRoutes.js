import express from 'express'
import { login, register, authenticate, getProfile } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/profile', authenticate, getProfile)

export default router
