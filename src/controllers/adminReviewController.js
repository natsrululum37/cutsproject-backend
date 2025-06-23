import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAdminReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const deleted = req.query.deleted === 'true'; 
    const skip = (page - 1) * limit;

    const searchCondition = search 
      ? {
          OR: [
            { name: { contains: search } },
            { comment: { contains: search } },
            { service: { name: { contains: search } } },
          ],
        } 
      : {};

    const whereCondition = {
      ...searchCondition,
      deleted: deleted,
    };

    const totalCount = await prisma.review.count({
      where: whereCondition
    });

    const reviews = await prisma.review.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            price: true,
          }
        }
      }
    });

    const formattedReviews = reviews.map(review => {
      const date = new Date(review.createdAt);
      const now = new Date();
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

      const formattedDate = date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      return {
        id: review.id,
        name: review.name,
        avatar: review.avatar || `https://randomuser.me/api/portraits/men/${review.id % 99}.jpg`,
        rating: review.rating,
        dateRelative: dateText,
        dateFormatted: formattedDate,
        comment: review.comment,
        serviceName: review.service.name,
        serviceId: review.serviceId,
        deleted: review.deleted,
        createdAt: review.createdAt,
      };
    });

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

// Soft delete review
export const softDeleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'ID testimoni tidak valid' });
    }

    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) }
    });

    if (!review) {
      return res.status(404).json({ error: 'Testimoni tidak ditemukan' });
    }

    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { deleted: true }
    });

    res.json({
      message: 'Testimoni berhasil dihapus',
      data: updatedReview
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Restore deleted review
export const restoreReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'ID testimoni tidak valid' });
    }

    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) }
    });

    if (!review) {
      return res.status(404).json({ error: 'Testimoni tidak ditemukan' });
    }

    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { deleted: false }
    });

    res.json({
      message: 'Testimoni berhasil dipulihkan',
      data: updatedReview
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};