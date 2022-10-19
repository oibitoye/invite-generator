-- Created by Yussuph Ibitoye
-- version 1.0.0
-- https://linkedin.com/in/ibitoyewaley
--
-- Host: db
-- Generation Time: Oct 19, 2022 at 07:25 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nafunion`
--

-- --------------------------------------------------------

--
-- Table structure for table `hosts`
--

CREATE TABLE `hosts` (
  `id` smallint NOT NULL,
  `hostname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invites`
--

CREATE TABLE `invites` (
  `id` smallint NOT NULL,
  `seatnumber` int DEFAULT NULL,
  `inviteid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tablelabel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invitedby` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `urlcode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdby` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invites`
--

INSERT INTO `invites` (`id`, `seatnumber`, `inviteid`, `tablelabel`, `guestname`, `invitedby`, `urlcode`, `createdby`, `createdAt`, `updatedAt`) VALUES
(32, NULL, '3ddb1985-3acc-4640-ab21-c2555b46ecbf', 'Unassigned', 'Brother%20Jere', 'Test One', '2o8wqzj5', 'c87a3559-4f16-11ed-91f4-0242ac190002', '2022-10-19 06:47:17', '2022-10-19 06:47:17');

-- --------------------------------------------------------

--
-- Table structure for table `tablelabels`
--

CREATE TABLE `tablelabels` (
  `id` smallint NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` smallint DEFAULT NULL,
  `userid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creatediv` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userid`, `username`, `firstname`, `lastname`, `hash`, `creatediv`, `createdAt`, `updatedAt`) VALUES
(1, 'c87a3559-4f16-11ed-91f4-0242ac190002', 'admin_naf', 'Super Admin', 'Admin', '$2a$15$I1m9q3NAzBonuNdf4enKZO2Lk/sGW2QPjQhBtbEloUk8jmhsVMHK6', NULL, '2022-10-18 18:57:58', '2022-10-18 18:57:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hosts`
--
ALTER TABLE `hosts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `hostname` (`hostname`),
  ADD UNIQUE KEY `hostname_2` (`hostname`),
  ADD UNIQUE KEY `hostname_3` (`hostname`),
  ADD UNIQUE KEY `hostname_4` (`hostname`),
  ADD UNIQUE KEY `hostname_5` (`hostname`),
  ADD UNIQUE KEY `hostname_6` (`hostname`),
  ADD UNIQUE KEY `hostname_7` (`hostname`),
  ADD UNIQUE KEY `hostname_8` (`hostname`);

--
-- Indexes for table `invites`
--
ALTER TABLE `invites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `urlcode` (`urlcode`),
  ADD UNIQUE KEY `inviteid` (`inviteid`);

--
-- Indexes for table `tablelabels`
--
ALTER TABLE `tablelabels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `label` (`label`),
  ADD UNIQUE KEY `label_2` (`label`),
  ADD UNIQUE KEY `label_3` (`label`),
  ADD UNIQUE KEY `label_4` (`label`),
  ADD UNIQUE KEY `label_5` (`label`),
  ADD UNIQUE KEY `label_6` (`label`),
  ADD UNIQUE KEY `label_7` (`label`),
  ADD UNIQUE KEY `label_8` (`label`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `userid` (`userid`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `username_3` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hosts`
--
ALTER TABLE `hosts`
  MODIFY `id` smallint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invites`
--
ALTER TABLE `invites`
  MODIFY `id` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tablelabels`
--
ALTER TABLE `tablelabels`
  MODIFY `id` smallint NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
