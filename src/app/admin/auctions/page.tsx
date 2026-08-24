"use client";

import { useState } from "react";
import { Plus, Clock, Users, Edit, Eye, Trash2, Gavel, Search } from "lucide-react";

const mockAuctions = [
  { id: "1", name: "Tanzanite Crystal", type: "timed", startPrice: 15000, currentBid: 45000, bids: 12, endTime: "2026-08-25T18:00:00Z", status: "active" },
  { id: "2", name: "Ajoite in Quartz", type: "timed", startPrice: 20000, currentBid: 78000, bids: 23, endTime: "2026-08-25T21:00:00Z", status: "active" },
  { id: "3", name: "Emerald Crystal", type: "silent", startPrice: 25000, currentBid: 62000, bids: 18, endTime: "2026-08-26T18:00:00Z", status: "active" },
  { id: "4", name: "Mimetite - Tsumeb", type: "timed", startPrice: 10000, currentBid: 32000, bids: 15, endTime: "2026-08-24T16:00:00Z", status: "ended" },
  { id: "5", name: "Watermelon Tourmaline", type: "live", startPrice: 12000, currentBid: 28000, bids: 9, endTime: "2026-08-27T18:00:00Z", status: "active" },
];

export default function AdminAuctionsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAuction, setNewAuction] = useState({
    name: "",
    type: "timed",
    startPrice: "",
    reservePrice: "",
    startTime: "",
    endTime: "",
    productId: "",
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold">Auctions</h1>
          <p className="text-gray-500 text-sm">Manage timed, silent, and live auctions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-gold flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Create Auction
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Gavel className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xl font-bold">18</p>
            <p className="text-sm text-gray-500">Active Auctions</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-xl font-bold">3</p>
            <p className="text-sm text-gray-500">Ending Today</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xl font-bold">142</p>
            <p className="text-sm text-gray-500">Total Bids Today</p>
          </div>
        </div>
      </div>

      {/* Auctions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Auction</th>
              <th className="text-left p-4 font-medium text-gray-500">Type</th>
              <th className="text-left p-4 font-medium text-gray-500">Start Price</th>
              <th className="text-left p-4 font-medium text-gray-500">Current Bid</th>
              <th className="text-left p-4 font-medium text-gray-500">Bids</th>
              <th className="text-left p-4 font-medium text-gray-500">Ends</th>
              <th className="text-left p-4 font-medium text-gray-500">Status</th>
              <th className="text-right p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockAuctions.map((auction) => (
              <tr key={auction.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{auction.name}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    auction.type === "live"
                      ? "bg-red-100 text-red-700"
                      : auction.type === "silent"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-gold-100 text-gold-700"
                  }`}>
                    {auction.type}
                  </span>
                </td>
                <td className="p-4">R{auction.startPrice.toLocaleString()}</td>
                <td className="p-4 font-bold text-gold-600">R{auction.currentBid.toLocaleString()}</td>
                <td className="p-4">{auction.bids}</td>
                <td className="p-4 text-gray-500">
                  {new Date(auction.endTime).toLocaleDateString("en-ZA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    auction.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {auction.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Eye className="w-4 h-4 text-gray-500" /></button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit className="w-4 h-4 text-gray-500" /></button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Auction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-serif font-bold text-xl">Create New Auction</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Product</label>
                <select className="input-field">
                  <option>Select a product...</option>
                  <option>Tanzanite Crystal</option>
                  <option>Ajoite in Quartz</option>
                  <option>Emerald Crystal</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Auction Type</label>
                <select
                  value={newAuction.type}
                  onChange={(e) => setNewAuction({ ...newAuction, type: e.target.value })}
                  className="input-field"
                >
                  <option value="timed">Timed Auction</option>
                  <option value="silent">Silent Auction</option>
                  <option value="live">Live Auction</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Start Price (ZAR)</label>
                  <input type="number" className="input-field" placeholder="15000" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Reserve Price (ZAR)</label>
                  <input type="number" className="input-field" placeholder="Optional" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Start Time</label>
                  <input type="datetime-local" className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">End Time</label>
                  <input type="datetime-local" className="input-field" />
                </div>
              </div>
              {newAuction.type === "live" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Stream URL</label>
                  <input type="url" className="input-field" placeholder="https://youtube.com/watch?v=..." />
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowAddModal(false)} className="btn-outline-gold text-sm py-2">Cancel</button>
              <button className="btn-gold text-sm py-2">Create Auction</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
