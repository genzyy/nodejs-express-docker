CREATE DATABASE IF NOT EXISTS driversdb;

USE driversdb;

DROP TABLE IF EXISTS drivers;

CREATE TABLE drivers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name      VARCHAR(255) DEFAULT NULL,
    last_name       VARCHAR(255) DEFAULT NULL,
    email           VARCHAR(255) DEFAULT NULL,
    vehicle         VARCHAR(255) DEFAULT NULL,
    race_position   BIGINT       DEFAULT NULL,
    entered_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Drivers_Email, UNIQUE(email)
);