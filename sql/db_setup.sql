-- create user
CREATE USER 'cosc203' IDENTIFIED BY 'password';
GRANT ALL ON *.* TO 'cosc203' WITH GRANT OPTION;

-- create database
DROP TABLE IF EXISTS ConservationStatus;
DROP TABLE IF EXISTS Bird;
DROP TABLE IF EXISTS Photos;
DROP DATABASE ASGN2;

SET foreign_key_checks = 0;

CREATE DATABASE ASGN2;
USE ASGN2;

-- create tables
CREATE TABLE ConservationStatus (
    status_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(255) NOT NULL,
    status_colour CHAR(7) NOT NULL
);

CREATE TABLE Bird (
    bird_id INT NOT NULL PRIMARY KEY,
    primary_name  VARCHAR(50), 
    english_name   VARCHAR(50), 
    scientific_name  VARCHAR(50), 
    order_name VARCHAR(50), 
    family  VARCHAR(50), 
    weight  VARCHAR(10) , 
    length  VARCHAR(10) , 
    status_id  INT NOT NULL ,
    CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES ConservationStatus(status_id)
);

CREATE TABLE Photos (
    bird_id INT NOT NULL,
    filename   VARCHAR(100),
    photographer  VARCHAR(100),
    photo_id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    CONSTRAINT fk_bird_id   FOREIGN KEY (bird_id)   REFERENCES Bird(bird_id)
);





