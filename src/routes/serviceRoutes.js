import express from 'express';
import { getAllServices, getServiceById } from '../controllers/serviceController.js';
import { validateService, validate } from '../middleware/validation.js';

const router = express.Router();

// Get all services
router.get('/', getAllServices);

// Get service by ID
router.get('/:id', getServiceById);

export default router;