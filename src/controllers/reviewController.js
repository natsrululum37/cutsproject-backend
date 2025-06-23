import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      include: { service: true } // agar bisa tampil nama layanan jika perlu
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) },
      include: { service: true }
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new review
export const createReview = async (req, res) => {
  try {
    const { name, avatar, rating, comment, serviceId } = req.body;

    if (!name || !rating || !comment || !serviceId) {
      return res.status(400).json({ error: 'Field required: name, rating, comment, serviceId' });
    }

    const review = await prisma.review.create({
      data: {
        name,
        avatar: avatar || null,
        rating: parseInt(rating),
        comment,
        serviceId: parseInt(serviceId)
      }
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
