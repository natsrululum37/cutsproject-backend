import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all services with pagination and search
export const getAllServices = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    // Build search condition
    const searchCondition = search 
      ? {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
            { category: { contains: search } },
          ],
        } 
      : {};

    // Count total records for pagination
    const totalCount = await prisma.service.count({
      where: searchCondition
    });

    // Get services with filter and pagination
    const services = await prisma.service.findMany({
      where: searchCondition,
      skip,
      take: limit,
      orderBy: { 
        createdAt: 'desc'
      }
    });

    // Return data with pagination metadata
    res.json({
      data: services,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get service by ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await prisma.service.findUnique({
      where: { id: parseInt(id) }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new service
export const createService = async (req, res) => {
  try {
    const { name, price, description, duration, category, image_url } = req.body;
    
    // Validate required fields
    if (!name || !price || !description || !duration || !category) {
      return res.status(400).json({ 
        error: 'Semua field wajib diisi (name, price, description, duration, category)'
      });
    }
    
    // Validate numeric values
    if (isNaN(price) || isNaN(duration)) {
      return res.status(400).json({ 
        error: 'Price dan duration harus berupa angka'
      });
    }
    
    // Create service
    const service = await prisma.service.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        duration: parseInt(duration),
        category,
        image_url: image_url || null
      }
    });
    
    res.status(201).json({
      message: 'Layanan berhasil ditambahkan',
      data: service
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, duration, category, image_url } = req.body;
    
    // Validate required fields
    if (!name || !price || !description || !duration || !category) {
      return res.status(400).json({ 
        error: 'Semua field wajib diisi (name, price, description, duration, category)'
      });
    }
    
    // Validate numeric values
    if (isNaN(price) || isNaN(duration)) {
      return res.status(400).json({ 
        error: 'Price dan duration harus berupa angka'
      });
    }
    
    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingService) {
      return res.status(404).json({ error: 'Layanan tidak ditemukan' });
    }
    
    // Update service
    const updatedService = await prisma.service.update({
      where: { id: parseInt(id) },
      data: {
        name,
        price: parseFloat(price),
        description,
        duration: parseInt(duration),
        category,
        image_url: image_url || null
      }
    });
    
    res.json({
      message: 'Layanan berhasil diupdate',
      data: updatedService
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingService) {
      return res.status(404).json({ error: 'Layanan tidak ditemukan' });
    }
    
    // Check if service is used in bookings or reviews
    const bookingsCount = await prisma.booking.count({
      where: { serviceId: parseInt(id) }
    });
    
    const reviewsCount = await prisma.review.count({
      where: { serviceId: parseInt(id) }
    });
    
    if (bookingsCount > 0 || reviewsCount > 0) {
      return res.status(400).json({ 
        error: 'Layanan tidak dapat dihapus karena masih digunakan dalam booking atau review',
        bookings: bookingsCount,
        reviews: reviewsCount
      });
    }
    
    // Delete service
    await prisma.service.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({
      message: 'Layanan berhasil dihapus',
      id: parseInt(id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
