import Link from "next/link";
import { ArrowRight, Gavel, Gem, Mountain, Skull } from "lucide-react";

const categories = [
  { name: "Fine Minerals", icon: Gem, href: "/catalogue?category=fine-minerals", image: "https://images.unsplash.com/photo-1518562180175-3407f1b60f0b?w=600&h=400&fit=crop" },
  { name: "Gemstones", icon: Gem, href: "/catalogue?category=gemstones", image: "https://images.unsplash.com/photo-1551122087-f99a4e1fbaaf?w=600&h=400&fit=crop" },
  { name: "Crystals", icon: Mountain, href: "/catalogue?category=crystals", image: "https://images.unsplash.com/photo-1501862700950-18382cd41497?w=600&h=400&fit=crop" },
  { name: "Fossils", icon: Skull, href: "/catalogue?category=fossils", image: "https://images.unsplash.com/photo-1569091791842-7cfb64e04797?w=600&h=400&fit=crop" },
  { name: "Mining Antiques", icon: Gavel, href: "/catalogue?category=mining-antiques", image: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=600&h=400&fit=crop" },
  { name: "Lapidary Equipment", icon: Gavel, href: "/catalogue?category=lapidary", image: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=600&h=400&fit=crop" },
];

const featuredAuctions = [
  { id: 1, title: "Colombian Emerald - 5.2ct", currentBid: 12500, bids: 23, timeLeft: "2d 5h", image: "https://images.unsplash.com/photo-1551122087-f99a4e1fbaaf?w=400&h=400&fit=crop" },
  { id: 2, title: "Madagascar Rose Quartz Cluster", currentBid: 3200, bids: 15, timeLeft: "1d 12h", image: "https://images.unsplash.com/photo-1501862700950-18382cd41497?w=400&h=400&fit=crop" },
  { id: 3, title: "Ammonite Fossil - 120 Million Years", currentBid: 8500, bids: 31, timeLeft: "3d 8h", image: "https://images.unsplash.com/photo-1569091791842-7cfb64e04797?w=400&h=400&fit=crop" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-[#2B2C30] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B2C30] to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518562180175-3407f1b60f0b?w=1920&h=1080&fit=crop')" }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
              THE WEALTH OF <span className="text-[#EDED3B]">AFRICA</span> LIES BENEATH THE EARTH
            </h1>
            <p className="text-xl text-gray-300 mb-8" style={{ fontFamily: "Hind, sans-serif" }}>
              Discover rare and exceptional geological treasures from Africa and around the world. Fine minerals, gemstones, crystals, fossils, and mining antiques.
            </p>
            <div className="flex gap-4">
              <Link href="/catalogue" className="btn-gold inline-flex items-center gap-2">
                EXPLORE COLLECTION <ArrowRight size={18} />
              </Link>
              <Link href="/auctions" className="btn-outline-gold inline-flex items-center gap-2">
                VIEW AUCTIONS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">OUR CATEGORIES</h2>
            <p className="section-subtitle">Explore our extensive collection of geological treasures</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} className="group">
                <div className="relative aspect-square overflow-hidden mb-4">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-[#EDED3B]/80 transition-all duration-500 flex items-center justify-center">
                    <cat.icon size={32} className="text-white group-hover:text-[#2B2C30] transition-colors" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-center uppercase tracking-wider group-hover:text-[#EDED3B] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-20 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="section-title">FEATURED AUCTIONS</h2>
              <p className="section-subtitle mb-0">Bid on our most exclusive items</p>
            </div>
            <Link href="/auctions" className="btn-outline-gold hidden md:inline-flex items-center gap-2">
              VIEW ALL <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAuctions.map((auction) => (
              <div key={auction.id} className="card-auction group">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={auction.image} 
                    alt={auction.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge-live">LIVE</span>
                  </div>
                </div>
                <div className="p-6 bg-[#2B2C30]">
                  <h3 className="text-white font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{auction.title}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider" style={{ fontFamily: "Poppins, sans-serif" }}>Current Bid</p>
                      <p className="text-[#EDED3B] text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>${auction.currentBid.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs uppercase tracking-wider" style={{ fontFamily: "Poppins, sans-serif" }}>Time Left</p>
                      <p className="text-white font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>{auction.timeLeft}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">{auction.bids} bids</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/auctions" className="btn-outline-gold inline-flex items-center gap-2">
              VIEW ALL AUCTIONS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Sales Banner */}
      <section className="py-16 bg-[#EDED3B]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#2B2C30] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            LIVE SALES
          </h2>
          <p className="text-lg text-[#2B2C30]/80 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "Hind, sans-serif" }}>
            Join our live-streamed sales and bid in real-time. Don&apos;t miss out on exclusive pieces.
          </p>
          <Link href="/live-sales" className="btn-dark inline-flex items-center gap-2">
            JOIN LIVE SALE <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">WHY CHOOSE US</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#EDED3B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem size={28} className="text-[#2B2C30]" />
              </div>
              <h3 className="font-bold text-[#2B2C30] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>AUTHENTICATED</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "Hind, sans-serif" }}>Every item is verified and authenticated by our expert team.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#EDED3B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Gavel size={28} className="text-[#2B2C30]" />
              </div>
              <h3 className="font-bold text-[#2B2C30] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>FAIR AUCTIONS</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "Hind, sans-serif" }}>Transparent bidding with no hidden fees or charges.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#EDED3B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain size={28} className="text-[#2B2C30]" />
              </div>
              <h3 className="font-bold text-[#2B2C30] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>WORLDWIDE SHIPPING</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "Hind, sans-serif" }}>Secure and insured shipping to anywhere in the world.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#EDED3B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Skull size={28} className="text-[#2B2C30]" />
              </div>
              <h3 className="font-bold text-[#2B2C30] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>EXPERT ADVICE</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "Hind, sans-serif" }}>Our team of geologists and gemologists are always available.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
