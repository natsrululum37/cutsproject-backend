import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const changePassword = async (req, res) => {
  try {
    const userId = req.userId; // didapat dari middleware authenticate
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'Semua field wajib diisi.' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Password baru dan konfirmasi tidak sama.' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Password lama salah.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed }
    });

    res.json({ message: 'Password berhasil diubah.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.userId; 
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        phone: true 
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // dari middleware authenticate
    const { name, email, photo, phone } = req.body;

    // Validasi semua field wajib diisi
    if (!name || !email || !photo || !phone) {
      return res.status(400).json({ error: 'Semua field wajib diisi.' });
    }

    // Cek email unik (tidak boleh sama dengan user lain)
    const exist = await prisma.user.findFirst({
      where: {
        email,
        id: { not: userId }
      }
    });
    if (exist) {
      return res.status(400).json({ error: 'Email sudah digunakan oleh user lain.' });
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email, photo },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    await prisma.user.update({
      where: { id: userId },
      data: { phone }
    });

    // Ambil data terbaru
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};