-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2019-04-16 04:55:24
-- 服务器版本： 5.7.24
-- PHP 版本： 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `car`
--

-- --------------------------------------------------------

--
-- 表的结构 `mydata`
--

DROP TABLE IF EXISTS `mydata`;
CREATE TABLE IF NOT EXISTS `mydata` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `car_id` int(10) NOT NULL,
  `car_time` date NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `temperature` float NOT NULL,
  `humidity` float NOT NULL,
  `energy` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `mydata`
--

INSERT INTO `mydata` (`id`, `car_id`, `car_time`, `latitude`, `longitude`, `temperature`, `humidity`, `energy`) VALUES
(9, 1, '2019-04-14', 17, 63, 5, 11, 47),
(40, 2, '2019-04-14', 56, 23, 90, 27, 68),
(11, 3, '2019-04-14', 59, 11, 21, 5, 25),
(39, 1, '2019-04-14', 53, 72, 97, 90, 82),
(38, 2, '2019-04-14', 69, 18, 58, 92, 21),
(15, 2, '2019-04-14', 63, 33, 77, 29, 67),
(17, 4, '2019-04-14', 80, 27, 92, 31, 87),
(18, 2, '2019-04-14', 40, 58, 77, 32, 54),
(19, 4, '2019-04-14', 92, 42, 97, 91, 61),
(20, 1, '2019-04-14', 66, 96, 26, 33, 37),
(21, 4, '2019-04-14', 70, 49, 70, 71, 84),
(22, 3, '2019-04-14', 14, 56, 91, 31, 64),
(23, 4, '2019-04-14', 28, 85, 47, 70, 91),
(24, 4, '2019-04-14', 18, 18, 15, 18, 56),
(25, 2, '2019-04-14', 35, 30, 58, 83, 67),
(26, 2, '2019-04-14', 39, 11, 51, 15, 70),
(27, 4, '2019-04-14', 83, 96, 37, 71, 54),
(28, 3, '2019-04-14', 75, 84, 59, 59, 93),
(29, 4, '2019-04-14', 87, 2, 60, 1, 9),
(30, 4, '2019-04-14', 26, 24, 6, 78, 67),
(31, 2, '2019-04-14', 94, 38, 21, 41, 85),
(32, 4, '2019-04-14', 36, 73, 29, 55, 99),
(35, 2, '2019-04-14', 28, 93, 71, 75, 29),
(36, 2, '2019-04-14', 57, 75, 48, 4, 31),
(41, 1, '2019-04-14', 34, 8, 0, 97, 63),
(42, 2, '2019-04-14', 7, 45, 63, 35, 19),
(43, 2, '2019-04-14', 25, 74, 67, 96, 92),
(44, 1, '2019-04-14', 0, 96, 38, 44, 6),
(45, 2, '2019-04-14', 70, 91, 48, 35, 58),
(46, 2, '2019-04-14', 38, 13, 22, 5, 17),
(47, 4, '2019-04-14', 41, 8, 13, 28, 65),
(48, 4, '2019-04-14', 29, 53, 100, 65, 99),
(49, 4, '2019-04-14', 24, 33, 19, 1, 22),
(50, 3, '2019-04-14', 40, 8, 92, 8, 67),
(51, 4, '2019-04-14', 16, 9, 94, 15, 81);

-- --------------------------------------------------------

--
-- 表的结构 `remember`
--

