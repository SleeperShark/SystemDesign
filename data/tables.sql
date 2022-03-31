
DROP TABLE IF EXISTS `kiss`;

CREATE TABLE `kiss` (
  `id` serial PRIMARY KEY,
  `shortUrl` varchar(10) NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT 0,
  INDEX (shortUrl)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `url`;

CREATE TABLE `url` (
  `id` serial PRIMARY KEY,
  `shortUrl` varchar(10) NOT NULL,
  `originalUrl` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `urlbykey`;

CREATE TABLE `urlbykey` (
  `id` serial PRIMARY KEY,
  `originalUrl` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `urlbykgs`;

CREATE TABLE `urlbykgs` (
  `id` serial PRIMARY KEY,
  `shortUrl` varchar(10) NOT NULL,
  `originalUrl` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
