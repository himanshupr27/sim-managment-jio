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
-- Table structure for table `ekyc_details`
--

DROP TABLE IF EXISTS `ekyc_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ekyc_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `aadhar` varchar(255) DEFAULT NULL,
  `addresspic` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `pan` varchar(255) DEFAULT NULL,
  `panpic` varchar(255) DEFAULT NULL,
  `profilepic` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aadhar_UNIQUE` (`aadhar`),
  UNIQUE KEY `pan_UNIQUE` (`pan`),
  UNIQUE KEY `UKj6b25ecq4smthfcn04yria7m8` (`profile_id`),
  CONSTRAINT `FKjw9ll6epmq93ug526j6iklst0` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ekyc_details`
--

LOCK TABLES `ekyc_details` WRITE;
/*!40000 ALTER TABLE `ekyc_details` DISABLE KEYS */;
INSERT INTO `ekyc_details` VALUES (1,'123456789012','14.1.png','APROVED','ABCDE4321F','dma1.png','7.PNG','Base64EncodedStringForVideo',1),(2,'123456789015','14.1.png','APROVAL PENDING','ABCDE1235F','dma1.png','7.PNG','Base64EncodedStringForVideo',2),(5,'123456089115','Base64EncodedStringForAddressProofPic','EKYC PENDING','ABCDK1235F','Base64EncodedStringForPanPic','Base64EncodedStringForProfilePic','Base64EncodedStringForVideo',4),(6,'123456123465','3bd25d82-1d60-4df0-941c-48f809e3ea97.png','APROVAL PENDING','CFLPV2867J','f237ecaf-7b25-4012-b6e1-b88056c81b6e.png','00779e45-9556-41e6-afbb-ea58e93b488f.png','c8c7efb9-7856-444b-bb77-8a73d510c135.webm',14),(10,'123123123132','aa1ff40f-3c90-4b9e-9648-0d262f29de1a.png','APROVAL PENDING','CFLPV2869J','dff7ed43-f420-4ed5-b35b-e21f790f34c0.png','4a1694e6-66b3-4045-8428-319a75bec0b4.png','c3c8eb48-636d-4eab-a1f8-9700de83aea1.webm',15);
/*!40000 ALTER TABLE `ekyc_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-07 11:01:21
