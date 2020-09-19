###Schema

CREATE DATABASE staff
-stats-d;
USE staff
-stats-d;

CREATE TABLE `department`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar
(30) NOT NULL DEFAULT '',
  PRIMARY KEY
(`id`)
);

CREATE TABLE `employee`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar
(30) NOT NULL,
  `last_name` varchar
(30) NOT NULL DEFAULT '',
  `role_id` int NOT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY
(`id`)
);

CREATE TABLE `role`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar
(30) CHARACTER NOT NULL DEFAULT '',
  `salary` decimal
(10,0) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY
(`id`)
);
