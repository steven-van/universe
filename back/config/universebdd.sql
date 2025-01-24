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

-- Structure de la table `contact`
DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `contactID` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`),
  FOREIGN KEY (`contactID`) REFERENCES `user`(`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

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


-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `messageID` INT NOT NULL AUTO_INCREMENT,
  `texte_message` TEXT NOT NULL,
  `date_message` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status_message` VARCHAR(255) DEFAULT NULL,
  `expediteurID` INT NOT NULL,
  `destinataireID` INT NOT NULL,
  `conversationID` INT NOT NULL,
  PRIMARY KEY (`messageID`),
  FOREIGN KEY (`expediteurID`) REFERENCES `user`(`userID`),
  FOREIGN KEY (`destinataireID`) REFERENCES `user`(`userID`),
  INDEX (`conversationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`messageID`, `texte_message`, `date_message`, `status_message`, `expediteurID`, `destinataireID`, `conversationID`) VALUES
-- Message entre Nana SIU et Steven Vanne
(1, 'Steven j`taime pas', '2025-01-12 14:10:00', NULL, 6, 7, 1),
(2, 'Nana casse toi la puante', '2025-01-12 14:12:00', NULL, 7, 6, 1),

-- Message entre Bastien récré et Louis41
(3, 'Louis j`ai encore ajouté 100 euros sur cardmarket', '2025-01-12 15:00:00', NULL, 8, 9, 2),
(4, 'Bastien là je trouve que tu abuses quand même t`auras pas Amphinobi ', '2025-01-12 15:05:00', NULL, 9, 8, 2),

-- Message entre Steven Vanne et Bastien récré
(5, 'Bastien viens on va voir KISS OF LIFE', '2025-01-12 16:00:00', NULL, 7, 8, 3),
(6, 'Vsy quand tu veux on va matter des boules', '2025-01-12 16:15:00', NULL, 8, 7, 3),

-- Message entre Nana SIU et Louis41
(7, 'Louis, viens me faire des bisous sinon je boude !', '2025-01-12 16:30:00', NULL, 6, 9, 4),
(8, 'Ca yèst les meufs que ça prend la tête pour rien..', '2025-01-12 16:40:00', NULL, 9, 6, 4);
COMMIT;


-- --------------------------------------------------------

--
-- Structure de la table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
CREATE TABLE IF NOT EXISTS `conversation`(
  `conversationID` INT NOT NULL AUTO_INCREMENT,
  `user1ID` INT NOT NULL,
  `user2ID` INT NOT NULL,
  PRIMARY KEY (`conversationID`),
  FOREIGN KEY (`user1ID`) REFERENCES `user`(`userID`),
  FOREIGN KEY (`user2ID`) REFERENCES `user`(`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Déchargement des données de la table `conversation`
--

INSERT INTO `conversation` (`conversationID`, `user1ID`, `user2ID`) VALUES
-- Conversation entre nana et steven
(1, 6, 7),
-- Conversation entre Bastien et Louis
(2, 8, 9),
-- Conversation entre Steven et Bastien
(3, 7, 8),
-- Conversation entre Nana et Louis
(4, 6, 9);
COMMIT;
