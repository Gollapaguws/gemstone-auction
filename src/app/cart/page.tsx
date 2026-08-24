"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const cartItems = [
  {
    id: "1",
    name: "Amethyst Cluster - Brazil",
    price: 8500,
    quantity: 1,
    image: "/images/amethyst.jpg",
  },
  {
    id: "2",
    name: "Black Tourmaline - Namibia",
    price: 3200,
    quantity: 2,
    image: "/images/tourmaline.jpg",
  },
];

export default function CartPage() {
  const [items, setItems] = useState(cartItems);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 250;
  const total = subtotal + shipping;

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-serif font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link href="/catalogue" className="btn-gold inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm flex gap-4"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-gray-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gold-600 font-bold">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
                <p className="font-bold text-gold-600">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="font-serif font-bold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">{formatCurrency(shipping)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-gold-600 text-lg">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="btn-gold w-full mt-6 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/catalogue"
                className="text-gold-600 text-sm hover:underline block text-center mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
