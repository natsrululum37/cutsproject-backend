import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /api/admin/reservations
export const getAllReservations = async (req, res) => {
  try {
    // Ambil query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    // Buat kondisi filter untuk search
    const searchCondition = search 
      ? {
          OR: [
            { name: { contains: search } },
            { phone: { contains: search } },
            { service: { name: { contains: search } } },
          ],
        } 
      : {};

    // Hitung total records untuk pagination
    const totalCount = await prisma.booking.count({
      where: searchCondition
    });

    // Ambil data dengan filter, pagination, dan relasi
    const reservations = await prisma.booking.findMany({
      where: searchCondition,
      skip,
      take: limit,
      orderBy: { date: 'desc' },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            price: true,
            duration: true,
          }
        }
      }
    });

    // Format tanggal ke WIB
    const formattedReservations = reservations.map(booking => {
      const bookingDate = new Date(booking.date);
      return {
        ...booking,
        formattedDate: bookingDate.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
      };
    });

    res.json({
      data: formattedReservations,
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

// PATCH /api/admin/reservations/:id/done
export const markReservationDone = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validasi ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'ID reservasi tidak valid' });
    }

    // Cek apakah reservasi ada
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) }
    });

    if (!booking) {
      return res.status(404).json({ error: 'Reservasi tidak ditemukan' });
    }

    // Update status menjadi COMPLETED
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status: 'COMPLETED' },
      include: { service: true }
    });

    res.json({
      message: 'Reservasi berhasil ditandai selesai',
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH /api/admin/reservations/:id/cancel
export const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancelReason } = req.body;
    
    // Validasi ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'ID reservasi tidak valid' });
    }

    // Validasi alasan pembatalan
    if (!cancelReason) {
      return res.status(400).json({ error: 'Alasan pembatalan diperlukan' });
    }

    // Cek apakah reservasi ada
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) }
    });

    if (!booking) {
      return res.status(404).json({ error: 'Reservasi tidak ditemukan' });
    }

    // Update status menjadi CANCELLED dengan alasan
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { 
        status: 'CANCELLED',
        cancelReason: cancelReason
      },
      include: { service: true }
    });

    res.json({
      message: 'Reservasi berhasil dibatalkan',
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};