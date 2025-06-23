import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

// GET /api/admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { id: true, name: true, email: true, photo: true, createdAt: true, updatedAt: true }
    });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/admins
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, photo } = req.body;
    if (!name || !email || !password || !photo) {
      return res.status(400).json({ error: 'Semua field wajib diisi.' });
    }
    // Cek email unik
    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
      return res.status(400).json({ error: 'Email sudah terdaftar.' });
    }
    // Hash password (opsional, jika ingin hash)
    const hashed = await bcrypt.hash(password, 10);
    const admin = await prisma.user.create({
      data: { name, email, password: hashed, photo, role: 'admin' }
    });
    res.status(201).json({ id: admin.id, name: admin.name, email: admin.email, photo: admin.photo, role: admin.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/admins/:id
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, photo } = req.body;
    if (!name || !email || !photo) {
      return res.status(400).json({ error: 'Semua field wajib diisi.' });
    }
    // Cek email unik (kecuali untuk dirinya sendiri)
    const exist = await prisma.user.findFirst({ where: { email, id: { not: Number(id) } } });
    if (exist) {
      return res.status(400).json({ error: 'Email sudah terdaftar.' });
    }
    const admin = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, photo }
    });
    res.json({ id: admin.id, name: admin.name, email: admin.email, photo: admin.photo, role: admin.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/admins/:id
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: 'Admin berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // Total reservasi
    const totalBooking = await prisma.booking.count();

    // Total layanan (tanpa filter status)
    const totalActiveServices = await prisma.service.count();

    // Total testimoni
    const totalReviews = await prisma.review.count();

    // Statistik reservasi per bulan (6 bulan terakhir)
    const now = new Date();
    const months = [];
    const labels = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(date);
      labels.push(date.toLocaleString('default', { month: 'short', year: 'numeric' }));
    }

    // Ambil data booking per bulan
    const bookingsPerMonth = await Promise.all(
      months.map(async (date, idx) => {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        const count = await prisma.booking.count({
          where: {
            date: {
              gte: start,
              lt: end
            }
          }
        });
        return count;
      })
    );

    res.json({
      totalBooking,
      totalActiveServices,
      totalReviews,
      chart: {
        labels,
        data: bookingsPerMonth
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};