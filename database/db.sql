DROP TABLE IF EXISTS `gags`;
CREATE TABLE `gags` (
	`id` int(11) PRIMARY KEY AUTO_INCREMENT,
	`content` text DEFAULT NULL,
	`author` text NULL,
	`location` varchar(255) NULL,
	`gag_hash` varchar(255) NULL,
	`origin` varchar(255) NULL,
	`highlight_date` datetime NULL,
	`used_in` varchar(255) NULL,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
