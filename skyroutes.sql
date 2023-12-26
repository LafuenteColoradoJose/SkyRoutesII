-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2023 a las 12:49:31
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `skyroutes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aircrafts`
--

CREATE TABLE `aircrafts` (
  `id` int(11) NOT NULL,
  `modelo` varchar(255) NOT NULL,
  `matricula` varchar(255) NOT NULL,
  `velocidad` varchar(155) NOT NULL,
  `turbulence` varchar(255) NOT NULL,
  `combustible` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `aircrafts`
--

INSERT INTO `aircrafts` (`id`, `modelo`, `matricula`, `velocidad`, `turbulence`, `combustible`, `img`) VALUES
(1, 'Cessna 172SP', 'EC-NAQ', '90', 'L', '38', '/aircrafts/Cessna172.svg'),
(3, 'Beechcraft Baron 58', 'EC-CFZ', '200', 'M', '190', '/aircrafts/baron58.svg'),
(6, 'Cessna Citation X', 'EC-WZZ', '473', 'H', '13000', '/aircrafts/citationX.svg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `airports`
--

CREATE TABLE `airports` (
  `id` int(11) NOT NULL,
  `ICAO` varchar(4) NOT NULL,
  `name` varchar(255) NOT NULL,
  `LAT` varchar(255) NOT NULL,
  `LON` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `airports`
--

INSERT INTO `airports` (`id`, `ICAO`, `name`, `LAT`, `LON`) VALUES
(1, 'LEBA', 'CORDOBA', '37.8419440', '-4.8488890'),
(4, 'LEBB', 'BILBAO', '43.3011110', '-2.9105560'),
(6, 'LECO', 'A CORUÑA', '43.3019440', '-8.3772220'),
(8, 'LEMD', 'MADRID', '40.4722220', '-3.5608330'),
(10, 'LEMG', 'MALAGA', '36.6750000', '-4.4991670'),
(12, 'LEPA', 'PALMA', '39.5516670', '2.7388890'),
(14, 'LEVC', 'VALENCIA', '39.4894440', '-0.4816670'),
(16, 'LEZL', 'SEVILLA', '37.4180560', '-5.8988890'),
(18, 'LEBL', 'BARCELONA', '41.2969440', '2.0783330');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `flightplans`
--

CREATE TABLE `flightplans` (
  `id` int(11) NOT NULL,
  `fpOrigin` varchar(255) NOT NULL,
  `fpDestination` varchar(255) NOT NULL,
  `distance` varchar(255) NOT NULL,
  `maxAltitude` varchar(255) NOT NULL,
  `waypoints` int(5) NOT NULL,
  `idAircraft` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `userID` int(11) NOT NULL,
  `license` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `license` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `user`, `email`, `password`, `license`, `admin`) VALUES
(40, 'pepe', 'pepote', 'pp@pp.com', '1234', 'no tengo', 0),
(56, 'JuanAntonio', 'juanito', 'juan@juan.com', '1234', 'prueba1234', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aircrafts`
--
ALTER TABLE `aircrafts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `airports`
--
ALTER TABLE `airports`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `flightplans`
--
ALTER TABLE `flightplans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `idAircraft` (`idAircraft`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aircrafts`
--
ALTER TABLE `aircrafts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `airports`
--
ALTER TABLE `airports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `flightplans`
--
ALTER TABLE `flightplans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `flightplans`
--
ALTER TABLE `flightplans`
  ADD CONSTRAINT `flightplans_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `flightplans_ibfk_2` FOREIGN KEY (`idAircraft`) REFERENCES `aircrafts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
