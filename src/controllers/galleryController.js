import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all gallery items (dengan pagination)
export const getAllGalleryItems = async (req, res) => {
  try {
    // Ambil query params untuk pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9; // Default 9 item per halaman
    const skip = (page - 1) * limit;

    // Hitung total data untuk info pagination
    const totalCount = await prisma.gallery.count();
    
    // Ambil data dengan pagination
    const galleryItems = await prisma.gallery.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Return data dengan info pagination
    res.json({
      data: galleryItems,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
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

// Create new gallery item
export const createGalleryItem = async (req, res) => {
  try {
    const { title, image } = req.body;
    
    // Validasi input
    if (!title || !image) {
      return res.status(400).json({ error: 'Title dan image URL wajib diisi' });
    }
    
    const galleryItem = await prisma.gallery.create({
      data: {
        title,
        image
      }
    });
    
    res.status(201).json(galleryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update gallery item
export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image } = req.body;
    
    // Validasi input
    if (!title || !image) {
      return res.status(400).json({ error: 'Title dan image URL wajib diisi' });
    }
    
    // Cek apakah item ada
    const existingItem = await prisma.gallery.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingItem) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    
    const updatedItem = await prisma.gallery.update({
      where: { id: parseInt(id) },
      data: {
        title,
        image,
        updatedAt: new Date()
      }
    });
    
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete gallery item
export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Cek apakah item ada
    const existingItem = await prisma.gallery.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingItem) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    
    await prisma.gallery.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
