import express from 'express';
import { authenticate } from '../controllers/authController.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getDashboardStats
} from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticate, authorizeRole('admin'));

// Hapus route duplicate
// router.put('/profile', updateAdminProfile); 
// router.post('/logout', logout);

router.get('/', getAllAdmins);
router.post('/', createAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);
router.get('/admin-page', (req, res) => {
  res.json({ message: 'Selamat datang di halaman admin!' });
});
router.get('/dashboard-stats', getDashboardStats);

export default router;