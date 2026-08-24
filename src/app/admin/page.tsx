"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Gavel,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Eye,
} from "lucide-react";

const stats = [
  {
    label: "Total Products",
    value: "248",
    change: "+12 this week",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Active Auctions",
    value: "18",
    change: "3 ending today",
    icon: Gavel,
    color: "bg-gold-100 text-gold-600",
  },
  {
    label: "Total Orders",
    value: "1,432",
    change: "+8% this month",
    icon: ShoppingCart,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Registered Users",
    value: "3,847",
    change: "+156 this month",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
];

const recentOrders = [
  { id: "ORD-1432", buyer: "John Smith", amount: 45000, status: "paid", time: "2 min ago" },
  { id: "ORD-1431", buyer: "Sarah Jones", amount: 12000, status: "shipped", time: "15 min ago" },
  { id: "ORD-1430", buyer: "Mike Brown", amount: 8500, status: "delivered", time: "1 hour ago" },
  { id: "ORD-1429", buyer: "Emma Wilson", amount: 32000, status: "pending", time: "2 hours ago" },
];

const activeAuctions = [
  { name: "Tanzanite Crystal", currentBid: 45000, bids: 12, timeLeft: "2h 34m" },
  { name: "Ajoite in Quartz", currentBid: 78000, bids: 23, timeLeft: "5h 12m" },
  { name: "Emerald Crystal", currentBid: 62000, bids: 18, timeLeft: "1h 08m" },
];

const socialQueue = [
  { type: "New Auction", product: "Mimetite - Tsumeb", status: "posted", platforms: 5 },
  { type: "Ending Soon", product: "Tanzanite Crystal", status: "scheduled", platforms: 5 },
  { type: "New Arrival", product: "Amethyst Cluster", status: "pending", platforms: 3 },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-serif font-bold">Recent Orders</h2>
            <a href="/admin/orders" className="text-gold-600 text-sm hover:underline">View all</a>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{order.id}</p>
                  <p className="text-xs text-gray-500">{order.buyer}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">R{order.amount.toLocaleString()}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "delivered"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Auctions */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-serif font-bold">Active Auctions</h2>
            <a href="/admin/auctions" className="text-gold-600 text-sm hover:underline">View all</a>
          </div>
          <div className="divide-y divide-gray-100">
            {activeAuctions.map((auction) => (
              <div key={auction.name} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{auction.name}</p>
                  <p className="text-xs text-gray-500">{auction.bids} bids</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-gold-600">R{auction.currentBid.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" /> {auction.timeLeft}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media Queue */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-serif font-bold">Social Media Queue</h2>
          <a href="/admin/social" className="text-gold-600 text-sm hover:underline">Manage</a>
        </div>
        <div className="divide-y divide-gray-100">
          {socialQueue.map((post, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{post.type}</p>
                <p className="text-xs text-gray-500">{post.product}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{post.platforms} platforms</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    post.status === "posted"
                      ? "bg-green-100 text-green-700"
                      : post.status === "scheduled"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {post.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
