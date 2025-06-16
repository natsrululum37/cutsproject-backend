import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    console.log('Services fetched from database:', services);
    res.json(services);
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
