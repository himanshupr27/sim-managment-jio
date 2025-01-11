-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: jio_sim
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sims`
--

DROP TABLE IF EXISTS `sims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sims` (
  `sim_id` bigint NOT NULL AUTO_INCREMENT,
  `ciid` varchar(20) NOT NULL,
  `imsi` varchar(20) NOT NULL,
  `add_date` datetime(6) DEFAULT NULL,
  `available` bit(1) DEFAULT NULL,
  `issue_date` datetime(6) DEFAULT NULL,
  `profile_name` varchar(255) DEFAULT NULL,
  `sim_number` varchar(10) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `service_id` bigint DEFAULT NULL,
  `profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`sim_id`),
  UNIQUE KEY `UKg58hgxtwsjlr3wuuot5siui2v` (`ciid`),
  UNIQUE KEY `UKqa9lf5wn8g9lh5nctp5pgb87y` (`imsi`),
  UNIQUE KEY `UKew6qbrosxu91ss9ho8wkrj7kv` (`profile_id`),
  KEY `FKn59dd273prp5yx1n0qlv68qoe` (`service_id`),
  CONSTRAINT `FKe2qk7q6u3sl1851nw4k4yjn7n` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`),
  CONSTRAINT `FKn59dd273prp5yx1n0qlv68qoe` FOREIGN KEY (`service_id`) REFERENCES `services_plan` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sims`
--

LOCK TABLES `sims` WRITE;
/*!40000 ALTER TABLE `sims` DISABLE KEYS */;
INSERT INTO `sims` VALUES (1,'UNIQUE-CIID-12345','UNIQUE-IMSI-67890','2024-12-23 13:21:38.290000',_binary '\0','2024-12-21 05:30:00.000000','John Doe','1234567890','Active',1,1),(4,'UNIQUE-CIID-22345','UNIQUE-IMSI-57890','2024-12-23 13:24:36.309000',_binary '\0','2024-12-21 05:30:00.000000','John Doe','1234567890','Active',1,2),(6,'UNIQUE-CIID-92345','UNIQUE-IMSI-97890','2024-12-23 21:16:02.392000',_binary '\0','2024-12-21 05:30:00.000000','John Doe','1234567890','Active',1,5),(7,'UNIQUE-CIID-99345','UNIQUE-IMSI-99890','2024-12-23 22:53:25.229000',_binary '\0','2024-12-23 22:56:09.942000','John Doe','1234567890','Inactive',NULL,4),(8,'UNIQUE-CIID-99945','UNIQUE-IMSI-99810','2024-12-23 22:57:57.283000',_binary '',NULL,'John Doe','1234567890',NULL,NULL,NULL);
/*!40000 ALTER TABLE `sims` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-07 11:01:20
