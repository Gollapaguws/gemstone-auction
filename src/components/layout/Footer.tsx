import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const footerCategories = [
  { name: "Fine Minerals", href: "/catalogue/minerals" },
  { name: "Gemstones", href: "/catalogue/gemstones" },
  { name: "Crystals & Holistic", href: "/catalogue/crystals" },
  { name: "Fossils", href: "/catalogue/fossils" },
  { name: "Mining Antiques", href: "/catalogue/antiques" },
  { name: "Lapidary Equipment", href: "/catalogue/lapidary" },
];

const footerLinks = [
  { name: "About Us", href: "/about" },
  { name: "Auctions", href: "/auctions" },
  { name: "Live Sales", href: "/live-sales" },
  { name: "We Buy Collections", href: "/we-buy-collections" },
  { name: "Contact", href: "/contact" },
  { name: "Newsletters", href: "/newsletters" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">AG</span>
              </div>
              <div>
                <p className="font-serif font-bold text-lg leading-tight">African Gems</p>
                <p className="text-xs text-gray-400">& Minerals</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A Multifaceted International Company dealing in Gemstones, Crystals,
              Fine Minerals, Fossils, and Antique Mining Memorabilia since 1984.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <a href="tel:+27766651711" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4" /> +27 (0)76 665 1711
              </a>
              <a href="mailto:gems@africangems.com" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Mail className="w-4 h-4" /> gems@africangems.com
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Product Catalog</h3>
            <ul className="space-y-2">
              {footerCategories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Our Branches</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div>
                <p className="text-white font-medium">Montague Gardens</p>
                <p className="flex items-start gap-1">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  Cape Town, South Africa
                </p>
              </div>
              <div>
                <p className="text-white font-medium">Greenmarket Square</p>
                <p className="flex items-start gap-1">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  Cape Town CBD, South Africa
                </p>
              </div>
              <div>
                <p className="text-white font-medium">Auckland</p>
                <p className="flex items-start gap-1">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  Auckland, New Zealand
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} African Gems And Minerals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
