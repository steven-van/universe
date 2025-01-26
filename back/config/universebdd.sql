SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: universebdd
--

DROP SCHEMA IF EXISTS universebdd;
CREATE SCHEMA universebdd;
USE universebdd;

-- --------------------------------------------------------

--
-- Table structure for table user
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
  `lastname` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
  `email` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
  `password` VARCHAR(255) COLLATE utf8mb4_bin NOT NULL,
  `birthday` DATE COLLATE utf8mb4_bin NOT NULL, -- Format : YYYY-MM-DD
  `phone` VARCHAR(20) COLLATE utf8mb4_bin NOT NULL,
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

INSERT INTO `user` (`user_id`, `firstname`, `lastname`, `email`, `password`, `birthday`, `phone`, `created_at`, `updated_at`) VALUES
(6, 'Nana', 'SIU', 'nanananananan@gmail.com', '$2b$10$q1Cl4/jNF4JVaethrzA3QuTce/I5zCJwgmixyr.JeBCaNQnf/9Hfa', '1990-05-15', '07 82 16 92 18', '2025-01-12 13:51:40', '2025-01-12 13:51:40'),
(7, 'Steven', 'Vanne', 'vanilla@gmail.com', '$2b$10$Wwnybowlje/m3U2TZ9tiA.6XCrh1TOt17wTA4.J7lilIanzQnn/Vm', '1985-08-20', '07 82 16 92 18', '2025-01-12 13:52:15', '2025-01-12 13:52:15'),
(8, 'Bastien', 'récré', 'maracasse@gmail.com', '$2b$10$9WCjo75v.uo1959nntyeluoUsaUjxdQvKfL3kBbYuGBkt19U0EasW', '1992-11-30', '07 82 16 92 18', '2025-01-12 13:52:49', '2025-01-12 13:52:49'),
(9, 'Louis', '41', 'pasdechance@gmail.com', '$2b$10$GdkGUYr5Cq6M.jNa5QuDN.U/g2T44KhpoNtpY9po5aCKGKrm4JfJS', '1988-02-25', '07 82 16 92 18', '2025-01-12 13:54:32', '2025-01-12 13:54:32');
COMMIT;

-- Data dump for table contact
INSERT INTO `contact` (`user_id`, `contact_id`, `created_at`, `updated_at`) VALUES
(6, 7, '2025-01-12 14:00:00', '2025-01-12 14:00:00'),  -- Nana SIU and Steven Vanne
(6, 8, '2025-01-12 14:01:00', '2025-01-12 14:01:00'),  -- Nana SIU and Bastien récré
(7, 9, '2025-01-12 14:02:00', '2025-01-12 14:02:00'),  -- Steven Vanne and Louis41
(8, 6, '2025-01-12 14:03:00', '2025-01-12 14:03:00');  -- Bastien récré and Nana SIU