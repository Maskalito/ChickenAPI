-- Create the database
CREATE DATABASE chickendb;

-- Connect to the database
\c chickendb

-- Create the 'chickens' table
CREATE TABLE chickens (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    weight NUMERIC NOT NULL,
    steps INT DEFAULT 0 NOT NULL,
    isRunning BOOLEAN DEFAULT false NOT NULL,
    CONSTRAINT unique_chicken_name_birthday UNIQUE (name, birthday)
);

-- Insert data into the 'chickens' table
INSERT INTO chickens (name, birthday, weight, steps, isRunning)
VALUES ('Chickie', '2023-08-25', 2.5, 0, false);
