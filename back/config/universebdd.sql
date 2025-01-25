-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generated on: Sat, 11 Jan 2025 14:29
-- Server version: 8.0.31
-- PHP version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: universebdd
--

-- --------------------------------------------------------

--
-- Table structure for table user
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
  `email` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
  `password` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Table structure for table contact
DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `contact_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`contact_id`) REFERENCES `user`(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Data dump for table user
--

INSERT INTO `user` (`user_id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(6, 'Nana SIU', 'nanananananan@gmail.com', '$2b$10$q1Cl4/jNF4JVaethrzA3QuTce/I5zCJwgmixyr.JeBCaNQnf/9Hfa', '2025-01-12 13:51:40', '2025-01-12 13:51:40'),
(7, 'Steven Vanne', 'vanilla@gmail.com', '$2b$10$Wwnybowlje/m3U2TZ9tiA.6XCrh1TOt17wTA4.J7lilIanzQnn/Vm', '2025-01-12 13:52:15', '2025-01-12 13:52:15'),
(8, 'Bastien récré', 'maracasse@gmail.com', '$2b$10$9WCjo75v.uo1959nntyeluoUsaUjxdQvKfL3kBbYuGBkt19U0EasW', '2025-01-12 13:52:49', '2025-01-12 13:52:49'),
(9, 'Louis41', 'pasdechance@gmail.com', '$2b$10$GdkGUYr5Cq6M.jNa5QuDN.U/g2T44KhpoNtpY9po5aCKGKrm4JfJS', '2025-01-12 13:54:32', '2025-01-12 13:54:32');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
