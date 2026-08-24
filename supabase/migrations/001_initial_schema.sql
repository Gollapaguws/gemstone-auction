-- =============================================
-- African Gems & Minerals Auction Webapp
-- Supabase Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES
-- =============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  location TEXT,
  preferred_currency TEXT DEFAULT 'ZAR',
  is_seller BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =============================================
-- CATEGORIES
-- =============================================
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- =============================================
-- PRODUCTS
-- =============================================
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seller_id UUID REFERENCES profiles(id),
  category_id UUID REFERENCES categories(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  origin TEXT,
  dimensions TEXT,
  weight TEXT,
  condition TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  price INTEGER, -- amount in cents
  currency TEXT DEFAULT 'ZAR',
  type TEXT DEFAULT 'fixed_price' CHECK (type IN ('fixed_price', 'auction', 'offer')),
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'sold', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (status = 'active');

CREATE POLICY "Sellers can manage own products" ON products
  FOR ALL USING (auth.uid() = seller_id);

-- =============================================
-- AUCTIONS
-- =============================================
CREATE TABLE auctions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  auction_type TEXT NOT NULL CHECK (auction_type IN ('timed', 'live', 'silent')),
  start_price INTEGER NOT NULL, -- in cents
  reserve_price INTEGER, -- in cents
  current_price INTEGER, -- in cents
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  is_live BOOLEAN DEFAULT FALSE,
  stream_url TEXT,
  winner_id UUID REFERENCES profiles(id),
  final_price INTEGER, -- in cents
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Auctions are viewable by everyone" ON auctions
  FOR SELECT USING (true);

CREATE POLICY "Sellers can manage auctions for own products" ON auctions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = auctions.product_id
      AND products.seller_id = auth.uid()
    )
  );

-- =============================================
-- BIDS
-- =============================================
CREATE TABLE bids (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  auction_id UUID REFERENCES auctions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  is_winning BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bids are viewable by everyone" ON bids
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can place bids" ON bids
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- OFFERS
-- =============================================
CREATE TABLE offers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'countered')),
  counter_amount INTEGER, -- in cents
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own offers" ON offers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Sellers can view offers on own products" ON offers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = offers.product_id
      AND products.seller_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create offers" ON offers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- ORDERS
-- =============================================
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  buyer_id UUID REFERENCES profiles(id) NOT NULL,
  seller_id UUID REFERENCES profiles(id),
  product_id UUID REFERENCES products(id) NOT NULL,
  auction_id UUID REFERENCES auctions(id),
  total_amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'ZAR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded')),
  yoco_checkout_id TEXT,
  yoco_payment_id TEXT,
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = buyer_id);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- =============================================
-- WATCHLIST
-- =============================================
CREATE TABLE watchlist (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, product_id)
);

ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own watchlist" ON watchlist
  FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- SOCIAL POSTS
-- =============================================
CREATE TABLE social_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('auction_new', 'auction_ending', 'live_sale', 'auction_result', 'new_arrival')),
  product_id UUID REFERENCES products(id),
  auction_id UUID REFERENCES auctions(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'posted', 'failed')),
  platforms JSONB DEFAULT '{}'::jsonb,
  content JSONB NOT NULL,
  scheduled_at TIMESTAMPTZ,
  posted_at TIMESTAMPTZ,
  buffer_post_ids JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage social posts" ON social_posts
  FOR ALL USING (true); -- TODO: Add admin role check

-- =============================================
-- LIVE SALES
-- =============================================
CREATE TABLE live_sales (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  stream_url TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'ended')),
  products JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE live_sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Live sales are viewable by everyone" ON live_sales
  FOR SELECT USING (true);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_auctions_product ON auctions(product_id);
CREATE INDEX idx_auctions_end_time ON auctions(end_time);
CREATE INDEX idx_bids_auction ON bids(auction_id);
CREATE INDEX idx_bids_user ON bids(user_id);
CREATE INDEX idx_orders_buyer ON orders(buyer_id);
CREATE INDEX idx_social_posts_status ON social_posts(status);
CREATE INDEX idx_social_posts_scheduled ON social_posts(scheduled_at);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to update auction current price when bid is placed
CREATE OR REPLACE FUNCTION update_auction_current_price()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auctions
  SET current_price = NEW.amount
  WHERE id = NEW.auction_id;

  -- Mark previous winning bids as not winning
  UPDATE bids
  SET is_winning = FALSE
  WHERE auction_id = NEW.auction_id
  AND id != NEW.id;

  -- Mark new bid as winning
  UPDATE bids
  SET is_winning = TRUE
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_bid_placed
  AFTER INSERT ON bids
  FOR EACH ROW
  EXECUTE FUNCTION update_auction_current_price();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
