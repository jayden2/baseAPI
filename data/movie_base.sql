-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2016 at 03:01 PM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_base`
--

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `rating` int(2) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `review` varchar(2000) NOT NULL,
  `cover` varchar(100) NOT NULL,
  `year` int(4) NOT NULL,
  `user_id` int(5) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `rating`, `description`, `review`, `cover`, `year`, `user_id`, `updated_at`, `created_at`) VALUES
(1, 'Alice Through the Looking Glass', 6, 'Alice returns to the whimsical world of Wonderland and travels back in time to save the Mad Hatter. ', 'Bobin''s attempt to fill Tim Burton''s shoes generates a lively but ersatz sequel that only truly ticks when Baron Cohen and Bonham Carter are around. ', '', 2017, 1, '2016-05-29 13:27:07', '2016-05-29 13:27:07'),
(2, 'The Angry Birds Movie', 5, 'Find out why the birds are so angry. When an island populated by happy, flightless birds is visited by mysterious green piggies, it''s up to three unlikely outcasts - Red, Chuck and Bomb - to figure out what the pigs are up to. ', 'The Angry Birds Movie is fitfully funny but tends towards a madcap mixture of comedy and action which never develops much forward momentum. The joke-a-minute approach misses more than it hits, although the bright animation and adorably-rendered characters are decent compensation.', '', 2016, 1, '2016-05-29 13:27:07', '2016-05-29 13:27:07'),
(3, 'X-Men: Apocalypse', 6, 'With the emergence of the world''s first mutant, Apocalypse, the X-Men must unite to defeat his extinction level plan.', 'The idea of an apocalypse means every dial has to be turned up to 11 and this film certainly provides bangs for your buck, although there is less space for the surreal strangeness of the X-Men to breathe, less dialogue interest, and they do not have the looser, wittier joy of the Avengers. But the more playful episodes with Cyclops and Quicksilver are welcome and everything hangs together.', '', 2016, 2, '2016-05-29 13:30:50', '2016-05-29 13:30:50'),
(5, 'Bad Neighbours 2', 7, 'When their new next-door neighbors turn out to be a sorority even more debaucherous than the fraternity previously living there, Mac and Kelly team with their former enemy, Teddy, to bring the girls down.', 'Neighbors 2 never lags, and the laughs keep coming, even though they''re coming from a fairly familiar place. If that''s all you want, that''s what you get. But, hey at least you get it, which is more than you can say for most sequels.', '', 2016, 2, '2016-05-29 17:24:53', '2016-05-29 17:24:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'bob', 'bob@gmail.com', 'abc123'),
(2, 'sally', 'sally@gmail.com', '123abc'),
(7, 'user71', 'test71@test.com', 'blah71'),
(5, 'test1', 'test@test.com', 'blah'),
(8, 'user100', 'test100@test.com', '$2a$10$1iyMlTq/2wHY/F4yUqgSzuPkSk1V73VzReSEE33OShI/6O16jlJ82'),
(9, 'user1001', 'test1020@test.com', '$2a$10$OgjMG5wLgrEAUR5j9D8TXe1hANOrWNYZNeF0osNEjeXvWH8cVislm');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
