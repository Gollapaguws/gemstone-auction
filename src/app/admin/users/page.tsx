"use client";

import { useState, useEffect } from "react";
import { Shield, ShieldOff, Edit, X } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase/client";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  phone: string | null;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    const supabase = createSupabaseClient();
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    setUsers(data || []);
    setLoading(false);
  };

  const toggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (!confirm(`Make this user ${newRole}?`)) return;
    const supabase = createSupabaseClient();
    await supabase.from("profiles").update({ role: newRole }).eq("id", userId);
    fetchUsers();
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    const supabase = createSupabaseClient();
    await supabase.from("profiles").update({
      full_name: editingUser.full_name,
      role: editingUser.role,
    }).eq("id", editingUser.id);
    setShowModal(false);
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Users</h1>
        <p className="text-gray-500 text-sm">Manage registered users and roles</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Name</th>
              <th className="text-left p-4 font-medium text-gray-500">Email</th>
              <th className="text-left p-4 font-medium text-gray-500">Role</th>
              <th className="text-left p-4 font-medium text-gray-500">Joined</th>
              <th className="text-left p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">No users yet.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="p-4 font-medium">{user.full_name || "—"}</td>
                  <td className="p-4 text-gray-500">{user.email}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${user.role === "admin" ? "bg-[#EDED3B] text-[#2B2C30] font-bold" : user.role === "seller" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-xs">{new Date(user.created_at).toLocaleDateString("en-ZA")}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => toggleRole(user.id, user.role)} className="p-1 hover:bg-gray-100 rounded" title={user.role === "admin" ? "Remove admin" : "Make admin"}>
                        {user.role === "admin" ? <ShieldOff className="w-4 h-4 text-red-500" /> : <Shield className="w-4 h-4 text-green-500" />}
                      </button>
                      <button onClick={() => { setEditingUser(user); setShowModal(true); }} className="p-1 hover:bg-gray-100 rounded"><Edit className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Edit User</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                <input value={editingUser.full_name} onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Role</label>
                <select value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} className="input-field">
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <p className="text-xs text-gray-400">Email: {editingUser.email}</p>
              <button onClick={handleUpdate} className="btn-gold w-full">Update User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
