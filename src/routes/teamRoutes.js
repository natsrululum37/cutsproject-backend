import express from 'express';
import { 
  getAllTeamMembers, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember 
} from '../controllers/teamController.js';
import { authenticate } from '../controllers/authController.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// GET - Public access, no authentication needed
router.get('/', getAllTeamMembers);

// POST, PUT, DELETE - Admin only
// Uncomment when ready for authentication
router.post('/', authenticate, authorizeRole('admin'), createTeamMember);
router.put('/:id', authenticate, authorizeRole('admin'), updateTeamMember);
router.delete('/:id', authenticate, authorizeRole('admin'), deleteTeamMember);

// For development, use these routes without authentication
// router.post('/', createTeamMember);
// router.put('/:id', updateTeamMember);
// router.delete('/:id', deleteTeamMember);

export default router;