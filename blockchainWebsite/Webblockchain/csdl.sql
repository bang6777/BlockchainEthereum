CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(3) NOT NULL,
  `birthday` date NOT NULL,
  `phonenum` int(10) NOT NULL,
  `address` varchar(255)NOT NULL,
  `created` date NOT NULL,
  `modified` date NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`,`gender`,`birthday`,`phonenum`,`address`,`created`,`modified`,`role`) VALUES (1, 'admin', 'admin', 'nchilinh@gmail.com','nam','23/06/1998','0367225006','Phường Xuân Khánh, Quận Ninh Kiều, Thành Phó Cần Thơ',CURRENT_TIMESTAMP()	,CURRENT_TIMESTAMP(),'admin');

ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;