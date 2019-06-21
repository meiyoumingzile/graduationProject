-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2018-05-23 07:40:26
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
-- Database: `myticket`
--

-- --------------------------------------------------------

--
-- 表的结构 `field`
--

DROP TABLE IF EXISTS `field`;
CREATE TABLE IF NOT EXISTS `field` (
  `fid` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) NOT NULL,
  `thid` int(11) NOT NULL,
  `begintime` datetime NOT NULL,
  `surtiCnt` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `Selling` int(11) NOT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `field`
--

INSERT INTO `field` (`fid`, `rid`, `thid`, `begintime`, `surtiCnt`, `price`, `Selling`) VALUES
(1, 9, 1, '2018-02-11 04:05:00', 111, 11, 1),
(2, 9, 1, '2112-02-02 21:12:00', 91, 12, 1),
(3, 10, 3, '2018-05-19 02:02:00', 1, 100, 1),
(4, 9, 2, '0021-02-02 02:02:00', 111, 1, 1),
(5, 9, 4, '0032-03-23 22:33:00', 994, 111, 1),
(6, 9, 3, '0001-02-02 02:02:00', 1, 222, 1),
(7, 9, 1, '2121-02-21 02:22:00', 111, 2112, 0);

-- --------------------------------------------------------

--
-- 表的结构 `repertoire`
--

DROP TABLE IF EXISTS `repertoire`;
CREATE TABLE IF NOT EXISTS `repertoire` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `jmmc` char(50) NOT NULL,
  `rtime` date NOT NULL COMMENT '上架时间',
  `jmjs` char(50) NOT NULL,
  `zyyy` char(50) NOT NULL,
  `jmsc` int(11) NOT NULL,
  `jz` char(50) NOT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `repertoire`
--

INSERT INTO `repertoire` (`rid`, `jmmc`, `rtime`, `jmjs`, `zyyy`, `jmsc`, `jz`) VALUES
(12, 'dssda', '2018-05-23', 'asddsa', 'sad', 111, 'repPics/1527056461.png'),
(9, '3232', '2018-05-20', '2332', '3232', 333, 'repPics/1526828808.png'),
(11, '1221', '2018-05-21', '2112', '21', 22, ''),
(14, 'saas', '2018-05-23', 'assasa', 'assa', 10, 'repPics/1527060693.png');

-- --------------------------------------------------------

--
-- 表的结构 `theatre`
--

DROP TABLE IF EXISTS `theatre`;
CREATE TABLE IF NOT EXISTS `theatre` (
  `thid` int(11) NOT NULL AUTO_INCREMENT,
  `jcmc` char(50) NOT NULL,
  `zwsl` int(11) NOT NULL,
  PRIMARY KEY (`thid`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `theatre`
--

INSERT INTO `theatre` (`thid`, `jcmc`, `zwsl`) VALUES
(1, '呵哈剧场', 111),
(2, 'ed', 111),
(3, '哈哈哈哈或剧场', 1),
(4, '的点点滴滴', 1000),
(5, '2121', 111111),
(6, '呵呵呵', 12),
(7, 'sass', 212),
(8, '', 11);

-- --------------------------------------------------------

--
-- 表的结构 `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `tel` char(50) NOT NULL,
  `fid` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `cnt` int(11) NOT NULL,
  `sumprice` int(11) NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ticket`
--

INSERT INTO `ticket` (`tid`, `tel`, `fid`, `price`, `cnt`, `sumprice`) VALUES
(13, 'Aa123', 5, 111, 6, 666),
(12, '1122', 1, 11, 2, 22),
(11, 'Aa123', 2, 12, 4, 48);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `tel` char(25) NOT NULL,
  `uname` char(25) NOT NULL,
  `upassword` char(25) NOT NULL,
  `email` char(25) NOT NULL,
  `jur` int(5) NOT NULL,
  PRIMARY KEY (`tel`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`tel`, `uname`, `upassword`, `email`, `jur`) VALUES
('Aa123', 'Aa123', 'Aa123', 'Aa123', 2),
('1122', '2122', 'Aa123', '122', 1),
('121', '231', 'Aa123', '2113', 1),
('212211122', '2121212', 'Aa123', '2112211221@qq.com', 1),
('1111111222', '22121212121', '22121212121Aa', '222@qq.com', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
