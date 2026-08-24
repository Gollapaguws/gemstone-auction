"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Gavel,
  Heart,
  Settings,
  LogOut,
  Package,
  Clock,
  TrendingUp,
  Mail,
} from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const tabs = [
  { id: "overview", label: "Overview", icon: TrendingUp },
  { id: "bids", label: "My Bids", icon: Gavel },
  { id: "orders", label: "Orders", icon: Package },
  { id: "watchlist", label: "Watchlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setFullName(data.user.user_metadata?.full_name || "");
        setPhone(data.user.user_metadata?.phone || "");
      }
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveMessage("");
    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone },
    });
    if (error) {
      setSaveMessage("Error: " + error.message);
    } else {
      setSaveMessage("Settings saved successfully!");
    }
    setIsSaving(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#EDED3B] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-[#EDED3B] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-[#2B2C30]" />
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate">{user.user_metadata?.full_name || "User"}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#EDED3B]/10 text-[#2B2C30]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-4"
              >
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
              <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Welcome, {user.user_metadata?.full_name || "User"}!
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#EDED3B]/20 rounded-lg flex items-center justify-center">
                      <Gavel className="w-5 h-5 text-[#EDED3B]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">0</p>
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
                      <p className="text-2xl font-bold">0</p>
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
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-gray-500">Watchlist</p>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="font-bold text-lg mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                Account Info
              </h2>
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium">{user.user_metadata?.full_name || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium">{user.user_metadata?.phone || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Member since</span>
                  <span className="font-medium">
                    {new Date(user.created_at).toLocaleDateString("en-ZA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bids" && (
            <div>
              <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>My Bids</h1>
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Gavel className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">You haven&apos;t placed any bids yet.</p>
                <Link href="/auctions" className="inline-block mt-4 text-sm font-semibold text-[#EDED3B] hover:underline">
                  Browse Auctions →
                </Link>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Orders</h1>
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders yet.</p>
                <Link href="/catalogue" className="inline-block mt-4 text-sm font-semibold text-[#EDED3B] hover:underline">
                  Browse Products →
                </Link>
              </div>
            </div>
          )}

          {activeTab === "watchlist" && (
            <div>
              <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Watchlist</h1>
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your watchlist is empty.</p>
                <Link href="/catalogue" className="inline-block mt-4 text-sm font-semibold text-[#EDED3B] hover:underline">
                  Browse Products →
                </Link>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Account Settings</h1>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                {saveMessage && (
                  <div className={`text-sm rounded-lg p-3 mb-4 ${saveMessage.startsWith("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                    {saveMessage}
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                    <input
                      type="email"
                      value={user.email || ""}
                      disabled
                      className="input-field bg-gray-50 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+27..."
                      className="input-field"
                    />
                  </div>
                  <button
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="btn-gold disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
