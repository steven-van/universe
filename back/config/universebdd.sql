-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 11 jan. 2025 à 14:29
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `universebdd`
--

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf16_bin NOT NULL,
  `email` varchar(255) COLLATE utf16_bin NOT NULL,
  `password` varchar(255) COLLATE utf16_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`userID`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(6, 'Nana SIU', 'nanananananan@gmail.com', '$2b$10$q1Cl4/jNF4JVaethrzA3QuTce/I5zCJwgmixyr.JeBCaNQnf/9Hfa', '2025-01-12 13:51:40', '2025-01-12 13:51:40'),
(7, 'Steven Vanne', 'vanilla@gmail.com', '$2b$10$Wwnybowlje/m3U2TZ9tiA.6XCrh1TOt17wTA4.J7lilIanzQnn/Vm', '2025-01-12 13:52:15', '2025-01-12 13:52:15'),
(8, 'Bastien récré', 'maracasse@gmail.com', '$2b$10$9WCjo75v.uo1959nntyeluoUsaUjxdQvKfL3kBbYuGBkt19U0EasW', '2025-01-12 13:52:49', '2025-01-12 13:52:49'),
(9, 'Louis41', 'pasdechance@gmail.com', '$2b$10$GdkGUYr5Cq6M.jNa5QuDN.U/g2T44KhpoNtpY9po5aCKGKrm4JfJS', '2025-01-12 13:54:32', '2025-01-12 13:54:32');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
