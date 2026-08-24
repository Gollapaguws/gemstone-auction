"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Send, X, Sparkles, Loader2 } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase/client";

interface SocialPost {
  id: string;
  product_id: string | null;
  post_type: string;
  caption: string;
  platforms: string[];
  status: string;
  scheduled_at: string | null;
  posted_at: string | null;
  created_at: string;
}

const platforms = ["facebook", "instagram", "tiktok", "twitter", "pinterest"];

export default function AdminSocialPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({
    product_id: "", post_type: "new_product", caption: "",
    platforms: ["facebook", "instagram", "twitter"], scheduled_at: ""
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const supabase = createSupabaseClient();
    const [postsData, productsData] = await Promise.all([
      supabase.from("social_posts").select("*").order("created_at", { ascending: false }),
      supabase.from("products").select("id, name, description")
    ]);
    setPosts(postsData.data || []);
    setProducts(productsData.data || []);
    setLoading(false);
  };

  const handleGenerateCaption = async () => {
    setGenerating(true);
    try {
      const product = products.find((p: any) => p.id === form.product_id);
      const res = await fetch("/api/ai/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postType: form.post_type,
          productName: product?.name || "New Gemstone",
          productDescription: product?.description || "",
        }),
      });
      const data = await res.json();
      if (data.caption) {
        setForm({ ...form, caption: data.caption });
      } else {
        alert(data.error || "Failed to generate caption");
      }
    } catch {
      alert("Failed to generate caption. Check your OpenAI API key.");
    }
    setGenerating(false);
  };

  const handleSave = async () => {
    const supabase = createSupabaseClient();
    await supabase.from("social_posts").insert({
      product_id: form.product_id || null,
      post_type: form.post_type,
      caption: form.caption,
      platforms: form.platforms,
      status: form.scheduled_at ? "scheduled" : "pending",
      scheduled_at: form.scheduled_at || null,
    });
    setShowModal(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const supabase = createSupabaseClient();
    await supabase.from("social_posts").delete().eq("id", id);
    fetchData();
  };

  const handlePostNow = async (id: string) => {
    const supabase = createSupabaseClient();
    await supabase.from("social_posts").update({ status: "posted", posted_at: new Date().toISOString() }).eq("id", id);
    fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Social Media</h1>
          <p className="text-gray-500 text-sm">Schedule and manage social media posts</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-gold text-sm py-2 px-4 inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Type</th>
              <th className="text-left p-4 font-medium text-gray-500">Caption</th>
              <th className="text-left p-4 font-medium text-gray-500">Platforms</th>
              <th className="text-left p-4 font-medium text-gray-500">Status</th>
              <th className="text-left p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">Loading...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">No posts yet.</td></tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <td className="p-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded">{post.post_type}</span></td>
                  <td className="p-4 text-gray-600 max-w-xs truncate">{post.caption}</td>
                  <td className="p-4">
                    <div className="flex gap-1">{post.platforms.map((p: string) => <span key={p} className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{p}</span>)}</div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${post.status === "posted" ? "bg-green-100 text-green-700" : post.status === "scheduled" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {post.status !== "posted" && (
                        <button onClick={() => handlePostNow(post.id)} className="p-1 hover:bg-green-50 rounded text-green-500" title="Post now"><Send className="w-4 h-4" /></button>
                      )}
                      <button onClick={() => handleDelete(post.id)} className="p-1 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
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
              <h2 className="font-bold text-lg">New Social Post</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Type</label>
                <select value={form.post_type} onChange={(e) => setForm({ ...form, post_type: e.target.value })} className="input-field">
                  <option value="new_product">New Product</option>
                  <option value="auction_ending">Auction Ending</option>
                  <option value="new_arrival">New Arrival</option>
                  <option value="sale">Sale / Promotion</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Product (optional)</label>
                <select value={form.product_id} onChange={(e) => setForm({ ...form, product_id: e.target.value })} className="input-field">
                  <option value="">No product</option>
                  {products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">Caption</label>
                  <button onClick={handleGenerateCaption} disabled={generating} className="text-xs text-[#2B2C30] font-medium inline-flex items-center gap-1 hover:text-[#EDED3B] transition-colors disabled:opacity-50">
                    {generating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    {generating ? "Generating..." : "Generate with AI"}
                  </button>
                </div>
                <textarea value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="input-field" rows={3} placeholder="Write your post caption..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((p) => (
                    <button key={p} onClick={() => {
                      const newPlatforms = form.platforms.includes(p) ? form.platforms.filter(x => x !== p) : [...form.platforms, p];
                      setForm({ ...form, platforms: newPlatforms });
                    }} className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${form.platforms.includes(p) ? "bg-[#EDED3B] border-[#EDED3B] text-[#2B2C30]" : "border-gray-300 text-gray-500"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleSave} className="btn-gold w-full">Create Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
