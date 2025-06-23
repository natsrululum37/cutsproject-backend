import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

async function main() {
  console.log('✨ Starting seeding...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const services = [
    // Layanan Umum
    {
      name: 'Hair Cut',
      description: 'Potong + Keramas + hair tonic + hot towel + Blow dry + full styling',
      price: 50000,
      category: 'Layanan Umum',
      duration: 45,
      image_url: 'https://iili.io/FIiCUZP.jpg'
    },
    {
      name: 'Shaving',
      description: 'Razor, facial shaves, full trim, dll',
      price: 5000,
      category: 'Layanan Umum',
      duration: 20,
      image_url: 'https://iili.io/FIiCrn1.jpg'
    },
    {
      name: 'Treatments',
      description: 'Protein hair mask, creambath, dandruff scalling, totok wajah, pijat 15 menit, dll.',
      price: 20000,
      category: 'Layanan Umum',
      duration: 30,
      image_url: 'https://iili.io/FIiCGu2.jpg'
    },
    // Pro & Pewarnaan
    {
      name: 'Pro Sculpting',
      description: 'Pelurusan rambut permanen natural dengan 4 tahap proses',
      price: 205000,
      category: 'Layanan Pro & Pewarnaan',
      duration: 180,
      image_url: 'https://iili.io/FIiChGe.jpg'
    },
    {
      name: 'Paket Coloring',
      description: 'Merk reguler, merk premium, merk exotic',
      price: 188000,
      category: 'Layanan Pro & Pewarnaan',
      duration: 120,
      image_url: 'https://iili.io/FIiCOaj.jpg'
    },
    {
      name: 'Top Perming',
      description: 'Keriting permanen dengan tingkat ke keritingan yang bervariatif',
      price: 196000,
      category: 'Layanan Pro & Pewarnaan',
      duration: 150,
      image_url: 'https://iili.io/FIiC8uV.jpg'
    },
    // Produk Styling
    {
      name: 'Pomade',
      description: 'Pomade waterbased, oilbased, clay, wax, dan styling product lainnya',
      price: 30000,
      category: 'Perawatan & Produk Styling Rambut',
      duration: 0,
      image_url: 'https://iili.io/FIiCMjS.jpg'
    },
    {
      name: 'Shampoo',
      description: 'Shampoo khusus pria, anti ketombe, hair tonic, dan vitamin rambut',
      price: 25000,
      category: 'Perawatan & Produk Styling Rambut',
      duration: 0,
      image_url: 'https://iili.io/FIiC66g.md.jpg'
    },
    // Premium
    {
      name: 'VIP Treatment',
      description: 'Full service dengan ruangan private dan layanan premium',
      price: 250000,
      category: 'Layanan Premium',
      duration: 120,
      image_url: 'https://iili.io/FIiCVZ7.jpg'
    },
    {
      name: 'Kids Haircut',
      description: 'Khusus anak-anak usia 5-12 tahun',
      price: 35000,
      category: 'Layanan Premium',
      duration: 45,
      image_url: 'https://iili.io/FIiCSwB.jpg'
    },
  ];

  const gallery = [
    { title: 'Classic Taper', image: 'https://iili.io/FILOSY7.webp' },
    { title: 'Textured Crop', image: 'https://iili.io/FILOUv9.md.webp' },
    { title: 'Vintage Cut', image: 'https://iili.io/FILOgpe.webp' },
    { title: 'Messy Textured', image: 'https://iili.io/FILOPQj.webp' },
    { title: 'Classic Fade', image: 'https://iili.io/FILOLEQ.webp' },
    { title: 'Slick Back Style', image: 'https://iili.io/FILOQ4V.webp' },
    { title: 'Modern Pompadour', image: 'https://iili.io/FILODYP.webp' },
    { title: 'Clean Fade', image: 'https://iili.io/FILObv1.webp' },
    { title: 'Modern Quiff', image: 'https://iili.io/FILeHZJ.webp' },
  ];

  const reviews = [
    { name: 'John Doe', rating: 5, comment: 'Great service and very professional staff!', serviceId: 1, avatar: 'https://i.pravatar.cc/150?img=1'},
    { name: 'Mike Smith', rating: 4, comment: 'Really happy with my new haircut!', serviceId: 2, avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'David Wilson', rating: 5, comment: 'Best barbershop in town! Highly recommended.', serviceId: 3,  avatar: 'https://i.pravatar.cc/150?img=1' },
  ];

  const users = [
    {
      name: 'Admin Satu',
      email: 'admin1@cutsproject.com',
      password: hashedPassword,
      role: 'admin',
    },
    {
      name: 'Admin Dua',
      email: 'admin2@cutsproject.com',
      password: hashedPassword,
      role: 'admin',
    },
    {
      name: 'User Satu',
      email: 'user1@cutsproject.com',
      password: hashedPassword,
      role: 'user',
    },
    {
      name: 'User Dua',
      email: 'user2@cutsproject.com',
      password: hashedPassword,
      role: 'user',
    },
    {
      name: 'User Tiga',
      email: 'user3@cutsproject.com',
      password: hashedPassword,
      role: 'user',
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('👉 Seeding users...');

  // Batch seeding with createMany where possible
  console.log('👉 Seeding services...');
  await prisma.service.createMany({
    data: services,
    skipDuplicates: true
  });

  console.log('👉 Seeding gallery...');
  await prisma.gallery.createMany({
    data: gallery,
    skipDuplicates: true
  });

  console.log('👉 Seeding reviews...');
  await prisma.review.createMany({
    data: reviews,
    skipDuplicates: true
  });

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
