"use client";

import { useState } from "react";
import { Plus, Play, Square, Trash2, Edit, Eye, Video } from "lucide-react";

const mockLiveSales = [
  { id: "1", title: "Tsumeb Treasures Live Sale", scheduledAt: "2026-08-25T18:00:00Z", status: "scheduled", items: 24, platform: "YouTube" },
  { id: "2", title: "East African Gems Showcase", scheduledAt: "2026-08-22T17:00:00Z", status: "ended", items: 36, platform: "Twitch" },
  { id: "3", title: "Kalahari Special Live Auction", scheduledAt: "2026-08-28T18:00:00Z", status: "scheduled", items: 18, platform: "YouTube" },
];

export default function AdminLiveSalesPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold">Live Sales</h1>
          <p className="text-gray-500 text-sm">Manage live stream sales events</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-gold flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Create Live Sale
        </button>
      </div>

      {/* Live Sales List */}
      <div className="space-y-4">
        {mockLiveSales.map((sale) => (
          <div key={sale.id} className="bg-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                sale.status === "live" ? "bg-red-100" : sale.status === "scheduled" ? "bg-blue-100" : "bg-gray-100"
              }`}>
                <Video className={`w-6 h-6 ${
                  sale.status === "live" ? "text-red-600" : sale.status === "scheduled" ? "text-blue-600" : "text-gray-600"
                }`} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">{sale.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{sale.items} items</span>
                  <span>{sale.platform}</span>
                  <span>
                    {new Date(sale.scheduledAt).toLocaleDateString("en-ZA", {
                      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                sale.status === "live" ? "bg-red-100 text-red-700 animate-pulse" :
                sale.status === "scheduled" ? "bg-blue-100 text-blue-700" :
                "bg-gray-100 text-gray-700"
              }`}>
                {sale.status === "live" ? "LIVE" : sale.status}
              </span>
              <div className="flex gap-2">
                {sale.status === "scheduled" && (
                  <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200" title="Start">
                    <Play className="w-4 h-4" />
                  </button>
                )}
                {sale.status === "live" && (
                  <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200" title="End">
                    <Square className="w-4 h-4" />
                  </button>
                )}
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200" title="Edit">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Live Sale Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-serif font-bold text-xl">Create Live Sale</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Title</label>
                <input type="text" className="input-field" placeholder="e.g. Tsumeb Treasures Live Sale" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                <textarea className="input-field min-h-[80px]" placeholder="Describe the live sale..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Scheduled Date</label>
                  <input type="datetime-local" className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Stream Platform</label>
                  <select className="input-field">
                    <option>YouTube</option>
                    <option>Twitch</option>
                    <option>Vimeo</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Stream URL</label>
                <input type="url" className="input-field" placeholder="https://youtube.com/watch?v=..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Products to Include</label>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Select products to feature in this live sale</p>
                  <button className="text-gold-600 text-sm mt-2 hover:underline">+ Add Products</button>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowAddModal(false)} className="btn-outline-gold text-sm py-2">Cancel</button>
              <button className="btn-gold text-sm py-2">Create Live Sale</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
