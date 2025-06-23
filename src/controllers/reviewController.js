import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    // Pagination (opsional)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination info
    const totalCount = await prisma.review.count();
    
    // Get reviews with pagination, sorting, and relation
    const reviews = await prisma.review.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }, // Sort by newest first
      include: { service: true } // Include service data (JOIN)
    });

    // Format data untuk frontend
    const formattedReviews = reviews.map(review => {
      // Format tanggal - tambahkan 7 jam untuk WIB
      const date = new Date(review.createdAt);
      date.setHours(date.getHours() + 7);
      
      const now = new Date();
      now.setHours(now.getHours() + 7);
      
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let dateText;
      if (diffDays === 0) {
        dateText = 'Hari ini';
      } else if (diffDays === 1) {
        dateText = 'Kemarin';
      } else if (diffDays < 7) {
        dateText = `${diffDays} hari yang lalu`;
      } else if (diffDays < 30) {
        dateText = `${Math.floor(diffDays / 7)} minggu yang lalu`;
      } else {
        dateText = `${Math.floor(diffDays / 30)} bulan yang lalu`;
      }

      return {
        id: review.id,
        name: review.name,
        avatar: review.avatar || `https://randomuser.me/api/portraits/men/${review.id % 99}.jpg`,
        rating: review.rating,
        date: dateText,
        comment: review.comment,
        service: review.service.name, // Ambil nama layanan saja
        serviceId: review.serviceId,
        createdAt: date,
        originalDate: review.createdAt,
        convertedDate: date
      };
    });

    // Return data with pagination info
    res.json({
      data: formattedReviews,
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

    // Tambahkan service data untuk response lengkap
    const createdReview = await prisma.review.findUnique({
      where: { id: review.id },
      include: { service: true }
    });

    // Format untuk frontend
    const date = new Date(createdReview.createdAt);
    date.setHours(date.getHours() + 7);
    
    const formattedReview = {
      id: createdReview.id,
      name: createdReview.name,
      avatar: createdReview.avatar || `https://randomuser.me/api/portraits/men/${createdReview.id % 99}.jpg`,
      rating: createdReview.rating,
      date: 'Baru saja',
      comment: createdReview.comment,
      service: createdReview.service.name,
      serviceId: createdReview.serviceId,
      createdAt: date
    };

    res.status(201).json(formattedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tambahkan ini jika route /:id masih digunakan:
export const getReviewById = async (req, res) => {
  return res.status(501).json({ message: "Not implemented yet" });
};
