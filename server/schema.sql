-- PostgreSQL Database Schema for Portfolio Application

CREATE TABLE IF NOT EXISTS profile (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
  name VARCHAR(100) NOT NULL,
  title VARCHAR(150) NOT NULL,
  bio TEXT,
  tagline TEXT,
  location VARCHAR(100),
  status VARCHAR(100),
  resume_url VARCHAR(255),
  socials JSONB,
  stats JSONB,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  tagline TEXT,
  description TEXT,
  tech_stack JSONB,
  github VARCHAR(255),
  demo VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  image_placeholder VARCHAR(255),
  metrics JSONB,
  architecture JSONB,
  features JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  level INT NOT NULL,
  icon VARCHAR(50),
  description TEXT,
  tags JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experiences (
  id VARCHAR(100) PRIMARY KEY,
  role VARCHAR(150) NOT NULL,
  company VARCHAR(150) NOT NULL,
  period VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  type VARCHAR(50),
  highlights JSONB,
  skills JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
