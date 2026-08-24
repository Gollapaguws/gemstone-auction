"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Gem, Filter } from "lucide-react";

const mockProducts = [
  { id: "1", name: "Tanzanite Crystal", category: "Gemstones", price: 45000, status: "active", stock: 1 },
  { id: "2", name: "Ajoite in Quartz", category: "Minerals", price: null, status: "active", stock: 1 },
  { id: "3", name: "Emerald Crystal", category: "Gemstones", price: 28000, status: "active", stock: 1 },
  { id: "4", name: "Mimetite - Tsumeb", category: "Minerals", price: 32000, status: "sold", stock: 0 },
  { id: "5", name: "Amethyst Cluster", category: "Crystals", price: 8500, status: "active", stock: 3 },
  { id: "6", name: "Black Tourmaline", category: "Crystals", price: 3200, status: "active", stock: 12 },
];

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "minerals",
    price: "",
    description: "",
    origin: "",
    type: "fixed_price",
  });

  const filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold">Products</h1>
          <p className="text-gray-500 text-sm">Manage your product catalogue</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-gold flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 text-sm py-2"
          />
        </div>
        <select className="input-field w-auto text-sm py-2">
          <option>All Categories</option>
          <option>Minerals</option>
          <option>Gemstones</option>
          <option>Crystals</option>
          <option>Fossils</option>
          <option>Antiques</option>
          <option>Lapidary</option>
        </select>
        <select className="input-field w-auto text-sm py-2">
          <option>All Status</option>
          <option>Active</option>
          <option>Sold</option>
          <option>Draft</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Product</th>
              <th className="text-left p-4 font-medium text-gray-500">Category</th>
              <th className="text-left p-4 font-medium text-gray-500">Price</th>
              <th className="text-left p-4 font-medium text-gray-500">Status</th>
              <th className="text-right p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Gem className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-500">{product.category}</td>
                <td className="p-4 font-bold text-gold-600">
                  {product.price ? `R${product.price.toLocaleString()}` : "Enquire"}
                </td>
                <td className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-serif font-bold text-xl">Add New Product</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Tanzanite Crystal"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="minerals">Fine Minerals</option>
                    <option value="gemstones">Gemstones</option>
                    <option value="crystals">Crystals</option>
                    <option value="fossils">Fossils</option>
                    <option value="antiques">Mining Antiques</option>
                    <option value="lapidary">Lapidary Equipment</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Sale Type</label>
                  <select
                    value={newProduct.type}
                    onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                    className="input-field"
                  >
                    <option value="fixed_price">Buy Now</option>
                    <option value="auction">Auction</option>
                    <option value="offer">Make Offer</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Price (ZAR, cents)</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="input-field"
                  placeholder="e.g. 4500000 (R45,000.00)"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Origin</label>
                <input
                  type="text"
                  value={newProduct.origin}
                  onChange={(e) => setNewProduct({ ...newProduct, origin: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Merelani Hills, Tanzania"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="input-field min-h-[100px]"
                  placeholder="Describe the product..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gold-400 transition-colors cursor-pointer">
                  <p className="text-sm text-gray-500">Click to upload images</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-outline-gold text-sm py-2"
              >
                Cancel
              </button>
              <button className="btn-gold text-sm py-2">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
