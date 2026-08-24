"use client";

import { useState } from "react";
import { Send, Clock, CheckCircle, XCircle, Plus, Settings } from "lucide-react";

const mockPosts = [
  { id: "1", type: "New Auction", product: "Tanzanite Crystal", status: "posted", platforms: ["Facebook", "Instagram", "X"], postedAt: "2026-08-24T10:00:00Z" },
  { id: "2", type: "Ending Soon", product: "Ajoite in Quartz", status: "scheduled", platforms: ["Facebook", "Instagram", "X", "TikTok", "Pinterest"], scheduledAt: "2026-08-24T16:00:00Z" },
  { id: "3", type: "New Arrival", product: "Amethyst Cluster", status: "pending", platforms: ["Facebook", "Instagram"], scheduledAt: "2026-08-25T09:00:00Z" },
  { id: "4", type: "Auction Result", product: "Mimetite - Tsumeb", status: "posted", platforms: ["Facebook", "Instagram", "X"], postedAt: "2026-08-23T18:30:00Z" },
];

const platformColors: Record<string, string> = {
  Facebook: "bg-blue-100 text-blue-700",
  Instagram: "bg-pink-100 text-pink-700",
  X: "bg-gray-100 text-gray-700",
  TikTok: "bg-black/10 text-black",
  Pinterest: "bg-red-100 text-red-700",
};

export default function AdminSocialPage() {
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeData, setComposeData] = useState({
    text: "",
    platforms: ["Facebook", "Instagram", "X"],
    scheduledAt: "",
  });

  const togglePlatform = (platform: string) => {
    setComposeData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold">Social Media</h1>
          <p className="text-gray-500 text-sm">Auto-post to Facebook, Instagram, TikTok, X, Pinterest</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline-gold flex items-center gap-2 text-sm py-2">
            <Settings className="w-4 h-4" /> Buffer Settings
          </button>
          <button
            onClick={() => setShowComposeModal(true)}
            className="btn-gold flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" /> Compose Post
          </button>
        </div>
      </div>

      {/* Platform Status */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
        {["Facebook", "Instagram", "X", "TikTok", "Pinterest"].map((platform) => (
          <div key={platform} className="bg-white rounded-xl p-4 shadow-sm text-center">
            <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
            <p className="font-medium text-sm">{platform}</p>
            <p className="text-xs text-green-600">Connected</p>
          </div>
        ))}
      </div>

      {/* Post Queue */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-serif font-bold">Post Queue</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Type</th>
              <th className="text-left p-4 font-medium text-gray-500">Product</th>
              <th className="text-left p-4 font-medium text-gray-500">Platforms</th>
              <th className="text-left p-4 font-medium text-gray-500">Status</th>
              <th className="text-left p-4 font-medium text-gray-500">Scheduled</th>
              <th className="text-right p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{post.type}</td>
                <td className="p-4">{post.product}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {post.platforms.map((p) => (
                      <span key={p} className={`text-xs px-2 py-0.5 rounded-full ${platformColors[p] || "bg-gray-100"}`}>
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    post.status === "posted" ? "bg-green-100 text-green-700" :
                    post.status === "scheduled" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500">
                  {post.scheduledAt
                    ? new Date(post.scheduledAt).toLocaleString("en-ZA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                    : post.postedAt
                    ? `Posted ${new Date(post.postedAt).toLocaleString("en-ZA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}`
                    : "-"}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Post Now"><Send className="w-4 h-4 text-gray-500" /></button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg" title="Delete"><XCircle className="w-4 h-4 text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-serif font-bold text-xl">Compose Social Post</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
                <textarea
                  value={composeData.text}
                  onChange={(e) => setComposeData({ ...composeData, text: e.target.value })}
                  className="input-field min-h-[120px]"
                  placeholder="Write your post..."
                />
                <p className="text-xs text-gray-400 mt-1">{composeData.text.length}/280 characters</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {["Facebook", "Instagram", "X", "TikTok", "Pinterest"].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        composeData.platforms.includes(platform)
                          ? "bg-gold-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Schedule (Optional)</label>
                <input
                  type="datetime-local"
                  value={composeData.scheduledAt}
                  onChange={(e) => setComposeData({ ...composeData, scheduledAt: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowComposeModal(false)} className="btn-outline-gold text-sm py-2">Cancel</button>
              <button className="btn-gold text-sm py-2 flex items-center gap-2">
                <Send className="w-4 h-4" /> {composeData.scheduledAt ? "Schedule" : "Post Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
