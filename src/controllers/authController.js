import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (error) {
    console.error('❌ Error saat registrasi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mendaftar.' });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt:', email);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Email tidak ditemukan' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log('Password salah');
      return res.status(401).json({ message: 'Password salah' });
    }

    console.log('User ditemukan, password cocok');

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log('Token berhasil dibuat');

    res.json({ token });
  } catch (error) {
    console.error('Terjadi kesalahan saat login:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
};
