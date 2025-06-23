import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

// GET /api/admin/profile
export const getAdminProfile = async (req, res) => {
  try {
    const userId = req.userId; // didapat dari middleware authenticate

    // Cek apakah user adalah admin
    const admin = await prisma.user.findFirst({
      where: { 
        id: userId,
        role: 'admin'
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true
      }
    });

    if (!admin) {
      return res.status(404).json({ error: 'Admin tidak ditemukan' });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/admin/profile
export const updateAdminProfile = async (req, res) => {
  try {
    const userId = req.userId; // didapat dari middleware authenticate
    const { name, email, photo} = req.body;

    // Validasi field wajib
    if (!name || !email) {
      return res.status(400).json({ error: 'Nama dan email wajib diisi' });
    }

    // Cek apakah user adalah admin
    const adminCheck = await prisma.user.findFirst({
      where: { 
        id: userId,
        role: 'admin'
      }
    });

    if (!adminCheck) {
      return res.status(404).json({ error: 'Admin tidak ditemukan' });
    }

    // Cek email unik (kecuali untuk dirinya sendiri)
    const exist = await prisma.user.findFirst({
      where: {
        email,
        id: { not: userId }
      }
    });

    if (exist) {
      return res.status(400).json({ error: 'Email sudah digunakan oleh pengguna lain' });
    }

    // Update profil admin
    const updatedAdmin = await prisma.user.update({
      where: { id: userId },
      data: { name, email, photo}, 
      select: {
        id: true,
        name: true,
        email: true,
        photo: true
      }
    });

    res.json({
      message: 'Profil admin berhasil diupdate',
      admin: updatedAdmin
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/admin/logout
export const logout = (req, res) => {
  // Frontend cukup menghapus token dari localStorage/cookie
  res.json({ message: 'Logout berhasil' });
};