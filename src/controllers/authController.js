import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const photo = req.file ? req.file.filename : null;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        photo, 
      },
      select: { id: true, name: true, email: true, photo: true }
    });

    res.status(201).json({ message: 'Registrasi berhasil', user });
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

// Middleware untuk verifikasi token dan ambil userId
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token tidak ditemukan' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};

// Endpoint untuk profile
export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true, role: true, photo: true }
    });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const photoUrl = user.photo
      ? `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/profileUsers/${user.photo}`
      : null;

    res.json({ ...user, photo: photoUrl });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data profile' });
  }
};

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email wajib diisi' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Email tidak ditemukan' });

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

    // Hapus token lama (opsional, biar 1 user hanya punya 1 token aktif)
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    // Simpan token baru
    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expiresAt }
    });

    // Kirim email (gunakan SMTP yang valid di .env)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password CutsProject',
      html: `<p>Klik link berikut untuk reset password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>Link berlaku 1 jam.</p>`
    });

    res.json({ message: 'Link reset password telah dikirim ke email Anda.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengirim email reset password.' });
  }
};

// POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: 'Token dan password baru wajib diisi' });

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!resetToken || resetToken.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Token tidak valid atau sudah kadaluarsa' });
    }

    // Update password user
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashed }
    });

    // Hapus token
    await prisma.passwordResetToken.delete({ where: { token } });

    res.json({ message: 'Password berhasil direset. Silakan login dengan password baru.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal reset password.' });
  }
};
