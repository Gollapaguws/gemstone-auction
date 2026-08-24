"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase/client";

interface Auction {
  id: string;
  product_id: string;
  auction_type: string;
  start_price: number;
  current_price: number | null;
  reserve_price: number | null;
  start_time: string;
  end_time: string;
  is_live: boolean;
  products: { name: string } | null;
}

export default function AdminAuctionsPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAuction, setEditingAuction] = useState<Auction | null>(null);
  const [form, setForm] = useState({
    product_id: "", auction_type: "standard", start_price: "",
    reserve_price: "", start_time: "", end_time: "", is_live: "false"
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const supabase = createSupabaseClient();
    const [auctionsData, productsData] = await Promise.all([
      supabase.from("auctions").select("*, products(name)").order("end_time", { ascending: false }),
      supabase.from("products").select("id, name").eq("status", "active")
    ]);
    setAuctions(auctionsData.data || []);
    setProducts(productsData.data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    const supabase = createSupabaseClient();
    const auctionData = {
      product_id: form.product_id,
      auction_type: form.auction_type,
      start_price: parseInt(form.start_price),
      reserve_price: form.reserve_price ? parseInt(form.reserve_price) : null,
      start_time: form.start_time,
      end_time: form.end_time,
      is_live: form.is_live === "true",
    };

    if (editingAuction) {
      await supabase.from("auctions").update(auctionData).eq("id", editingAuction.id);
    } else {
      await supabase.from("auctions").insert(auctionData);
    }

    setShowModal(false);
    setEditingAuction(null);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this auction?")) return;
    const supabase = createSupabaseClient();
    await supabase.from("auctions").delete().eq("id", id);
    fetchData();
  };

  const openEdit = (auction: Auction) => {
    setEditingAuction(auction);
    setForm({
      product_id: auction.product_id,
      auction_type: auction.auction_type,
      start_price: auction.start_price.toString(),
      reserve_price: auction.reserve_price?.toString() || "",
      start_time: auction.start_time.slice(0, 16),
      end_time: auction.end_time.slice(0, 16),
      is_live: auction.is_live.toString(),
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Auctions</h1>
        <button onClick={() => { setEditingAuction(null); setForm({ product_id: "", auction_type: "standard", start_price: "", reserve_price: "", start_time: "", end_time: "", is_live: "false" }); setShowModal(true); }} className="btn-gold text-sm py-2 px-4 inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> New Auction
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Product</th>
              <th className="text-left p-4 font-medium text-gray-500">Type</th>
              <th className="text-left p-4 font-medium text-gray-500">Start Price</th>
              <th className="text-left p-4 font-medium text-gray-500">Current Price</th>
              <th className="text-left p-4 font-medium text-gray-500">End Time</th>
              <th className="text-left p-4 font-medium text-gray-500">Status</th>
              <th className="text-left p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-400">Loading...</td></tr>
            ) : auctions.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-400">No auctions yet.</td></tr>
            ) : (
              auctions.map((auction) => (
                <tr key={auction.id}>
                  <td className="p-4 font-medium">{auction.products?.name || "—"}</td>
                  <td className="p-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded">{auction.auction_type}</span></td>
                  <td className="p-4">R{auction.start_price.toLocaleString()}</td>
                  <td className="p-4 font-bold text-[#2B2C30]">R{(auction.current_price || auction.start_price).toLocaleString()}</td>
                  <td className="p-4 text-gray-500">{new Date(auction.end_time).toLocaleString("en-ZA")}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${auction.is_live ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {auction.is_live ? "Live" : "Scheduled"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(auction)} className="p-1 hover:bg-gray-100 rounded"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(auction.id)} className="p-1 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">{editingAuction ? "Edit Auction" : "New Auction"}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Product</label>
                <select value={form.product_id} onChange={(e) => setForm({ ...form, product_id: e.target.value })} className="input-field">
                  <option value="">Select product</option>
                  {products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Type</label>
                  <select value={form.auction_type} onChange={(e) => setForm({ ...form, auction_type: e.target.value })} className="input-field">
                    <option value="standard">Standard</option>
                    <option value="live">Live</option>
                    <option value="silent">Silent</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Live</label>
                  <select value={form.is_live} onChange={(e) => setForm({ ...form, is_live: e.target.value })} className="input-field">
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Start Price (ZAR)</label>
                  <input type="number" value={form.start_price} onChange={(e) => setForm({ ...form, start_price: e.target.value })} className="input-field" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Reserve Price (ZAR)</label>
                  <input type="number" value={form.reserve_price} onChange={(e) => setForm({ ...form, reserve_price: e.target.value })} className="input-field" placeholder="Optional" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Start Time</label>
                  <input type="datetime-local" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} className="input-field" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">End Time</label>
                  <input type="datetime-local" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} className="input-field" required />
                </div>
              </div>
              <button onClick={handleSave} className="btn-gold w-full">{editingAuction ? "Update Auction" : "Create Auction"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
