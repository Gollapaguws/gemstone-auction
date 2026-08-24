"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Gavel,
  ShoppingCart,
  Heart,
  Settings,
  LogOut,
  Package,
  Clock,
  TrendingUp,
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview", icon: TrendingUp },
  { id: "bids", label: "My Bids", icon: Gavel },
  { id: "orders", label: "Orders", icon: Package },
  { id: "watchlist", label: "Watchlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

const activeBids = [
  {
    id: "1",
    name: "Tanzanite Crystal - Merelani Hills",
    currentBid: 45000,
    myBid: 42000,
    status: "outbid",
    timeLeft: "2h 34m",
  },
  {
    id: "2",
    name: "Ajoite in Quartz - Messina",
    currentBid: 78000,
    myBid: 78000,
    status: "winning",
    timeLeft: "5h 12m",
  },
];

const orders = [
  {
    id: "ORD-001",
    product: "Amethyst Cluster - Brazil",
    amount: 8500,
    status: "delivered",
    date: "2026-08-15",
  },
  {
    id: "ORD-002",
    product: "Black Tourmaline - Namibia",
    amount: 3200,
    status: "shipped",
    date: "2026-08-20",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-gold-50 text-gold-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-4">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "overview" && (
            <div>
              <h1 className="text-2xl font-serif font-bold mb-6">Dashboard</h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                      <Gavel className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">5</p>
                      <p className="text-sm text-gray-500">Active Bids</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-gray-500">Orders</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-gray-500">Watchlist</p>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="font-serif font-bold text-lg mb-4">Recent Activity</h2>
              <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
                {activeBids.map((bid) => (
                  <div key={bid.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{bid.name}</p>
                      <p className="text-sm text-gray-500">
                        Your bid: R{bid.myBid.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          bid.status === "winning"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {bid.status === "winning" ? "Winning" : "Outbid"}
                      </span>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {bid.timeLeft}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "bids" && (
            <div>
              <h1 className="text-2xl font-serif font-bold mb-6">My Bids</h1>
              <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
                {activeBids.map((bid) => (
                  <div key={bid.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{bid.name}</p>
                      <p className="text-sm text-gray-500">
                        Current: R{bid.currentBid.toLocaleString()} · Your bid: R
                        {bid.myBid.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          bid.status === "winning"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {bid.status === "winning" ? "Winning" : "Outbid"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h1 className="text-2xl font-serif font-bold mb-6">Orders</h1>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-500">Order</th>
                      <th className="text-left p-4 font-medium text-gray-500">Product</th>
                      <th className="text-left p-4 font-medium text-gray-500">Amount</th>
                      <th className="text-left p-4 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="p-4 font-medium">{order.id}</td>
                        <td className="p-4">{order.product}</td>
                        <td className="p-4">R{order.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "watchlist" && (
            <div>
              <h1 className="text-2xl font-serif font-bold mb-6">Watchlist</h1>
              <p className="text-gray-500">Items you&apos;re watching will appear here.</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h1 className="text-2xl font-serif font-bold mb-6">Account Settings</h1>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Full Name
                    </label>
                    <input type="text" defaultValue="John Smith" className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Phone
                    </label>
                    <input type="tel" placeholder="+27..." className="input-field" />
                  </div>
                  <button type="button" className="btn-gold">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
