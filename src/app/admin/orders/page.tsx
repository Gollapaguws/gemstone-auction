"use client";

import { useState, useEffect } from "react";
import { Edit, X } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase/client";

interface Order {
  id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  profiles: { full_name: string; email: string } | null;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    const supabase = createSupabaseClient();
    const { data } = await supabase.from("orders").select("*, profiles!orders_buyer_id_fkey(full_name, email)").order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const handleStatusUpdate = async (orderId: string, status: string) => {
    const supabase = createSupabaseClient();
    await supabase.from("orders").update({ status }).eq("id", orderId);
    setShowModal(false);
    setEditingOrder(null);
    fetchOrders();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Orders</h1>
        <p className="text-gray-500 text-sm">Manage customer orders and fulfillment</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Order ID</th>
              <th className="text-left p-4 font-medium text-gray-500">Customer</th>
              <th className="text-left p-4 font-medium text-gray-500">Amount</th>
              <th className="text-left p-4 font-medium text-gray-500">Payment</th>
              <th className="text-left p-4 font-medium text-gray-500">Status</th>
              <th className="text-left p-4 font-medium text-gray-500">Date</th>
              <th className="text-left p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-400">Loading...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-400">No orders yet.</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-4 font-medium">{order.id.slice(0, 8)}</td>
                  <td className="p-4">
                    <p>{order.profiles?.full_name || "—"}</p>
                    <p className="text-xs text-gray-400">{order.profiles?.email || ""}</p>
                  </td>
                  <td className="p-4 font-bold">R{(order.total_amount || 0).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${order.payment_status === "paid" ? "bg-green-100 text-green-700" : order.payment_status === "failed" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${order.status === "delivered" ? "bg-purple-100 text-purple-700" : order.status === "shipped" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-xs">{new Date(order.created_at).toLocaleDateString("en-ZA")}</td>
                  <td className="p-4">
                    <button onClick={() => { setEditingOrder(order); setShowModal(true); }} className="p-1 hover:bg-gray-100 rounded"><Edit className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && editingOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Update Order Status</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Order: {editingOrder.id.slice(0, 8)}</p>
            <div className="space-y-2">
              {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                <button key={status} onClick={() => handleStatusUpdate(editingOrder.id, status)} className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${editingOrder.status === status ? "bg-[#EDED3B] text-[#2B2C30]" : "hover:bg-gray-100"}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
