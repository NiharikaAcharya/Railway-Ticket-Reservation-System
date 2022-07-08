SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `admin` (
  -- `id` int(10) UNSIGNED NOT NULL primary key,
  `username` varchar(20) NOT NULL,
  `password` char(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL primary key,
  `username` varchar(20) NOT NULL,
  `password` char(60) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `country` varchar(10) NOT NULL,
  `nationality` varchar(10) NOT NULL,
  `occupation` varchar(10) NOT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `phnumber` bigint(10) NOT NULL,
  `address` varchar(30) NOT NULL,
  `city` varchar(10) NOT NULL,
  `district` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `train` (
  `train_number` int(10) NOT NULL primary key,
  `train_name` varchar(25) NOT NULL,
   `date` date NOT NULL,
  `seats` int(10) NOT NULL DEFAULT '180',
  `start` varchar(10) NOT NULL,
  `end` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `fare`(
`ticket_fare` int(25) NOT NULL,
`convenience_fee` float(10) NOT NULL,
`travel_insurance_premium` float(10) NOT NULL,
 `start` varchar(10) NOT NULL,
  `end` varchar(10) NOT NULL,
  `Timings` varchar(7) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ticket` (
  `PNR` varchar(20) NOT NULL primary key,
  `id` int(10) UNSIGNED NOT NULL,
   `train_number` int(10) NOT NULL,
   `number_of_seats` varchar(25) NOT NULL,
  `date_booking` date NOT NULL,
  `date_journey` date NOT NULL,
   `Timings` varchar(7) NOT NULL,
  `start` varchar(10) NOT NULL,
  `end` varchar(10) NOT NULL,
  `ticket_fare` int(25) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'CONFIRMED'

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- CREATE TABLE `ticket_seat` (
--   `PNR` varchar(25) NOT NULL,
--   `seat_number` varchar(25) NOT NULL,
--     `Timings` varchar(7) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ALTER TABLE `ticket_seat`
--   ADD KEY `PNR` (`PNR`);



  ALTER TABLE `ticket`
  ADD KEY `train_number` (`train_number`);

  -- ALTER TABLE `ticket`
  -- ADD KEY `seat_number` (`seat_number`);

  ALTER TABLE `ticket`
  ADD KEY `start` (`start`);

  ALTER TABLE `ticket`
  ADD KEY `end` (`end`);

  ALTER TABLE `ticket`
  ADD KEY `ticket_fare` (`ticket_fare`);

ALTER TABLE `ticket`
  ADD KEY `id` (`id`);

  ALTER TABLE `ticket`
  ADD KEY `Timings` (`Timings`);

  ALTER TABLE `fare`
  ADD KEY `start` (`start`);

ALTER TABLE `fare`
  ADD KEY `end` (`end`);


--   insert into `admin` (username,password,ID) VALUES ("Niharika","niharika","4ni19cs075");
-- insert into `admin` (username,password,ID) VALUES ("Ramitha","ramitha","4ni19cs092");
-- insert into `admin` (username,password,ID) VALUES ("Priyanka","priyanka","4ni19cs087");

-- alter TABLE `admin` add column `ID` varchar(15) NOT NULL;

-- insert into `train` (train_number,train_name,date,seats,start,end) values (12345,"mysore express","2022-02-01",180,"mysore","banglore");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (12345,"mysore express","2022-02-02",180,"mysore","banglore");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (12345,"mysore express","2022-02-03",180,"mysore","banglore");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (12345,"mysore express","2022-02-04",180,"mysore","banglore");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (12345,"mysore express","2022-02-05",180,"mysore","banglore");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (12345,"mysore express","2022-02-06",180,"mysore","banglore");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (12345,"mysore express","2022-02-07",180,"mysore","banglore");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (12345,"mysore express","2022-02-08",180,"mysore","banglore");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (12345,"mysore express","2022-02-09",180,"mysore","banglore");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (12345,"mysore express","2022-02-10",180,"mysore","banglore");

-- insert into `train` (train_number,train_name,date,seats,start,end) values (67895,"udupi express","2022-02-01",180,"mysore","udupi");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (67895,"udupi express","2022-02-02",180,"mysore","udupi");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (67895,"udupi express","2022-02-03",180,"mysore","udupi");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (67895,"udupi express","2022-02-04",180,"mysore","udupi");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (67895,"udupi express","2022-02-05",180,"mysore","udupi");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (67895,"udupi express","2022-02-06",180,"mysore","udupi");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (67895,"udupi express","2022-02-07",180,"mysore","udupi");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (67895,"udupi express","2022-02-08",180,"mysore","udupi");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (67895,"udupi express","2022-02-09",180,"mysore","udupi");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (67895,"udupi express","2022-02-10",180,"mysore","udupi");

-- insert into `train` (train_number,train_name,date,seats,start,end) values (98456,"chennai express","2022-02-01",180,"mysore","chennai");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (98456,"chennai express","2022-02-02",180,"mysore","chennai");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (98456,"chennai express","2022-02-03",180,"mysore","chennai");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (98456,"chennai express","2022-02-04",180,"mysore","chennai");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (98456,"chennai express","2022-02-05",180,"mysore","chennai");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (98456,"chennai express","2022-02-06",180,"mysore","chennai");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (98456,"chennai express","2022-02-07",180,"mysore","chennai");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (98456,"chennai express","2022-02-08",180,"mysore","chennai");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (98456,"chennai express","2022-02-09",180,"mysore","chennai");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (98456,"chennai express","2022-02-10",180,"mysore","chennai");

-- insert into `train` (train_number,train_name,date,seats,start,end) values (93456,"bombay express","2022-02-01",180,"mysore","bombay");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (93456,"bombay express","2022-02-02",180,"mysore","bombay");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (93456,"bombay express","2022-02-03",180,"mysore","bombay");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (93456,"bombay express","2022-02-04",180,"mysore","bombay");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (93456,"bombay express","2022-02-05",180,"mysore","bombay");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (93456,"bombay express","2022-02-06",180,"mysore","bombay");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (93456,"bombay express","2022-02-07",180,"mysore","bombay");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (93456,"bombay express","2022-02-08",180,"mysore","bombay");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (93456,"bombay express","2022-02-09",180,"mysore","bombay");
-- insert into `train` (train_number,train_name,date,seats,start,end) values (93456,"bombay express","2022-02-10",180,"mysore","bombay");


  -- 2