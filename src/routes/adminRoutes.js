import express from 'express';
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getDashboardStats
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/', getAllAdmins);
router.post('/', createAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

router.get('/dashboard-stats', getDashboardStats);

export default router;