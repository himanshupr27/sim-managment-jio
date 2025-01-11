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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `razor_pay_id` varchar(255) NOT NULL,
  `profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKe473rc0tqp27d8dbaav6m6anf` (`profile_id`),
  CONSTRAINT `FKeieprmmaadhys18lur996ikv4` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,3500,'New York','USA','10001','NY','Main Street',NULL,'2024-12-22','KYC PENDING','rzp_test_12345ABCDEFGHI',NULL),(2,2500,'New York','USA','10001','NY','Main Street',NULL,'2024-12-22','KYC PENDING','rzp_test_12345ABCDEFG',NULL),(3,2500,'New York','USA','10001','NY','Main Street',NULL,'2024-12-22','KYC PENDING','rzp_test_12345ABCDEF',NULL),(4,0,'New York','USA','10001','NY','Main Street',NULL,'2024-12-22','APROVAL PENDING','rzp_test_12345ABCDEFg',2),(6,25000,'New York','USA','10001','NY','Main Street','2024-12-26','2024-12-23','DELIVERED','rzp_test_12345ABCDEFk',1),(8,25000,'New York','USA','10001','NY','Main Street',NULL,'2024-12-23','KYC PENDING','rzp_test_12345ABCDEFkv',4),(10,25000,'New York','USA','10001','NY','Main Street',NULL,'2024-12-24','KYC PENDING','rzp_test_12345ABCDEFkv',7),(11,2775,'Angul District','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar',NULL,'2024-12-24','KYC PENDING','order_Pb5Ny49NkZp7Cq',10),(12,2775,'New Delhi','India','831011','Delhi','818 ,B/BLOCK ,MANBODH BASTI , NEAR HERO HONDA SERVICE CENTER, SONARI , JAMSHEDPUR.',NULL,'2024-12-24','KYC PENDING','order_Pb5fAB4dr5sPfp',12),(13,2775,'New Delhi','India','831011','Delhi','818 ,B/BLOCK ,MANBODH BASTI , NEAR HERO HONDA SERVICE CENTER, SONARI , JAMSHEDPUR.','2024-12-26','2024-12-25','DELIVERED','order_PbT1S9hquPxops',13),(14,2775,'Baragarh','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar',NULL,'2024-12-25','KYC PENDING','order_PbTeCNj6FaKjlY',14),(15,2775,'Shillong','India','751024','Meghalaya','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar',NULL,'2024-12-27','KYC PENDING','order_Pc5lV5GYSms694',15);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
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
