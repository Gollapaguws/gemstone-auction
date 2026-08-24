-- Add admin role to profiles
-- Run this in Supabase SQL Editor

-- Add role column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'seller'));

-- Create index for role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Make gollapagus@gmail.com an admin
UPDATE profiles SET role = 'admin' WHERE email = 'gollapagus@gmail.com';

-- Also update the trigger to include role from metadata
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'Could not create profile: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create a function to check if a user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS policy: only admins can manage products, auctions, etc.
-- Drop existing permissive policies first
DROP POLICY IF EXISTS "Sellers can manage own products" ON products;
DROP POLICY IF EXISTS "Sellers can manage auctions for own products" ON auctions;

-- Products: admins can do everything, sellers can manage own
CREATE POLICY "Admins can manage all products" ON products
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Sellers can manage own products" ON products
  FOR ALL USING (auth.uid() = seller_id);

-- Auctions: admins can manage all
CREATE POLICY "Admins can manage all auctions" ON auctions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Sellers can manage own auctions" ON auctions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = auctions.product_id
      AND products.seller_id = auth.uid()
    )
  );

-- Orders: admins can view all
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = buyer_id);

CREATE POLICY "Admins can manage all orders" ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Social posts: admins only
DROP POLICY IF EXISTS "Admins can manage social posts" ON social_posts;
CREATE POLICY "Admins can manage social posts" ON social_posts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Live sales: admins only
DROP POLICY IF EXISTS "Live sales are viewable by everyone" ON live_sales;
CREATE POLICY "Live sales are viewable by everyone" ON live_sales
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage live sales" ON live_sales
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Categories: admins can manage, everyone can view
CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
