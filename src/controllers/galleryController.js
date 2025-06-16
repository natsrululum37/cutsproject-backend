import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all gallery items
export const getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await prisma.gallery.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get gallery item by ID
export const getGalleryItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const galleryItem = await prisma.gallery.findUnique({
      where: { id: parseInt(id) }
    });

    if (!galleryItem) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    res.json(galleryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
