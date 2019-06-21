-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2018-06-22 06:44:02
-- 服务器版本： 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myshop`
--

-- --------------------------------------------------------

--
-- 表的结构 `adv`
--

DROP TABLE IF EXISTS `adv`;
CREATE TABLE IF NOT EXISTS `adv` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `img` varchar(100) NOT NULL,
  `pos` varchar(40) NOT NULL,
  `url` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `adv`
--

INSERT INTO `adv` (`id`, `img`, `pos`, `url`) VALUES
(7, '../../advPics/1529642660.png', 'NTT算法', 'https://blog.csdn.net/zz_1215/article/details/40430041'),
(6, '../../advPics/1529642601.png', '多项式求逆', 'https://blog.csdn.net/kscla/article/details/79356786'),
(8, '../../advPics/1529642876.jpg', '杭州电子科技大学oj', 'http://acm.hdu.edu.cn/');

-- --------------------------------------------------------

--
-- 表的结构 `brand`
--

DROP TABLE IF EXISTS `brand`;
CREATE TABLE IF NOT EXISTS `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `brand`
--

INSERT INTO `brand` (`id`, `name`) VALUES
(1, 'sd'),
(2, '三星'),
(4, 'hhhhhhhhh'),
(5, '黑苹果');

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `content` text,
  `goods_id` int(11) NOT NULL,
  `time` date DEFAULT NULL,
  `comment_id` int(11) NOT NULL DEFAULT '-1' COMMENT '-1评价商品，否则代表回复某条评论',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

DROP TABLE IF EXISTS `goods`;
CREATE TABLE IF NOT EXISTS `goods` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `img` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `renum` int(11) NOT NULL COMMENT 'remaining number',
  `brand_id` int(11) NOT NULL,
  `kind_id` int(11) NOT NULL,
  `shelf` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`id`, `name`, `img`, `price`, `renum`, `brand_id`, `kind_id`, `shelf`) VALUES
(43, '21', '../../uploadPics/1529649661.png', 12, 12, 1, 3, 0);

-- --------------------------------------------------------

--
-- 表的结构 `indent`
--

DROP TABLE IF EXISTS `indent`;
CREATE TABLE IF NOT EXISTS `indent` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `num` varchar(50) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time` date DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `touch_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `indent`
--

INSERT INTO `indent` (`id`, `num`, `goods_id`, `user_id`, `time`, `status_id`, `touch_id`) VALUES
(7, '1', 30, 1, '2018-06-21', NULL, NULL),
(8, '1', 29, 1, '2018-06-21', NULL, NULL),
(12, '1', 30, 1, '2018-06-22', 1, 7),
(11, '1', 31, 1, '2018-06-22', NULL, NULL),
(13, '1', 30, 1, '2018-06-22', 1, 7);

-- --------------------------------------------------------

--
-- 表的结构 `kind`
--

DROP TABLE IF EXISTS `kind`;
CREATE TABLE IF NOT EXISTS `kind` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `kind`
--

INSERT INTO `kind` (`id`, `name`) VALUES
(3, '智能手机'),
(4, '笔记本电脑'),
(7, 'dds'),
(8, 'dsgdgd'),
(9, 'ewffw'),
(15, 'assasasa啊啊啊');

-- --------------------------------------------------------

--
-- 表的结构 `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(2, 'aaa'),
(1, '买家已付款');

-- --------------------------------------------------------

--
-- 表的结构 `touch`
--

DROP TABLE IF EXISTS `touch`;
CREATE TABLE IF NOT EXISTS `touch` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `addr` varchar(100) NOT NULL,
  `tel` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `touch`
--

INSERT INTO `touch` (`id`, `user_id`, `name`, `addr`, `tel`, `email`) VALUES
(4, 1, '我问问', '往前求无', '221323', '213@@@'),
(5, 1, '21', '12', '21', 'a啊啊啊'),
(7, 1, '21', '12', '12', '21221');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` varchar(20) NOT NULL,
  `nam` varchar(50) NOT NULL,
  `pwd` varchar(50) NOT NULL,
  `jur` tinyint(4) NOT NULL,
  `state` varchar(20) NOT NULL DEFAULT 'normal' COMMENT '用户状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `tel`, `nam`, `pwd`, `jur`, `state`) VALUES
(1, '2113223321', 'Aa123', 'Aa123', 3, 'normal'),
(2, 'asd', 'asdd', 'adsad', 0, 'normal'),
(3, 'as', 'sad', 'dsa', 2, 'normal'),
(4, 'sad', 'sad', 'asd', 0, 'normal'),
(5, 'gsf', 'fd', 'sf', 2, 'unavailable'),
(6, 'gsf', 'fd', 'sf', 2, 'unavailable'),
(7, 'gsf', 'fd', 'sf', 2, 'unavailable'),
(8, 'ds', 'da', 'dsaa', 0, 'normal'),
(9, 'ds', 'da', 'dsaa', 0, 'normal'),
(10, 'sad', 'asd', 'sda', 0, 'normal'),
(11, 'sad', 'asd', 'sda', 0, 'normal'),
(12, 'sa', 'sd', 'sdd', 0, 'unavailable'),
(13, '13261549193', '12342332', '2222222Aa', 1, 'normal'),
(14, '221342144', '2332212323', '312332123221Aa', 1, 'normal'),
(15, '221342144111', '233221232311', '312332123221Aa', 1, 'normal'),
(16, '2111111111', '1221Aa', '1221Aa', 1, 'normal'),
(17, '12213231', '312Aa', '312Aa', 1, 'normal'),
(18, '212321442', '312Aa11', '312Aa', 1, 'normal');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
