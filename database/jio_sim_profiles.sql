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
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `epin` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK410q61iev7klncmpqfuo85ivh` (`user_id`),
  CONSTRAINT `FK410q61iev7klncmpqfuo85ivh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'Jamshedpur','India','831011','Jharkhand','123 ,Main Street','1990-01-01','123456','Raj kumar','Male','9876543210',1),(2,'Springfield','USA','62704','Illinois','123 Main St','1990-01-01','123456','John Doe','Male','9876543210',1),(4,'Springfield','USA','62704','Illinois','123 Main St','1990-01-01','123456','John Doe','Male','9876543210',NULL),(5,'Springfield','USA','62704','Illinois','123 Main St','1990-01-01','123456','John Doe','Male','9876543210',NULL),(6,'Springfield','USA','62704','Illinois','123 Main St','1990-01-01','123456','John Doe','Male','9876543210',5),(7,'Springfield','USA','62704','Illinois','123 Main St','1990-01-01','123456','John Doe','Male','9876543210',5),(8,'Angul District','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2024-12-05',NULL,'HIMANSHU PRASAD','Male','917761041720',14),(9,'Angul District','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2024-12-05',NULL,'HIMANSHU PRASAD','Male','917761041720',14),(10,'Angul District','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2024-12-05',NULL,'HIMANSHU PRASAD','Male','917761041720',14),(11,'Barbil','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2024-12-01',NULL,'HIMANSHU PRASAD','Male','917761057471',14),(12,'New Delhi','India','831011','Delhi','818 ,B/BLOCK ,MANBODH BASTI , NEAR HERO HONDA SERVICE CENTER, SONARI , JAMSHEDPUR.','2024-12-01','123456','HIMANSHU PRASAD','Male','917761057471',14),(13,'Athagarh','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2002-05-20',NULL,'Himanshu Prasad','TranGender','917761054771',1),(14,'Baragarh','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2024-12-02','123456','Himanshu Prasad','Male','917761057471',1),(15,'Shillong','India','751024','Meghalaya','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2003-01-01','123456','Raj Kumar','Female','919835545018',18);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
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
