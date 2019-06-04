CREATE DATABASE  IF NOT EXISTS `world` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `world`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: world
-- ------------------------------------------------------
-- Server version	5.5.28-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
--  for table `bank_gear`
--

LOCK TABLES `bank_gear` WRITE;
/*!40000 ALTER TABLE `bank_gear` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_gear` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_attribute`
--

LOCK TABLES `bank_attribute` WRITE;
/*!40000 ALTER TABLE `bank_attribute` DISABLE KEYS */;
INSERT INTO `bank_attribute` VALUES (1,'Critical Hit Chance',1),(2,'Critical Hit Damage',1),(3,'Weapon Damage',1),(4,'Headshot Damage',1),(5,'Armor',2),(6,'Health',2),(7,'Armor Percentage',2),(8,'Health Percentage',2),(9,'Skill power',3),(10,'Cooldown reduction',3),(11,'Hazard protection',2),(12,'Damage to Elite',1),(13,'AR Damage',1),(14,'LMG Damage',1),(15,'SMG Damage',1),(16,'Rifle Damage',1),(17,'Marksman Damage',1),(18,'Shotgun Damage',1),(19,'Pistol Damage',1);
/*!40000 ALTER TABLE `bank_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_gearpassivemembership`
--

LOCK TABLES `bank_gearpassivemembership` WRITE;
/*!40000 ALTER TABLE `bank_gearpassivemembership` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_gearpassivemembership` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_weaponpassivemembership`
--

LOCK TABLES `bank_weaponpassivemembership` WRITE;
/*!40000 ALTER TABLE `bank_weaponpassivemembership` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_weaponpassivemembership` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_weapon`
--

LOCK TABLES `bank_weapon` WRITE;
/*!40000 ALTER TABLE `bank_weapon` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_weapon` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_gearfamily`
--

LOCK TABLES `bank_gearfamily` WRITE;
/*!40000 ALTER TABLE `bank_gearfamily` DISABLE KEYS */;
INSERT INTO `bank_gearfamily` VALUES (1,'5.11 Tactical'),(2,'Airaldi Holdings'),(3,'Alps Summit Armament'),(4,'Badger Tuff'),(5,'China Light Industries'),(6,'Douglas & Harding'),(7,'Fenris Group AB'),(8,'Gila Guard'),(9,'Murakami Industries'),(10,'Overlord Armaments'),(11,'Petrov Defense Group'),(12,'Providence Defense'),(13,'Richter & Kaiser'),(14,'Sokolov Convern'),(15,'Wyvern Wear'),(16,'Yaahl Gear'),(17,'Aces & Eights'),(18,'Hardwired'),(19,'Negotiators Dilemna'),(20,'Ongoing Directive'),(21,'Tip of the Spear'),(22,'True Patriot');
/*!40000 ALTER TABLE `bank_gearfamily` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_passiveweapontalent`
--

LOCK TABLES `bank_passiveweapontalent` WRITE;
/*!40000 ALTER TABLE `bank_passiveweapontalent` DISABLE KEYS */;
INSERT INTO `bank_passiveweapontalent` VALUES (1,'Accurate'),(2,'Allegro'),(3,'Distance'),(4,'Extra'),(5,'Jazz hands'),(6,'Optimized'),(7,'Stable');
/*!40000 ALTER TABLE `bank_passiveweapontalent` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_gearattribute`
--

LOCK TABLES `bank_gearattribute` WRITE;
/*!40000 ALTER TABLE `bank_gearattribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_gearattribute` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_passivegeartalent`
--

LOCK TABLES `bank_passivegeartalent` WRITE;
/*!40000 ALTER TABLE `bank_passivegeartalent` DISABLE KEYS */;
INSERT INTO `bank_passivegeartalent` VALUES (1,'Capacitive'),(2,'Critical'),(3,'Destructive'),(4,'Devastating'),(5,'Empowered'),(6,'Hard hitting'),(7,'Hardened'),(8,'Insulated'),(9,'Precise'),(10,'Restorative'),(11,'Self adjusting'),(12,'Surge'),(13,'Surgical'),(14,'Vital');
/*!40000 ALTER TABLE `bank_passivegeartalent` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_geartype`
--

LOCK TABLES `bank_geartype` WRITE;
/*!40000 ALTER TABLE `bank_geartype` DISABLE KEYS */;
INSERT INTO `bank_geartype` VALUES (1,'Mask'),(2,'Backpack'),(3,'Vest'),(4,'Gloves'),(5,'Holster'),(6,'Kneepads');
/*!40000 ALTER TABLE `bank_geartype` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_weaponfamily`
--

LOCK TABLES `bank_weaponfamily` WRITE;
/*!40000 ALTER TABLE `bank_weaponfamily` DISABLE KEYS */;
INSERT INTO `bank_weaponfamily` VALUES (1,'Assault Rifle'),(2,'Rifle'),(3,'Marksman'),(4,'SMG'),(5,'LMG'),(6,'Shotgun');
/*!40000 ALTER TABLE `bank_weaponfamily` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_gearmod`
--

LOCK TABLES `bank_gearmod` WRITE;
/*!40000 ALTER TABLE `bank_gearmod` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_gearmod` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_attributetype`
--

LOCK TABLES `bank_attributetype` WRITE;
/*!40000 ALTER TABLE `bank_attributetype` DISABLE KEYS */;
INSERT INTO `bank_attributetype` VALUES (1,'Offensive'),(2,'Defensive'),(3,'Utility');
/*!40000 ALTER TABLE `bank_attributetype` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_activeweapontalent`
--

LOCK TABLES `bank_activeweapontalent` WRITE;
/*!40000 ALTER TABLE `bank_activeweapontalent` DISABLE KEYS */;
INSERT INTO `bank_activeweapontalent` VALUES (1,'Boomerang'),(2,'Breadbasket'),(3,'Close & personal'),(4,'Eyeless'),(5,'Fast  hands'),(6,'Finisher'),(7,'First blood'),(8,'Frenzy'),(9,'Ignited'),(10,'Killer'),(11,'Lucky shot'),(12,'Measured'),(13,'Naked'),(14,'Near sighted'),(15,'On empty'),(16,'Optimist'),(17,'Outsider'),(18,'Perpetuation'),(19,'Premeditated'),(20,'Preservation'),(21,'Pummel'),(22,'Ranger'),(23,'Reformation'),(24,'Rifleman'),(25,'Sadist'),(26,'Salvage'),(27,'Spike'),(28,'Steady handed'),(29,'Strained'),(30,'Unhinged'),(31,'Unwavering'),(32,'Vindictive');
/*!40000 ALTER TABLE `bank_activeweapontalent` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_activegeartalent`
--

LOCK TABLES `bank_activegeartalent` WRITE;
/*!40000 ALTER TABLE `bank_activegeartalent` DISABLE KEYS */;
INSERT INTO `bank_activegeartalent` VALUES (1,'Berserk'),(2,'Blacksmith'),(3,'Bloodlust'),(4,'Bloodsucker'),(5,'Braced'),(6,'Calculated'),(7,'Centered'),(8,'Cloaked'),(9,'Clutch'),(10,'Compensated'),(11,'Creeping death'),(12,'Dialed in'),(13,'Efficient'),(14,'Entrench'),(15,'Filler up'),(16,'Gunslinger'),(17,'Knee cap'),(18,'Mad bomber'),(19,'Obliterate'),(20,'On the ropes'),(21,'Opportunistic'),(22,'Patience'),(23,'Payload'),(24,'Reassigned'),(25,'Safeguard'),(26,'Skilled'),(27,'Spotter'),(28,'Tech support'),(29,'Terminate'),(30,'To order'),(31,'Trauma'),(32,'Unbreakable'),(33,'Unstoppable force'),(34,'Wicked');
/*!40000 ALTER TABLE `bank_activegeartalent` ENABLE KEYS */;
UNLOCK TABLES;

--
--  for table `bank_weaponvariant`
--

LOCK TABLES `bank_weaponvariant` WRITE;
/*!40000 ALTER TABLE `bank_weaponvariant` DISABLE KEYS */;
INSERT INTO `bank_weaponvariant` VALUES (1,'AK-M',0,1),(2,'Blackmarket AK-M',0,1),(3,'Custom P416 G3',0,1),(4,'FAMAS 2010',0,1),(5,'Military AK-M',0,1),(6,'Military P416',0,1),(7,'Blackmarket M60 E6',0,5),(8,'Blackmarket RPK-74',0,5),(9,'Classic M60',0,5),(10,'Classic RPK-74',0,5),(11,'Custom L86 A2',0,5),(12,'Infantry MG5',0,5),(13,'MG5',0,5),(14,'Military L86 LSW',0,5),(15,'Military M60 E4',0,5),(16,'Military RPK-74',0,5),(17,'Military MK17',0,2),(18,'Police MK17',0,2),(19,'Urban MDR',0,2);
/*!40000 ALTER TABLE `bank_weaponvariant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-04 18:04:13
