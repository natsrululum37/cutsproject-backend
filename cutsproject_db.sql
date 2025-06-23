-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2025 at 08:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cutsproject_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL,
  `time` varchar(191) NOT NULL,
  `serviceId` int(11) NOT NULL,
  `notes` text DEFAULT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED','COMPLETED') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `title`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Classic Cut', 'gallery1.webp', '2025-06-16 17:22:29.602', '2025-06-16 17:22:29.602'),
(2, 'Modern Style', 'gallery2.webp', '2025-06-16 17:22:29.602', '2025-06-16 17:22:29.602'),
(3, 'Trending Look', 'gallery3.webp', '2025-06-16 17:22:29.602', '2025-06-16 17:22:29.602'),
(4, 'Premium Service', 'gallery4.webp', '2025-06-16 17:22:29.602', '2025-06-16 17:22:29.602'),
(5, 'Classic Cut', 'gallery1.webp', '2025-06-20 03:02:58.580', '2025-06-20 03:02:58.580'),
(6, 'Modern Style', 'gallery2.webp', '2025-06-20 03:02:58.580', '2025-06-20 03:02:58.580'),
(7, 'Trending Look', 'gallery3.webp', '2025-06-20 03:02:58.580', '2025-06-20 03:02:58.580'),
(8, 'Premium Service', 'gallery4.webp', '2025-06-20 03:02:58.580', '2025-06-20 03:02:58.580');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `comment` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `name`, `rating`, `comment`, `createdAt`, `updatedAt`) VALUES
(1, 'John Doe', 5, 'Great service and very professional staff!', '2025-06-16 17:22:29.605', '2025-06-16 17:22:29.605'),
(2, 'Mike Smith', 4, 'Really happy with my new haircut!', '2025-06-16 17:22:29.605', '2025-06-16 17:22:29.605'),
(3, 'David Wilson', 5, 'Best barbershop in town! Highly recommended.', '2025-06-16 17:22:29.605', '2025-06-16 17:22:29.605'),
(4, 'John Doe', 5, 'Great service and very professional staff!', '2025-06-20 03:02:58.582', '2025-06-20 03:02:58.582'),
(5, 'Mike Smith', 4, 'Really happy with my new haircut!', '2025-06-20 03:02:58.582', '2025-06-20 03:02:58.582'),
(6, 'David Wilson', 5, 'Best barbershop in town! Highly recommended.', '2025-06-20 03:02:58.582', '2025-06-20 03:02:58.582');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `price` double NOT NULL,
  `category` varchar(191) NOT NULL DEFAULT 'Layanan Umum',
  `duration` int(11) NOT NULL,
  `image_url` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `description`, `price`, `category`, `duration`, `image_url`, `createdAt`, `updatedAt`) VALUES
