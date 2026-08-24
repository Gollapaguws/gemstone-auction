"use client";

import { Search, Eye, Shield, UserX, Mail } from "lucide-react";

const mockUsers = [
  { id: "1", name: "John Smith", email: "john@example.com", role: "buyer", bids: 12, orders: 5, joined: "2026-01-15", status: "active" },
  { id: "2", name: "Sarah Jones", email: "sarah@example.com", role: "seller", bids: 0, orders: 2, joined: "2026-02-20", status: "active" },
  { id: "3", name: "Mike Brown", email: "mike@example.com", role: "buyer", bids: 8, orders: 3, joined: "2026-03-10", status: "active" },
  { id: "4", name: "Emma Wilson", email: "emma@example.com", role: "buyer", bids: 23, orders: 8, joined: "2025-11-05", status: "active" },
  { id: "5", name: "David Lee", email: "david@example.com", role: "buyer", bids: 5, orders: 1, joined: "2026-06-12", status: "suspended" },
];

export default function AdminUsersPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold">Users</h1>
        <p className="text-gray-500 text-sm">Manage registered users</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search users..." className="input-field pl-10 text-sm py-2" />
          </div>
          <select className="input-field w-auto text-sm py-2">
            <option>All Roles</option>
            <option>Buyers</option>
            <option>Sellers</option>
            <option>Admins</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">User</th>
              <th className="text-left p-4 font-medium text-gray-500">Role</th>
              <th className="text-left p-4 font-medium text-gray-500">Bids</th>
              <th className="text-left p-4 font-medium text-gray-500">Orders</th>
              <th className="text-left p-4 font-medium text-gray-500">Joined</th>
              <th className="text-left p-4 font-medium text-gray-500">Status</th>
              <th className="text-right p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    user.role === "admin" ? "bg-purple-100 text-purple-700" :
                    user.role === "seller" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">{user.bids}</td>
                <td className="p-4">{user.orders}</td>
                <td className="p-4 text-gray-500">{user.joined}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View"><Eye className="w-4 h-4 text-gray-500" /></button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Email"><Mail className="w-4 h-4 text-gray-500" /></button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg" title="Suspend"><UserX className="w-4 h-4 text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
