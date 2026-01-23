-- Supabase Schema for Portfolio Website
-- Run this in your Supabase SQL Editor

-- Create category types
-- Blog Categories: tech-ai, reviews, short-stories, culture
CREATE TYPE blog_category AS ENUM ('tech-ai', 'reviews', 'short-stories', 'culture');
-- Project Categories: ai-ml, web-dev, automation, data-analytics
CREATE TYPE project_category AS ENUM ('ai-ml', 'web-dev', 'automation', 'data-analytics');

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'web-dev',
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table with category
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT DEFAULT 'tech-ai',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for projects
CREATE POLICY "Public can read projects" ON projects
  FOR SELECT USING (true);

-- Public read access for published blog posts
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Public can insert contact submissions
CREATE POLICY "Public can submit contact" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

-- Sample data for testing (optional)
-- Sample data for testing (optional)
INSERT INTO projects (title, description, tech_stack, category, github_url, featured) VALUES
  ('AI Research Assistant', 'A machine learning powered research tool for physics papers', ARRAY['Python', 'TensorFlow', 'FastAPI', 'React'], 'ai-ml', 'https://github.com/pranata-dev/ai-research', true),
  ('Automation Pipeline', 'End-to-end automation for data processing workflows', ARRAY['Python', 'Apache Airflow', 'Docker'], 'automation', 'https://github.com/pranata-dev/automation', true),
  ('Neural Network Visualizer', 'Interactive visualization tool for deep learning models', ARRAY['TypeScript', 'D3.js', 'Next.js'], 'ai-ml', 'https://github.com/pranata-dev/nn-viz', false);

INSERT INTO blog_posts (title, slug, excerpt, content, category, published) VALUES
  ('Getting Started with ML in Physics Research', 'ml-physics-intro', 'An introduction to applying machine learning techniques in physics research.', '# Getting Started with ML...', 'tech-ai', true),
  ('Building Automation Systems from Scratch', 'automation-systems', 'A practical guide to creating robust automation pipelines.', '# Building Automation Systems...', 'tech-ai', true),
  ('Review: The Best AI Tools of 2024', 'best-ai-tools-2024', 'A comprehensive review of the most impactful AI tools.', '# Best AI Tools of 2024...', 'reviews', true),
  ('The Last Algorithm', 'the-last-algorithm', 'A short story about an AI researcher who discovers something unexpected.', '# The Last Algorithm...', 'short-stories', true),
  ('How K-Pop Embraced AI Technology', 'kpop-ai-technology', 'Exploring the intersection of Korean pop culture and AI.', '# K-Pop and AI...', 'culture', true);
