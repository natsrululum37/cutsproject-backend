import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      }
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
      where: { id: parseInt(id) }
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
    const { name, rating, comment } = req.body;

    const review = await prisma.review.create({
      data: {
        name,
        rating,
        comment
      }
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
