"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Gavel,
  ShoppingCart,
  Users,
  TrendingUp,
  Clock,
  Plus,
} from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    auctions: 0,
    orders: 0,
    users: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [activeAuctions, setActiveAuctions] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createSupabaseClient();

    const fetchData = async () => {
      const [products, auctions, orders, users] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("auctions").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        products: products.count || 0,
        auctions: auctions.count || 0,
        orders: orders.count || 0,
        users: users.count || 0,
      });

      const { data: recentOrdersData } = await supabase
        .from("orders")
        .select("*, profiles!orders_buyer_id_fkey(full_name)")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentOrders(recentOrdersData || []);

      const { data: activeAuctionsData } = await supabase
        .from("auctions")
        .select("*, products(name)")
        .eq("is_live", false)
        .order("end_time", { ascending: true })
        .limit(5);

      setActiveAuctions(activeAuctionsData || []);
    };

    fetchData();
  }, []);

  const statCards = [
    { label: "Products", value: stats.products, icon: Package, color: "bg-blue-100 text-blue-600", href: "/admin/products" },
    { label: "Auctions", value: stats.auctions, icon: Gavel, color: "bg-[#EDED3B]/20 text-[#2B2C30]", href: "/admin/auctions" },
    { label: "Orders", value: stats.orders, icon: ShoppingCart, color: "bg-green-100 text-green-600", href: "/admin/orders" },
    { label: "Users", value: stats.users, icon: Users, color: "bg-purple-100 text-purple-600", href: "/admin/users" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Admin Dashboard</h1>
          <p className="text-gray-500">Manage your entire site from here.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products" className="btn-gold text-sm py-2 px-4 inline-flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add Product
          </Link>
          <Link href="/admin/auctions" className="btn-dark text-sm py-2 px-4 inline-flex items-center gap-1">
            <Plus className="w-4 h-4" /> New Auction
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-semibold text-[#2B2C30] hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders.length === 0 ? (
              <p className="p-4 text-sm text-gray-400">No orders yet.</p>
            ) : (
              recentOrders.map((order: any) => (
                <div key={order.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{order.id?.slice(0, 8)}</p>
                    <p className="text-xs text-gray-500">{order.profiles?.full_name || "Unknown"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">R{(order.total_amount || 0).toLocaleString()}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === "paid" ? "bg-green-100 text-green-700" :
                      order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                      order.status === "delivered" ? "bg-purple-100 text-purple-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Active Auctions</h2>
            <Link href="/admin/auctions" className="text-sm font-semibold text-[#2B2C30] hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {activeAuctions.length === 0 ? (
              <p className="p-4 text-sm text-gray-400">No active auctions.</p>
            ) : (
              activeAuctions.map((auction: any) => (
                <div key={auction.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{auction.products?.name || "Unknown"}</p>
                    <p className="text-xs text-gray-500">{auction.auction_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">R{(auction.current_price || auction.start_price || 0).toLocaleString()}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {new Date(auction.end_time).toLocaleDateString("en-ZA")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
