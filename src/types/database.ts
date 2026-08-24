export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          bio: string | null;
          location: string | null;
          preferred_currency: string;
          is_seller: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          location?: string | null;
          preferred_currency?: string;
          is_seller?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          location?: string | null;
          preferred_currency?: string;
          is_seller?: boolean;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          parent_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          parent_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          parent_id?: string | null;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          seller_id: string | null;
          category_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          origin: string | null;
          dimensions: string | null;
          weight: string | null;
          condition: string | null;
          images: Json[];
          price: number | null;
          currency: string;
          type: "fixed_price" | "auction" | "offer";
          status: "draft" | "active" | "sold" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          seller_id?: string | null;
          category_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          origin?: string | null;
          dimensions?: string | null;
          weight?: string | null;
          condition?: string | null;
          images?: Json[];
          price?: number | null;
          currency?: string;
          type?: "fixed_price" | "auction" | "offer";
          status?: "draft" | "active" | "sold" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          seller_id?: string | null;
          category_id?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          origin?: string | null;
          dimensions?: string | null;
          weight?: string | null;
          condition?: string | null;
          images?: Json[];
          price?: number | null;
          currency?: string;
          type?: "fixed_price" | "auction" | "offer";
          status?: "draft" | "active" | "sold" | "archived";
          created_at?: string;
          updated_at?: string;
        };
      };
      auctions: {
        Row: {
          id: string;
          product_id: string;
          auction_type: "timed" | "live" | "silent";
          start_price: number;
          reserve_price: number | null;
          current_price: number | null;
          start_time: string;
          end_time: string;
          is_live: boolean;
          stream_url: string | null;
          winner_id: string | null;
          final_price: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          auction_type: "timed" | "live" | "silent";
          start_price: number;
          reserve_price?: number | null;
          current_price?: number | null;
          start_time: string;
          end_time: string;
          is_live?: boolean;
          stream_url?: string | null;
          winner_id?: string | null;
          final_price?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          auction_type?: "timed" | "live" | "silent";
          start_price?: number;
          reserve_price?: number | null;
          current_price?: number | null;
          start_time?: string;
          end_time?: string;
          is_live?: boolean;
          stream_url?: string | null;
          winner_id?: string | null;
          final_price?: number | null;
          created_at?: string;
        };
      };
      bids: {
        Row: {
          id: string;
          auction_id: string;
          user_id: string;
          amount: number;
          is_winning: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          auction_id: string;
          user_id: string;
          amount: number;
          is_winning?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          auction_id?: string;
          user_id?: string;
          amount?: number;
          is_winning?: boolean;
          created_at?: string;
        };
      };
      offers: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          amount: number;
          message: string | null;
          status: "pending" | "accepted" | "rejected" | "countered";
          counter_amount: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id: string;
          amount: number;
          message?: string | null;
          status?: "pending" | "accepted" | "rejected" | "countered";
          counter_amount?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          user_id?: string;
          amount?: number;
          message?: string | null;
          status?: "pending" | "accepted" | "rejected" | "countered";
          counter_amount?: number | null;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          buyer_id: string;
          seller_id: string | null;
          product_id: string;
          auction_id: string | null;
          total_amount: number;
          currency: string;
          status: "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded";
          yoco_checkout_id: string | null;
          yoco_payment_id: string | null;
          shipping_address: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          buyer_id: string;
          seller_id?: string | null;
          product_id: string;
          auction_id?: string | null;
          total_amount: number;
          currency?: string;
          status?: "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded";
          yoco_checkout_id?: string | null;
          yoco_payment_id?: string | null;
          shipping_address?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          buyer_id?: string;
          seller_id?: string | null;
          product_id?: string;
          auction_id?: string | null;
          total_amount?: number;
          currency?: string;
          status?: "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded";
          yoco_checkout_id?: string | null;
          yoco_payment_id?: string | null;
          shipping_address?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      watchlist: {
        Row: {
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          product_id?: string;
          created_at?: string;
        };
      };
      social_posts: {
        Row: {
          id: string;
          event_type: "auction_new" | "auction_ending" | "live_sale" | "auction_result" | "new_arrival";
          product_id: string | null;
          auction_id: string | null;
          status: "pending" | "scheduled" | "posted" | "failed";
          platforms: Json;
          content: Json;
          scheduled_at: string | null;
          posted_at: string | null;
          buffer_post_ids: Json | null;
          error_message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_type: "auction_new" | "auction_ending" | "live_sale" | "auction_result" | "new_arrival";
          product_id?: string | null;
          auction_id?: string | null;
          status?: "pending" | "scheduled" | "posted" | "failed";
          platforms?: Json;
          content: Json;
          scheduled_at?: string | null;
          posted_at?: string | null;
          buffer_post_ids?: Json | null;
          error_message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_type?: "auction_new" | "auction_ending" | "live_sale" | "auction_result" | "new_arrival";
          product_id?: string | null;
          auction_id?: string | null;
          status?: "pending" | "scheduled" | "posted" | "failed";
          platforms?: Json;
          content?: Json;
          scheduled_at?: string | null;
          posted_at?: string | null;
          buffer_post_ids?: Json | null;
          error_message?: string | null;
          created_at?: string;
        };
      };
      live_sales: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          stream_url: string;
          scheduled_at: string;
          status: "scheduled" | "live" | "ended";
          products: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          stream_url: string;
          scheduled_at: string;
          status?: "scheduled" | "live" | "ended";
          products?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          stream_url?: string;
          scheduled_at?: string;
          status?: "scheduled" | "live" | "ended";
          products?: Json;
          created_at?: string;
        };
      };
    };
  };
}
