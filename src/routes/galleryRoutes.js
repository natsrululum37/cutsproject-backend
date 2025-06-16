import express from 'express';
import { getAllGalleryItems, getGalleryItemById } from '../controllers/galleryController.js';

const router = express.Router();

// Get all gallery items
router.get('/', getAllGalleryItems);

// Get gallery item by ID
router.get('/:id', getGalleryItemById);

export default router;