"use client";

import { Search, Eye, Truck, CheckCircle, XCircle } from "lucide-react";

const mockOrders = [
  { id: "ORD-1432", buyer: "John Smith", email: "john@example.com", product: "Tanzanite Crystal", amount: 45000, status: "paid", date: "2026-08-24" },
  { id: "ORD-1431", buyer: "Sarah Jones", email: "sarah@example.com", product: "Amethyst Cluster", amount: 8500, status: "shipped", date: "2026-08-23" },
  { id: "ORD-1430", buyer: "Mike Brown", email: "mike@example.com", product: "Black Tourmaline", amount: 3200, status: "delivered", date: "2026-08-22" },
  { id: "ORD-1429", buyer: "Emma Wilson", email: "emma@example.com", product: "Emerald Crystal", amount: 32000, status: "pending", date: "2026-08-22" },
  { id: "ORD-1428", buyer: "David Lee", email: "david@example.com", product: "Fluorite Specimen", amount: 6800, status: "paid", date: "2026-08-21" },
];

export default function AdminOrdersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold">Orders</h1>
          <p className="text-gray-500 text-sm">Manage customer orders</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Pending", count: 3, color: "bg-yellow-100 text-yellow-700" },
          { label: "Paid", count: 8, color: "bg-green-100 text-green-700" },
          { label: "Shipped", count: 5, color: "bg-blue-100 text-blue-700" },
          { label: "Delivered", count: 12, color: "bg-purple-100 text-purple-700" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold">{stat.count}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${stat.color}`}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search orders..." className="input-field pl-10 text-sm py-2" />
          </div>
          <select className="input-field w-auto text-sm py-2">
            <option>All Status</option>
            <option>Pending</option>
            <option>Paid</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">Order</th>
              <th className="text-left p-4 font-medium text-gray-500">Customer</th>
              <th className="text-left p-4 font-medium text-gray-500">Product</th>
              <th className="text-left p-4 font-medium text-gray-500">Amount</th>
              <th className="text-left p-4 font-medium text-gray-500">Status</th>
              <th className="text-left p-4 font-medium text-gray-500">Date</th>
              <th className="text-right p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">
                  <div>
                    <p>{order.buyer}</p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                  </div>
                </td>
                <td className="p-4">{order.product}</td>
                <td className="p-4 font-bold">R{order.amount.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "paid" ? "bg-green-100 text-green-700" :
                    order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                    order.status === "delivered" ? "bg-purple-100 text-purple-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{order.date}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View"><Eye className="w-4 h-4 text-gray-500" /></button>
                    {order.status === "paid" && (
                      <button className="p-1.5 hover:bg-blue-50 rounded-lg" title="Mark Shipped"><Truck className="w-4 h-4 text-blue-500" /></button>
                    )}
                    {order.status === "shipped" && (
                      <button className="p-1.5 hover:bg-green-50 rounded-lg" title="Mark Delivered"><CheckCircle className="w-4 h-4 text-green-500" /></button>
                    )}
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
