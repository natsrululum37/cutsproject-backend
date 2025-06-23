import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export const updateAdminProfile = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const data = { name, email };
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }
    // Cari user dulu, pastikan admin
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak, bukan admin' });
    }
    const updated = await prisma.user.update({
      where: { id: Number(req.userId) },
      data
    });
    res.json({ message: 'Profil admin berhasil diupdate', admin: updated });
  } catch (error) {
    res.status(500).json({ message: 'Gagal update profil admin' });
  }
};

export const logout = (req, res) => {
  // Frontend cukup menghapus token dari localStorage/cookie
  res.json({ message: 'Logout berhasil' });
};