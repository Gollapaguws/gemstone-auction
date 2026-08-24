"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Menu, X, Search, ChevronDown, LogOut, Shield } from "lucide-react";
// eslint-disable-next-line @next/next/no-img-element
import Img from "next/image";
import { createSupabaseClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const categories = [
  { name: "Fine Minerals", href: "/catalogue?category=fine-minerals" },
  { name: "Gemstones", href: "/catalogue?category=gemstones" },
  { name: "Crystals", href: "/catalogue?category=crystals" },
  { name: "Fossils", href: "/catalogue?category=fossils" },
  { name: "Mining Antiques", href: "/catalogue?category=mining-antiques" },
  { name: "Lapidary Equipment", href: "/catalogue?category=lapidary" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase.from("profiles").select("role").eq("id", data.user.id).single().then(({ data: profile }) => {
          setIsAdmin(profile?.role === "admin");
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from("profiles").select("role").eq("id", session.user.id).single().then(({ data: profile }) => {
          setIsAdmin(profile?.role === "admin");
        });
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-lg" : ""}`}>
      {/* Top Bar */}
      <div className="bg-[#2B2C30] text-[#EDED3B] py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-medium tracking-wider" style={{ fontFamily: "Poppins, sans-serif" }}>
          <div className="hidden md:flex items-center gap-6">
            <span>THE WEALTH OF AFRICA LIES BENEATH THE EARTH</span>
          </div>
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  {user.user_metadata?.full_name || "MY ACCOUNT"}
                </Link>
                <button onClick={handleSignOut} className="hover:text-white transition-colors cursor-pointer">
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-white transition-colors">LOGIN</Link>
                <Link href="/register" className="hover:text-white transition-colors">REGISTER</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <Img src="/logo.png" alt="African Gems & Minerals" width={64} height={64} className="h-16 w-auto" priority />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-[#2B2C30] tracking-wider leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
                  AFRICAN GEMS<span className="text-[#EDED3B]">&amp;</span>MINERALS
                </h1>
                <p className="text-[9px] text-gray-500 tracking-widest uppercase" style={{ fontFamily: "Hind, sans-serif" }}>The Wealth of Africa Lies Beneath the Earth</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-[#2B2C30] hover:text-[#EDED3B] font-semibold text-sm uppercase tracking-wider transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                HOME
              </Link>
              
              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[#2B2C30] hover:text-[#EDED3B] font-semibold text-sm uppercase tracking-wider transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                  CATEGORIES <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 w-56 bg-white shadow-xl border-t-2 border-[#EDED3B] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#EDED3B] hover:text-[#2B2C30] transition-colors uppercase tracking-wider"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/auctions" className="text-[#2B2C30] hover:text-[#EDED3B] font-semibold text-sm uppercase tracking-wider transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                AUCTIONS
              </Link>
              <Link href="/live-sales" className="text-[#2B2C30] hover:text-[#EDED3B] font-semibold text-sm uppercase tracking-wider transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                LIVE SALES
              </Link>
              <Link href="/we-buy-collections" className="text-[#2B2C30] hover:text-[#EDED3B] font-semibold text-sm uppercase tracking-wider transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                WE BUY COLLECTIONS
              </Link>
              <Link href="/contact" className="text-[#2B2C30] hover:text-[#EDED3B] font-semibold text-sm uppercase tracking-wider transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                CONTACT
              </Link>
              {isAdmin && (
                <Link href="/admin" className="flex items-center gap-1 text-[#EDED3B] hover:text-[#2B2C30] font-semibold text-sm uppercase tracking-wider transition-colors bg-[#2B2C30] hover:bg-[#EDED3B] px-3 py-1.5 rounded" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <Shield size={14} />
                  ADMIN
                </Link>
              )}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="text-[#2B2C30] hover:text-[#EDED3B] transition-colors">
                <Search size={20} />
              </button>
              {user ? (
                <Link href="/dashboard" className="text-[#2B2C30] hover:text-[#EDED3B] transition-colors hidden md:flex items-center gap-1">
                  <User size={20} />
                  <span className="text-xs font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {user.user_metadata?.full_name?.split(" ")[0] || "Account"}
                  </span>
                </Link>
              ) : (
                <Link href="/login" className="text-[#2B2C30] hover:text-[#EDED3B] transition-colors hidden md:block">
                  <User size={20} />
                </Link>
              )}
              <Link href="/cart" className="text-[#2B2C30] hover:text-[#EDED3B] transition-colors relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#EDED3B] text-[#2B2C30] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-[#2B2C30] hover:text-[#EDED3B] transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-3">
              <Link href="/" className="block py-2 text-[#2B2C30] font-semibold uppercase tracking-wider text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>HOME</Link>
              {categories.map((cat) => (
                <Link key={cat.name} href={cat.href} className="block py-2 text-gray-600 hover:text-[#EDED3B] uppercase tracking-wider text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {cat.name}
                </Link>
              ))}
              <Link href="/auctions" className="block py-2 text-[#2B2C30] font-semibold uppercase tracking-wider text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>AUCTIONS</Link>
              <Link href="/live-sales" className="block py-2 text-[#2B2C30] font-semibold uppercase tracking-wider text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>LIVE SALES</Link>
              <Link href="/we-buy-collections" className="block py-2 text-[#2B2C30] font-semibold uppercase tracking-wider text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>WE BUY COLLECTIONS</Link>
              <Link href="/contact" className="block py-2 text-[#2B2C30] font-semibold uppercase tracking-wider text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>CONTACT</Link>
              {isAdmin && (
                <Link href="/admin" className="flex items-center gap-2 py-2 text-[#EDED3B] font-semibold uppercase tracking-wider text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <Shield size={14} /> ADMIN PANEL
                </Link>
              )}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                {user ? (
                  <>
                    <Link href="/dashboard" className="block py-2 text-[#2B2C30] font-semibold uppercase tracking-wider text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                      MY ACCOUNT
                    </Link>
                    <button onClick={handleSignOut} className="block py-2 text-red-500 font-semibold uppercase tracking-wider text-sm w-full text-left" style={{ fontFamily: "Poppins, sans-serif" }}>
                      LOGOUT
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block py-2 text-[#2B2C30] font-semibold uppercase tracking-wider text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>LOGIN</Link>
                    <Link href="/register" className="block py-2 text-[#2B2C30] font-semibold uppercase tracking-wider text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>REGISTER</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
