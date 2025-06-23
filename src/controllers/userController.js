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