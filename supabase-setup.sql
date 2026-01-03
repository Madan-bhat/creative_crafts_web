-- Creative Crafts Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Site Content Table
CREATE TABLE IF NOT EXISTS site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Storage Bucket for Product Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Storage Policy: Anyone can view product images
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Storage Policy: Authenticated users can update their uploads
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

-- Storage Policy: Authenticated users can delete uploads
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- RLS Policies for Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active categories"
ON categories FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "Authenticated users can view all categories"
ON categories FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert categories"
ON categories FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
ON categories FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete categories"
ON categories FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
ON products FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "Authenticated users can view all products"
ON products FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert products"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
ON products FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete products"
ON products FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for Site Content
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content"
ON site_content FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can update site content"
ON site_content FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert site content"
ON site_content FOR INSERT
TO authenticated
WITH CHECK (true);

-- Insert Default Categories
INSERT INTO categories (name, slug, description) VALUES
('Wedding Keepsakes', 'wedding-keepsakes', 'Custom wedding gifts and keepsakes'),
('Resin Art', 'resin-art', 'Beautiful resin art pieces'),
('Custom Gifts', 'custom-gifts', 'Personalized gifts for all occasions'),
('Frames & Decor', 'frames-decor', 'Custom frames and home decor')
ON CONFLICT (slug) DO NOTHING;

-- Insert Default Site Content
INSERT INTO site_content (section, title, description) VALUES
('hero', 'Handmade Crafts, Made Personal', 'Custom gifts, wedding keepsakes, and resin art—crafted with care, emotion, and detail.'),
('about', 'Handcrafted with Heart', 'At Creative Crafts, we believe every special moment deserves something equally special. That''s why we handcraft each piece with care, attention, and a personal touch.'),
('contact', 'Let''s Create Something Special', 'Have a custom order in mind? Get in touch and we''ll bring your vision to life.'),
('footer', 'Creative Crafts', 'Handmade crafts, made personal. Creating memories, one piece at a time.')
ON CONFLICT (section) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active) WHERE is_active = true;
