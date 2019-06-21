-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2018-05-23 06:30:09
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
-- Database: `mynews`
--

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `cname` char(25) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`cid`, `cname`) VALUES
(6, '政治'),
(16, '体育');

-- --------------------------------------------------------

--
-- 表的结构 `press`
--

DROP TABLE IF EXISTS `press`;
CREATE TABLE IF NOT EXISTS `press` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `ptitle` char(50) NOT NULL,
  `pcontent` varchar(50) NOT NULL,
  `pdepartment` char(50) NOT NULL,
  `pdate` datetime NOT NULL,
  `ppicture` char(50) NOT NULL,
  `uname` char(25) NOT NULL,
  `cid` int(11) NOT NULL,
  `clnum` int(11) NOT NULL,
  `review` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `press`
--

INSERT INTO `press` (`pid`, `ptitle`, `pcontent`, `pdepartment`, `pdate`, `ppicture`, `uname`, `cid`, `clnum`, `review`) VALUES
(30, 'aaa', '苟利国家', 'aaaaa', '2018-05-21 10:40:37', '', 'root', 6, 0, 1),
(31, 'asas', '', 'sa', '2018-05-21 10:41:02', '', 'root', 6, 0, 1),
(32, 'aaaaaaaaaaaaaaaaaa', '', 'aaaaaaaaaaaaaa', '2018-05-21 10:41:49', '', 'root', 6, 0, 1),
(33, 'assa', '', 'asdsa', '2018-05-21 10:43:08', '', 'root', 6, 0, 1),
(34, '11', '', '11', '2018-05-21 10:43:34', '', 'root', 6, 0, 1),
(35, '11', '还好1', '11', '2018-05-21 10:45:09', '', 'root', 6, 0, 1);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `uname` char(25) NOT NULL,
  `upassword` char(25) NOT NULL,
  `email` char(25) NOT NULL,
  `jur` int(5) NOT NULL,
  PRIMARY KEY (`uname`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uname`, `upassword`, `email`, `jur`) VALUES
('Aa123', 'Aa123', 'Aa123', 1),
('Aa123212', 'Aa123', 'Aa123', 1),
('root', '12345', 'aaa@qqq.com', 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
