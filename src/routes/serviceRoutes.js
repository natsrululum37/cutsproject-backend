import express from 'express';
import { 
  getAllServices, 
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { authenticate } from '../controllers/authController.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import { validateService, validate } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Admin only routes
// Uncomment when ready for authentication
router.post('/', authenticate, authorizeRole('admin'), validateService, validate, createService);
router.put('/:id', authenticate, authorizeRole('admin'), validateService, validate, updateService);
router.delete('/:id', authenticate, authorizeRole('admin'), deleteService);

// For development without authentication
// router.post('/', validateService, validate, createService);
// router.put('/:id', validateService, validate, updateService);
// router.delete('/:id', deleteService);

export default router;