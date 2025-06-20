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
      image_url: 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg'
    },
    {
      name: 'Shaving',
      description: 'Razor, facial shaves, full trim, dll',
      price: 5000,
      category: 'Layanan Umum',
      duration: 20,
      image_url: 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg'
    },
    {
      name: 'Treatments',
      description: 'Protein hair mask, creambath, dandruff scalling, totok wajah, pijat 15 menit, dll.',
      price: 20000,
      category: 'Layanan Umum',
      duration: 30,
      image_url: 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg'
    },
    // Pro & Pewarnaan
    {
      name: 'Pro Sculpting',
      description: 'Pelurusan rambut permanen natural dengan 4 tahap proses',
      price: 205000,
      category: 'Layanan Pro & Pewarnaan',
      duration: 180,
      image_url: 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg'
    },
    {
      name: 'Paket Coloring',
      description: 'Merk reguler, merk premium, merk exotic',
      price: 188000,
      category: 'Layanan Pro & Pewarnaan',
      duration: 120,
      image_url: 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg'
    },
    {
      name: 'Top Perming',
      description: 'Keriting permanen dengan tingkat ke keritingan yang bervariatif',
      price: 196000,
      category: 'Layanan Pro & Pewarnaan',
      duration: 150,
      image_url: 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg'
    },
    // Produk Styling
    {
      name: 'Pomade',
      description: 'Pomade waterbased, oilbased, clay, wax, dan styling product lainnya',
      price: 30000,
      category: 'Perawatan & Produk Styling Rambut',
      duration: 0,
      image_url: 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg'
    },
    {
      name: 'Shampoo',
      description: 'Shampoo khusus pria, anti ketombe, hair tonic, dan vitamin rambut',
      price: 25000,
      category: 'Perawatan & Produk Styling Rambut',
      duration: 0,
      image_url: 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg'
    },
    // Premium
    {
      name: 'VIP Treatment',
      description: 'Full service dengan ruangan private dan layanan premium',
      price: 250000,
      category: 'Layanan Premium',
      duration: 120,
      image_url: 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg'
    },
    {
      name: 'Kids Haircut',
      description: 'Khusus anak-anak usia 5-12 tahun',
      price: 35000,
      category: 'Layanan Premium',
      duration: 45,
      image_url: 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg'
    },
  ];

  const gallery = [
    { title: 'Classic Cut', image: 'gallery1.webp' },
    { title: 'Modern Style', image: 'gallery2.webp' },
    { title: 'Trending Look', image: 'gallery3.webp' },
    { title: 'Premium Service', image: 'gallery4.webp' },
  ];

  const reviews = [
    { name: 'John Doe', rating: 5, comment: 'Great service and very professional staff!' },
    { name: 'Mike Smith', rating: 4, comment: 'Really happy with my new haircut!' },
    { name: 'David Wilson', rating: 5, comment: 'Best barbershop in town! Highly recommended.' },
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