DROP TABLE IF EXISTS `remember`;
CREATE TABLE IF NOT EXISTS `remember` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `op_time` datetime NOT NULL,
  `car_id` int(11) NOT NULL,
  `user_name` varchar(40) NOT NULL,
  `operate_name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `remember`
--

INSERT INTO `remember` (`id`, `op_time`, `car_id`, `user_name`, `operate_name`) VALUES
(18, '2019-04-15 15:31:41', 412524, 'hhhh', 'open_shoot'),
(10, '2019-04-15 14:41:13', 45, 'hhhh', 'behind'),
(11, '2019-04-15 14:41:18', 45, 'hhhh', 'right'),
(12, '2019-04-15 14:41:23', 45, 'hhhh', 'left'),
(13, '2019-04-15 14:59:16', 0, 'hhhh', 'open_shoot'),
(14, '2019-04-15 14:59:16', 0, 'hhhh', 'photo'),
(15, '2019-04-15 14:59:17', 0, 'hhhh', 'close_shoot'),
(16, '2019-04-15 14:59:20', 0, 'hhhh', 'photo'),
(17, '2019-04-15 14:59:21', 0, 'hhhh', 'photo'),
(19, '2019-04-15 15:31:42', 412524, 'hhhh', 'close_shoot'),
(20, '2019-04-15 15:31:42', 412524, 'hhhh', 'open_drive'),
(21, '2019-04-15 15:31:42', 412524, 'hhhh', 'close_drive'),
(22, '2019-04-15 15:31:42', 412524, 'hhhh', 'photo'),
(23, '2019-04-15 15:31:43', 412524, 'hhhh', 'open_sensor'),
(24, '2019-04-15 15:31:45', 412524, 'hhhh', 'open_sensor'),
(25, '2019-04-15 15:31:45', 412524, 'hhhh', 'close_sensor'),
(26, '2019-04-15 15:31:45', 412524, 'hhhh', 'open_drive'),
(27, '2019-04-15 15:31:45', 412524, 'hhhh', 'close_drive'),
(28, '2019-04-15 15:31:46', 412524, 'hhhh', 'open_drive'),
(29, '2019-04-15 15:31:46', 412524, 'hhhh', 'close_drive'),
(30, '2019-04-15 15:31:48', 412524, 'hhhh', 'open_shoot'),
(31, '2019-04-15 15:31:48', 412524, 'hhhh', 'close_shoot'),
(32, '2019-04-15 15:31:48', 412524, 'hhhh', 'open_shoot'),
(33, '2019-04-15 15:40:32', 1221, 'hhhh', 'open_shoot'),
(35, '2019-04-15 15:40:44', 1221, 'hhhh', 'open_shoot'),
(36, '2019-04-15 15:40:46', 1221, 'hhhh', 'close_shoot'),
(37, '2019-04-15 15:40:48', 1221, 'hhhh', 'open_drive'),
(38, '2019-04-15 15:40:48', 1221, 'hhhh', 'photo'),
(39, '2019-04-15 15:40:49', 1221, 'hhhh', 'photo'),
(40, '2019-04-15 15:40:49', 1221, 'hhhh', 'close_drive'),
(41, '2019-04-15 15:40:50', 1221, 'hhhh', 'open_sensor'),
(42, '2019-04-15 15:40:50', 1221, 'hhhh', 'close_sensor'),
(43, '2019-04-15 15:40:51', 1221, 'hhhh', 'right'),
(44, '2019-04-15 15:40:51', 1221, 'hhhh', 'front'),
(45, '2019-04-15 15:40:51', 1221, 'hhhh', 'left'),
(46, '2019-04-15 15:40:52', 1221, 'hhhh', 'behind'),
(47, '2019-04-15 15:40:52', 1221, 'hhhh', 'right');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `name` varchar(40) NOT NULL,
  `tel` varchar(40) NOT NULL,
  `pwd` varchar(40) NOT NULL,
  `jur` int(11) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`name`, `tel`, `pwd`, `jur`) VALUES
('hhhh', 'hhhh', 'hhhh', 1),
('422', '111', '422', 1),
('2542', '111111', '2542', 1),
('242', '222222', '242', 1),
('24224', '222222', '24224', 1),
('2422425', '222222', '2422425', 1),
('242111', '4525', '111111', 1),
('11111111111', '01111111111', '111111', 1),
('444444444444444', '444444444444', '111111', 1),
('4254', '542425', '111111', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
