-- Run this script to create the contact_messages table for PostgreSQL
-- Connect to your PostgreSQL server and create the database first:
--   CREATE DATABASE portfolio_db;
--   \c portfolio_db

CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