(2, 'Hair Cut', 'Potong + Keramas + hair tonic + hot towel + Blow dry + full styling', 50000, 'Layanan Umum', 45, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(3, 'Shaving', 'Razor, facial shaves, full trim, dll', 5000, 'Layanan Umum', 20, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(4, 'Treatments', 'Protein hair mask, creambath, dandruff scalling, totok wajah, pijat 15 menit, dll.', 20000, 'Layanan Umum', 30, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(5, 'Pro Sculpting', 'Pelurusan rambut permanen natural dengan 4 tahap proses', 205000, 'Layanan Pro & Pewarnaan', 180, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(6, 'Paket Coloring', 'Merk reguler, merk premium, merk exotic', 188000, 'Layanan Pro & Pewarnaan', 120, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(7, 'Top Perming', 'Keriting permanen dengan tingkat ke keritingan yang bervariatif', 196000, 'Layanan Pro & Pewarnaan', 150, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(8, 'Pomade', 'Pomade waterbased, oilbased, clay, wax, dan styling product lainnya', 30000, 'Perawatan & Produk Styling Rambut', 0, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(9, 'Shampoo', 'Shampoo khusus pria, anti ketombe, hair tonic, dan vitamin rambut', 25000, 'Perawatan & Produk Styling Rambut', 0, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(10, 'VIP Treatment', 'Full service dengan ruangan private dan layanan premium', 250000, 'Layanan Premium', 120, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(11, 'Kids Haircut', 'Khusus anak-anak usia 5-12 tahun', 35000, 'Layanan Premium', 45, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-16 17:22:29.594', '2025-06-16 17:22:29.594'),
(12, 'Hair Cut', 'Potong + Keramas + hair tonic + hot towel + Blow dry + full styling', 50000, 'Layanan Umum', 45, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-20 03:02:58.578', '2025-06-20 03:02:58.578'),
(13, 'Shaving', 'Razor, facial shaves, full trim, dll', 5000, 'Layanan Umum', 20, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-20 03:02:58.578', '2025-06-20 03:02:58.578'),
(14, 'Treatments', 'Protein hair mask, creambath, dandruff scalling, totok wajah, pijat 15 menit, dll.', 20000, 'Layanan Umum', 30, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-20 03:02:58.578', '2025-06-20 03:02:58.578'),
(15, 'Pro Sculpting', 'Pelurusan rambut permanen natural dengan 4 tahap proses', 205000, 'Layanan Pro & Pewarnaan', 180, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-20 03:02:58.578', '2025-06-20 03:02:58.578'),
(16, 'Paket Coloring', 'Merk reguler, merk premium, merk exotic', 188000, 'Layanan Pro & Pewarnaan', 120, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-20 03:02:58.578', '2025-06-20 03:02:58.578'),
(17, 'Top Perming', 'Keriting permanen dengan tingkat ke keritingan yang bervariatif', 196000, 'Layanan Pro & Pewarnaan', 150, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-20 03:02:58.578', '2025-06-20 03:02:58.578'),
(18, 'Pomade', 'Pomade waterbased, oilbased, clay, wax, dan styling product lainnya', 30000, 'Perawatan & Produk Styling Rambut', 0, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-20 03:02:58.578', '2025-06-20 03:02:58.578'),
(19, 'Shampoo', 'Shampoo khusus pria, anti ketombe, hair tonic, dan vitamin rambut', 25000, 'Perawatan & Produk Styling Rambut', 0, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-20 03:02:58.578', '2025-06-20 03:02:58.578'),
(20, 'VIP Treatment', 'Full service dengan ruangan private dan layanan premium', 250000, 'Layanan Premium', 120, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-20 03:02:58.578', '2025-06-20 03:02:58.578'),
(21, 'Kids Haircut', 'Khusus anak-anak usia 5-12 tahun', 35000, 'Layanan Premium', 45, 'https://i.pinimg.com/736x/21/28/90/212890306280060a7431acd99d11cc37.jpg', '2025-06-20 03:02:58.578', '2025-06-20 03:02:58.578');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'user',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin Satu', 'admin1@cutsproject.com', '$2a$10$XvDj7cJ8ePTB6il8Sht/zeEMa0hXmr04PEbCCAQ7FGMbsfynyDbRW', 'admin', '2025-06-20 03:02:58.566', '2025-06-20 03:02:58.566'),
(2, 'Admin Dua', 'admin2@cutsproject.com', '$2a$10$XvDj7cJ8ePTB6il8Sht/zeEMa0hXmr04PEbCCAQ7FGMbsfynyDbRW', 'admin', '2025-06-20 03:02:58.570', '2025-06-20 03:02:58.570'),
(3, 'User Satu', 'user1@cutsproject.com', '$2a$10$XvDj7cJ8ePTB6il8Sht/zeEMa0hXmr04PEbCCAQ7FGMbsfynyDbRW', 'user', '2025-06-20 03:02:58.572', '2025-06-20 03:02:58.572'),
(4, 'User Dua', 'user2@cutsproject.com', '$2a$10$XvDj7cJ8ePTB6il8Sht/zeEMa0hXmr04PEbCCAQ7FGMbsfynyDbRW', 'user', '2025-06-20 03:02:58.574', '2025-06-20 03:02:58.574'),
(5, 'User Tiga', 'user3@cutsproject.com', '$2a$10$XvDj7cJ8ePTB6il8Sht/zeEMa0hXmr04PEbCCAQ7FGMbsfynyDbRW', 'user', '2025-06-20 03:02:58.575', '2025-06-20 03:02:58.575'),
(6, 'Agi', 'agimuhammad99@gmail.com', '$2a$10$NMmFrJkos9tp.rHXgUuuMum.2IOO8PoB364/vTE36DwcUIS8dMkta', 'user', '2025-06-20 04:32:27.498', '2025-06-20 04:32:27.498'),
(7, 'abc', 'abc@gmail.com', '$2a$10$ad0elcVS4Lu14L5J2otXweutfv8HzHhjxzNh5qQn0JRgFBDpCU1um', 'user', '2025-06-21 09:35:33.075', '2025-06-21 09:35:33.075'),
(8, 'eria', 'eria@gmail.com', '$2a$10$pIEFJueUJfBoy/5hXSgMU.oRtLQngmeW4Gn/GpdBSKvp9JncjwjIS', 'user', '2025-06-21 09:38:46.717', '2025-06-21 09:38:46.717');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('6d2688fb-de2f-4fad-8af2-019839615375', 'a636ff01c1596636a7b2c0a684baa53b043a1936d673fcda39ec8c0312cdc041', '2025-06-20 02:37:34.729', '20250619100602_add_user_model', NULL, NULL, '2025-06-20 02:37:34.705', 1),
('ada1ec5b-85da-4656-b2eb-da2aa805fcda', 'c911931b906265b7aee8bdb9dba0d3aac284ba33cfb31d36d45cd212cc5d1fe9', '2025-06-16 16:53:35.819', '20250616165335_init', NULL, NULL, '2025-06-16 16:53:35.768', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Booking_serviceId_fkey` (`serviceId`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `Booking_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
