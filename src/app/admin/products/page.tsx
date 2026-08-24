"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Sparkles, Loader2 } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  type: string;
  status: string;
  origin: string | null;
  description: string | null;
  created_at: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", price: "", type: "fixed_price", status: "active", origin: "", description: "" });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    const supabase = createSupabaseClient();
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  const handleGenerateDescription = async () => {
    if (!form.name) return alert("Enter a product name first");
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/describe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, type: form.type, origin: form.origin, specs: "" }),
      });
      const data = await res.json();
      if (data.description) {
        setForm({ ...form, description: data.description });
      } else {
        alert(data.error || "Failed to generate description");
      }
    } catch {
      alert("Failed to generate description. Check your OpenAI API key.");
    }
    setGenerating(false);
  };

  const handleSave = async () => {
    const supabase = createSupabaseClient();
    const productData = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"),
      price: form.price ? parseInt(form.price) : null,
      type: form.type,
      status: form.status,
      origin: form.origin || null,
      description: form.description || null,
    };

    if (editingProduct) {
      await supabase.from("products").update(productData).eq("id", editingProduct.id);
    } else {
      await supabase.from("products").insert(productData);
    }

    setShowModal(false);
    setEditingProduct(null);
    setForm({ name: "", slug: "", price: "", type: "fixed_price", status: "active", origin: "", description: "" });
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const supabase = createSupabaseClient();
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      slug: product.slug,
      price: product.price?.toString() || "",
      type: product.type,
      status: product.status,
      origin: product.origin || "",
      description: product.description || "",
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Products</h1>
        <button onClick={() => { setEditingProduct(null); setForm({ name: "", slug: "", price: "", type: "fixed_price", status: "active", origin: "", description: "" }); setShowModal(true); }} className="btn-gold text-sm py-2 px-4 inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Name</th>
              <th className="text-left p-4 font-medium text-gray-500">Type</th>
              <th className="text-left p-4 font-medium text-gray-500">Price</th>
              <th className="text-left p-4 font-medium text-gray-500">Status</th>
              <th className="text-left p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">No products yet. Add your first product!</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="p-4">
                    <p className="font-medium">{product.name}</p>
                    {product.origin && <p className="text-xs text-gray-400">{product.origin}</p>}
                  </td>
                  <td className="p-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.type}</span></td>
                  <td className="p-4 font-medium">{product.price ? `R${product.price.toLocaleString()}` : "—"}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${product.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(product)} className="p-1 hover:bg-gray-100 rounded"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-1 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
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
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">{editingProduct ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Origin</label>
                <input value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} className="input-field" placeholder="e.g. Tanzania" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Price (ZAR)</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" placeholder="Leave empty for enquire" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                    <option value="fixed_price">Fixed Price</option>
                    <option value="auction">Auction</option>
                    <option value="offer">Make Offer</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <button onClick={handleGenerateDescription} disabled={generating} className="text-xs text-[#2B2C30] font-medium inline-flex items-center gap-1 hover:text-[#EDED3B] transition-colors disabled:opacity-50">
                    {generating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    {generating ? "Generating..." : "Generate with AI"}
                  </button>
                </div>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" rows={4} placeholder="Product description..." />
              </div>
              <button onClick={handleSave} className="btn-gold w-full">{editingProduct ? "Update Product" : "Create Product"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
