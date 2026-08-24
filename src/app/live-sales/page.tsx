"use client";

import { useState } from "react";
import { Play, MessageCircle, Send, ShoppingCart, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const upcomingStreams = [
  {
    id: "1",
    title: "Tsumeb Treasures Live Sale",
    scheduledAt: "2026-09-15T18:00:00Z",
    platform: "YouTube",
    thumbnail: "/images/live-1.jpg",
  },
  {
    id: "2",
    title: "East African Gems Showcase",
    scheduledAt: "2026-09-22T17:00:00Z",
    platform: "Twitch",
    thumbnail: "/images/live-2.jpg",
  },
];

const liveChatMessages = [
  { user: "GemLover42", message: "That tanzanite is stunning!", time: "2m ago" },
  { user: "MineralCollector", message: "What's the starting bid?", time: "1m ago" },
  { user: "CrystalHealer", message: "Do you ship to the US?", time: "45s ago" },
  { user: "RockHound", message: "I'll take the amethyst cluster!", time: "30s ago" },
];

const streamProducts = [
  {
    id: "1",
    name: "Tanzanite Crystal - 42.5g",
    price: 45000,
    available: true,
  },
  {
    id: "2",
    name: "Ajoite in Quartz - Messina",
    price: 78000,
    available: true,
  },
  {
    id: "3",
    name: "Emerald Crystal - 18g",
    price: 62000,
    available: false,
  },
];

export default function LiveSalesPage() {
  const [chatMessage, setChatMessage] = useState("");
  const [isLive, setIsLive] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title flex items-center gap-3">
          {isLive && <span className="badge-live">Live</span>}
          Live Sales
        </h1>
        <p className="section-subtitle">
          Watch our live gemstone sales and bid in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-xl overflow-hidden aspect-video relative">
            {isLive ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Live Stream</p>
                  <p className="text-sm text-gray-400">
                    Stream will appear here when live
                  </p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Next Stream</p>
                  <p className="text-sm text-gray-400">
                    September 15, 2026 at 18:00 SAST
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Stream Info */}
          <div className="mt-4 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-serif font-bold text-xl mb-2">
              Tsumeb Treasures Live Sale
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Join us for an exclusive live sale featuring rare minerals from the
              legendary Tsumeb Mine in Namibia. Bid directly during the stream or
              pre-register to place absentee bids.
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>Platform: YouTube</span>
              <span>|</span>
              <span>Items: 24</span>
              <span>|</span>
              <span>Duration: ~2 hours</span>
            </div>
          </div>

          {/* Products in this stream */}
          <div className="mt-6">
            <h3 className="font-serif font-bold text-lg mb-4">Items in This Stream</h3>
            <div className="space-y-3">
              {streamProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gold-600 font-bold">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                  <div>
                    {product.available ? (
                      <button className="btn-gold text-sm py-2 px-4 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" /> Buy Now
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">Sold</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-dark text-white p-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-medium">Live Chat</h3>
              <span className="ml-auto text-xs bg-red-500 px-2 py-0.5 rounded-full animate-pulse">
                Live
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {liveChatMessages.map((msg, idx) => (
                <div key={idx} className="text-sm">
                  <span className="font-medium text-gold-600">{msg.user}: </span>
                  <span className="text-gray-700">{msg.message}</span>
                  <span className="text-xs text-gray-400 ml-2">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="input-field text-sm py-2"
                />
                <button className="bg-gold-500 text-white p-2 rounded-lg hover:bg-gold-600 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Streams */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-serif font-bold text-lg mb-4">Upcoming Streams</h3>
            <div className="space-y-3">
              {upcomingStreams.map((stream) => (
                <div
                  key={stream.id}
                  className="border border-gray-100 rounded-lg p-3 hover:border-gold-300 transition-colors cursor-pointer"
                >
                  <p className="font-medium text-sm">{stream.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(stream.scheduledAt).toLocaleDateString("en-ZA", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" · "}{stream.platform}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
