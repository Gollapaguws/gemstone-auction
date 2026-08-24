"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Video } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase/client";

interface LiveSale {
  id: string;
  title: string;
  description: string | null;
  stream_url: string;
  platform: string;
  scheduled_at: string | null;
  is_live: boolean;
  viewer_count: number;
  created_at: string;
}

export default function AdminLiveSalesPage() {
  const [liveSales, setLiveSales] = useState<LiveSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSale, setEditingSale] = useState<LiveSale | null>(null);
  const [form, setForm] = useState({
    title: "", description: "", stream_url: "", platform: "youtube", scheduled_at: "", is_live: "false"
  });

  useEffect(() => { fetchLiveSales(); }, []);

  const fetchLiveSales = async () => {
    const supabase = createSupabaseClient();
    const { data } = await supabase.from("live_sales").select("*").order("created_at", { ascending: false });
    setLiveSales(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    const supabase = createSupabaseClient();
    const saleData = {
      title: form.title,
      description: form.description || null,
      stream_url: form.stream_url,
      platform: form.platform,
      scheduled_at: form.scheduled_at || null,
      is_live: form.is_live === "true",
    };

    if (editingSale) {
      await supabase.from("live_sales").update(saleData).eq("id", editingSale.id);
    } else {
      await supabase.from("live_sales").insert(saleData);
    }

    setShowModal(false);
    setEditingSale(null);
    fetchLiveSales();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this live sale?")) return;
    const supabase = createSupabaseClient();
    await supabase.from("live_sales").delete().eq("id", id);
    fetchLiveSales();
  };

  const toggleLive = async (sale: LiveSale) => {
    const supabase = createSupabaseClient();
    await supabase.from("live_sales").update({ is_live: !sale.is_live }).eq("id", sale.id);
    fetchLiveSales();
  };

  const openEdit = (sale: LiveSale) => {
    setEditingSale(sale);
    setForm({
      title: sale.title,
      description: sale.description || "",
      stream_url: sale.stream_url,
      platform: sale.platform,
      scheduled_at: sale.scheduled_at?.slice(0, 16) || "",
      is_live: sale.is_live.toString(),
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Live Sales</h1>
          <p className="text-gray-500 text-sm">Schedule and manage live sales streams</p>
        </div>
        <button onClick={() => { setEditingSale(null); setForm({ title: "", description: "", stream_url: "", platform: "youtube", scheduled_at: "", is_live: "false" }); setShowModal(true); }} className="btn-gold text-sm py-2 px-4 inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> New Live Sale
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Title</th>
              <th className="text-left p-4 font-medium text-gray-500">Platform</th>
              <th className="text-left p-4 font-medium text-gray-500">Scheduled</th>
              <th className="text-left p-4 font-medium text-gray-500">Viewers</th>
              <th className="text-left p-4 font-medium text-gray-500">Status</th>
              <th className="text-left p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-400">Loading...</td></tr>
            ) : liveSales.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-400">No live sales yet.</td></tr>
            ) : (
              liveSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="p-4 font-medium">{sale.title}</td>
                  <td className="p-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded">{sale.platform}</span></td>
                  <td className="p-4 text-gray-500 text-xs">{sale.scheduled_at ? new Date(sale.scheduled_at).toLocaleString("en-ZA") : "—"}</td>
                  <td className="p-4">{sale.viewer_count}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${sale.is_live ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                      {sale.is_live ? "LIVE" : "Scheduled"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => toggleLive(sale)} className={`p-1 hover:bg-gray-100 rounded ${sale.is_live ? "text-red-500" : "text-green-500"}`} title={sale.is_live ? "End live" : "Go live"}>
                        <Video className="w-4 h-4" />
                      </button>
                      <button onClick={() => openEdit(sale)} className="p-1 hover:bg-gray-100 rounded"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(sale.id)} className="p-1 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
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
              <h2 className="font-bold text-lg">{editingSale ? "Edit Live Sale" : "New Live Sale"}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Platform</label>
                  <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className="input-field">
                    <option value="youtube">YouTube</option>
                    <option value="twitch">Twitch</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="facebook">Facebook</option>
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
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Stream URL</label>
                <input value={form.stream_url} onChange={(e) => setForm({ ...form, stream_url: e.target.value })} className="input-field" placeholder="https://youtube.com/watch?v=..." required />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Scheduled At (optional)</label>
                <input type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })} className="input-field" />
              </div>
              <button onClick={handleSave} className="btn-gold w-full">{editingSale ? "Update" : "Create Live Sale"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
