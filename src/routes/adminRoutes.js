import express from 'express';
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/', getAllAdmins);
router.post('/', createAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;