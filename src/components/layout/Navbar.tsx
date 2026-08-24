"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";

const categories = [
  { name: "Fine Minerals", href: "/catalogue/minerals" },
  { name: "Gemstones", href: "/catalogue/gemstones" },
  { name: "Crystals", href: "/catalogue/crystals" },
  { name: "Fossils", href: "/catalogue/fossils" },
  { name: "Mining Antiques", href: "/catalogue/antiques" },
  { name: "Lapidary Equipment", href: "/catalogue/lapidary" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-gradient-dark text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="hidden sm:inline">Est. 1984 — The Wealth of Africa Lies Beneath The Earth</span>
          <div className="flex gap-4">
            <Link href="/auctions" className="hover:text-gold-400 transition-colors">
              Live Auctions
            </Link>
            <Link href="/live-sales" className="hover:text-gold-400 transition-colors flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Live Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">AG</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-serif font-bold text-lg text-gray-900 leading-tight">African Gems</p>
              <p className="text-xs text-gray-500">& Minerals</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="font-medium text-gray-700 hover:text-gold-600 transition-colors">
              Home
            </Link>

            {/* Catalogue dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCatalogOpen(true)}
              onMouseLeave={() => setCatalogOpen(false)}
            >
              <button className="font-medium text-gray-700 hover:text-gold-600 transition-colors flex items-center gap-1">
                Catalogue <ChevronDown className="w-4 h-4" />
              </button>
              {catalogOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg py-2 mt-1 border border-gray-100">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link href="/catalogue" className="block px-4 py-2 text-gold-600 font-medium hover:bg-gold-50">
                      View All Categories
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/auctions" className="font-medium text-gray-700 hover:text-gold-600 transition-colors">
              Auctions
            </Link>
            <Link href="/we-buy-collections" className="font-medium text-gray-700 hover:text-gold-600 transition-colors">
              We Buy Collections
            </Link>
            <Link href="/contact" className="font-medium text-gray-700 hover:text-gold-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gold-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart" className="p-2 text-gray-600 hover:text-gold-600 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <Link href="/login" className="p-2 text-gray-600 hover:text-gold-600 transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-3">
              <Link href="/" className="font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <Link href="/catalogue" className="font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>
                Catalogue
              </Link>
              <Link href="/auctions" className="font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>
                Auctions
              </Link>
              <Link href="/live-sales" className="font-medium text-red-500 py-2 flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Live Sales
              </Link>
              <Link href="/we-buy-collections" className="font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>
                We Buy Collections
              </Link>
              <Link href="/contact" className="font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
