import Link from "next/link";
import { ArrowRight, Gavel, Gem, Clock, Flame } from "lucide-react";

const categories = [
  {
    name: "Fine Minerals",
    href: "/catalogue/minerals",
    image: "/images/minerals.jpg",
    description: "Tsumeb, Kalahari, Messina & more",
  },
  {
    name: "Cut & Rough Gemstones",
    href: "/catalogue/gemstones",
    image: "/images/gemstones.jpg",
    description: "Emeralds, Rubies, Sapphires & more",
  },
  {
    name: "Crystals & Holistic",
    href: "/catalogue/crystals",
    image: "/images/crystals.jpg",
    description: "Healing crystals & mineral specimens",
  },
  {
    name: "Fossils",
    href: "/catalogue/fossils",
    image: "/images/fossils.jpg",
    description: "Ancient fossil specimens",
  },
  {
    name: "Mining Antiques",
    href: "/catalogue/antiques",
    image: "/images/antiques.jpg",
    description: "Antique mining memorabilia",
  },
  {
    name: "Lapidary Equipment",
    href: "/catalogue/lapidary",
    image: "/images/lapidary.jpg",
    description: "Tools & equipment for gem cutting",
  },
];

const featuredAuctions = [
  {
    id: "1",
    name: "Tanzanite Crystal - Merelani Hills",
    currentBid: 15000,
    timeLeft: "2h 34m",
    image: "/images/tanzanite.jpg",
    bids: 12,
  },
  {
    id: "2",
    name: "Ajoite in Quartz - Messina",
    currentBid: 45000,
    timeLeft: "5h 12m",
    image: "/images/ajoite.jpg",
    bids: 23,
  },
  {
    id: "3",
    name: "Emerald Crystal - Kagem Mine",
    currentBid: 28000,
    timeLeft: "1h 08m",
    image: "/images/emerald.jpg",
    bids: 18,
  },
  {
    id: "4",
    name: "Mimetite - Tsumeb Mine",
    currentBid: 32000,
    timeLeft: "8h 45m",
    image: "/images/mimetite.jpg",
    bids: 15,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <p className="text-gold-400 font-medium tracking-widest uppercase mb-4">
              Est. 1984
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              The Wealth of Africa Lies Beneath The Earth
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              African Gems & Minerals is a Multifaceted International Company,
              dealing in Gemstones, Crystals, Fine Minerals, Fossils, Antique
              Mining Memorabilia and Lapidary equipment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/catalogue" className="btn-gold inline-flex items-center gap-2">
                Browse Catalogue <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/auctions"
                className="btn-outline-gold border-gold-400 text-gold-400 hover:bg-gold-400/10 inline-flex items-center gap-2"
              >
                <Gavel className="w-5 h-5" /> View Auctions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Auctions Banner */}
      <section className="bg-gold-500 text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 animate-pulse" />
            <span className="font-bold text-lg">Live Auctions Now</span>
            <span className="hidden sm:inline text-gold-100">
              — 4 active auctions with bids starting from R15,000
            </span>
          </div>
          <Link
            href="/auctions"
            className="bg-white text-gold-600 font-semibold px-4 py-2 rounded-lg hover:bg-gold-50 transition-colors text-sm"
          >
            Bid Now
          </Link>
        </div>
      </section>

      {/* Product Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title">Product Catalog</h2>
          <p className="section-subtitle">
            Explore our extensive collection of rare and exquisite specimens
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href} className="card-product group">
              <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Gem className="w-16 h-16 opacity-30" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white font-serif font-bold text-xl">{cat.name}</h3>
                  <p className="text-gray-200 text-sm">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Featured Auctions</h2>
              <p className="section-subtitle mb-0">
                Don&apos;t miss these exceptional pieces
              </p>
            </div>
            <Link
              href="/auctions"
              className="text-gold-600 font-medium hover:text-gold-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAuctions.map((auction) => (
              <Link
                key={auction.id}
                href={`/product/${auction.id}`}
                className="card-auction group"
              >
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Gem className="w-12 h-12 opacity-30" />
                  </div>
                  <div className="absolute top-3 left-3 z-10">
                    <span className="badge-auction">Auction</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-gold-600 transition-colors mb-2 line-clamp-2">
                    {auction.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Current Bid</p>
                      <p className="font-bold text-gold-600">
                        R{auction.currentBid.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {auction.timeLeft}
                      </p>
                      <p className="text-gray-500 text-xs">{auction.bids} bids</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* We Buy Collections */}
      <section className="bg-gradient-earth text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            We Buy Mineral Collections
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Over the years we have bought and showcased over 200 private Mineral,
            Gemstone, Scientific Instrument, Mining Memorabilia and rare Antique
            Mining Book Collections.
          </p>
          <Link
            href="/we-buy-collections"
            className="btn-gold inline-flex items-center gap-2"
          >
            Find Out More <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gold-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Get the latest news on new arrivals, upcoming auctions, and exclusive
            offers delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1"
            />
            <button type="submit" className="btn-gold whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
