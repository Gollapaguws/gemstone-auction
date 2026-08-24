import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2B2C30] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="African Gems & Minerals" className="h-14 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6" style={{ fontFamily: "Hind, sans-serif" }}>
              The Wealth of Africa Lies Beneath the Earth. We specialize in rare and exceptional geological treasures from Africa and around the world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#EDED3B] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#EDED3B] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#EDED3B] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#EDED3B] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-[#EDED3B] mb-6 uppercase tracking-widest" style={{ fontFamily: "Poppins, sans-serif" }}>
              CATEGORIES
            </h4>
            <ul className="space-y-3" style={{ fontFamily: "Hind, sans-serif" }}>
              <li><Link href="/catalogue?category=fine-minerals" className="text-gray-400 hover:text-white text-sm transition-colors">Fine Minerals</Link></li>
              <li><Link href="/catalogue?category=gemstones" className="text-gray-400 hover:text-white text-sm transition-colors">Gemstones</Link></li>
              <li><Link href="/catalogue?category=crystals" className="text-gray-400 hover:text-white text-sm transition-colors">Crystals</Link></li>
              <li><Link href="/catalogue?category=fossils" className="text-gray-400 hover:text-white text-sm transition-colors">Fossils</Link></li>
              <li><Link href="/catalogue?category=mining-antiques" className="text-gray-400 hover:text-white text-sm transition-colors">Mining Antiques</Link></li>
              <li><Link href="/catalogue?category=lapidary" className="text-gray-400 hover:text-white text-sm transition-colors">Lapidary Equipment</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[#EDED3B] mb-6 uppercase tracking-widest" style={{ fontFamily: "Poppins, sans-serif" }}>
              QUICK LINKS
            </h4>
            <ul className="space-y-3" style={{ fontFamily: "Hind, sans-serif" }}>
              <li><Link href="/auctions" className="text-gray-400 hover:text-white text-sm transition-colors">Auctions</Link></li>
              <li><Link href="/live-sales" className="text-gray-400 hover:text-white text-sm transition-colors">Live Sales</Link></li>
              <li><Link href="/we-buy-collections" className="text-gray-400 hover:text-white text-sm transition-colors">We Buy Collections</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-[#EDED3B] mb-6 uppercase tracking-widest" style={{ fontFamily: "Poppins, sans-serif" }}>
              CONTACT US
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm" style={{ fontFamily: "Hind, sans-serif" }}>
              <li>Shop 2, Protea Assurance Building</li>
              <li>Longmarket Street, Greenmarket Square</li>
              <li>Cape Town, South Africa</li>
              <li className="pt-2">gems@africangems.com</li>
              <li>+27 76 665 1711</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs tracking-wider" style={{ fontFamily: "Poppins, sans-serif" }}>
              © {new Date().getFullYear()} AFRICAN GEMS AND MINERALS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6 text-xs text-gray-500 tracking-wider" style={{ fontFamily: "Poppins, sans-serif" }}>
              <Link href="/privacy" className="hover:text-[#EDED3B] transition-colors">PRIVACY POLICY</Link>
              <Link href="/terms" className="hover:text-[#EDED3B] transition-colors">TERMS & CONDITIONS</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
