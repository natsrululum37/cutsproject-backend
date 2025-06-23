import express from 'express';
import { 
  getAllGalleryItems, 
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController.js';
// import { authenticate, isAdmin } from '../controllers/authController.js';

const router = express.Router();

// Routes for both admin and user
router.get('/', getAllGalleryItems);
router.get('/:id', getGalleryItemById);

// Routes for admin only
// Uncomment ketika middleware authenticate sudah siap
// router.post('/', authenticate, isAdmin, createGalleryItem);
// router.put('/:id', authenticate, isAdmin, updateGalleryItem);
// router.delete('/:id', authenticate, isAdmin, deleteGalleryItem);

// Gunakan ini untuk sementara (tanpa auth)
router.post('/', createGalleryItem);
router.put('/:id', updateGalleryItem);
router.delete('/:id', deleteGalleryItem);

export default router;