CREATE DATABASE  IF NOT EXISTS `photoflow` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `photoflow`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: photoflow
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `photo_post`
--

DROP TABLE IF EXISTS `photo_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `photo_post` (
  `POST_ID` int(11) NOT NULL,
  `DESCRIPTION` varchar(200) DEFAULT NULL,
  `CREATED_AT` date DEFAULT NULL,
  `LOCATION` varchar(50) DEFAULT NULL,
  `USER_NAME` varchar(25) DEFAULT NULL,
  `USER_ID` int(11) NOT NULL,
  `PHOTO_LINK` varchar(100) DEFAULT NULL,
  `LIKES` int(11) DEFAULT NULL,
  PRIMARY KEY (`POST_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `photo_post_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_post`
--

LOCK TABLES `photo_post` WRITE;
/*!40000 ALTER TABLE `photo_post` DISABLE KEYS */;
INSERT INTO `photo_post` VALUES (1,'Earth view from google number one','2019-03-10','Minsk','GlebKast',1111,'phLink1.jpg',10),(2,'Earth view from google number two','2019-03-11','Minsk','Levakov',1120,'phLink2.jpg',100500),(3,'Earth view from google number three','2019-03-12','Minsk','Ivanov',1112,'phLink3.jpg',11),(4,'Earth view from google number four','2019-05-07','London','Higgins',1119,'phLink4.jpg',12),(5,'Earth view from google number five','2019-03-13','Minsk','Petrov',1113,'phLink5.jpg',13),(6,'Earth view from google number six','2019-03-14','Vancuver','Raonich',1118,'phLink6.jpg',14000),(7,'Earth view from google number seven','2019-03-16','Minsk','Sidorov',1114,'phLink7.jpg',9),(8,'Earth view from google number eight','2019-03-17','Minsk','Kvitova',1117,'phLink8.jpg',100010),(9,'Earth view from google number nine','2019-03-18','Minsk','Gavrilova',1115,'phLink9.jpg',123),(10,'Earth view from google number ten','2019-03-19','LA','Nishicori',1116,'phLink10.jpg',2000000);
/*!40000 ALTER TABLE `photo_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `USER_ID` int(11) NOT NULL,
  `NAME` varchar(25) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1111,'GlebKast'),(1112,'Ivanov'),(1113,'Petrov'),(1114,'Sidorov'),(1115,'Gavrilova'),(1116,'Nishicori'),(1117,'Kvitova'),(1118,'Raonich'),(1119,'Higgins'),(1120,'Levakov');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'photoflow'
--

--
-- Dumping routines for database 'photoflow'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-07 17:27:54
