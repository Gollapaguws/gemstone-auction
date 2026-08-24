import { Gavel, Calendar, Clock, Filter } from "lucide-react";
import AuctionCard from "@/components/auction/AuctionCard";

const auctionTypes = [
  { label: "All Auctions", value: "all" },
  { label: "Timed", value: "timed" },
  { label: "Silent", value: "silent" },
  { label: "Live", value: "live" },
];

const upcomingAuctions = [
  {
    id: "1",
    title: "Tsumeb Mineral Collection Auction",
    date: "2026-09-15T18:00:00Z",
    itemCount: 24,
    description: "Exceptional specimens from the legendary Tsumeb Mine",
  },
  {
    id: "2",
    title: "East African Gemstone Sale",
    date: "2026-09-22T17:00:00Z",
    itemCount: 36,
    description: "Tanzanite, Ruby, and Sapphire from Tanzania and Mozambique",
  },
  {
    id: "3",
    title: "Kalahari Manganese Fields Special",
    date: "2026-10-01T18:00:00Z",
    itemCount: 18,
    description: "Rare specimens from the Kalahari Manganese Fields",
  },
];

const activeAuctions = [
  {
    id: "1",
    name: "Tanzanite Crystal - Merelani Hills",
    currentBid: 45000,
    timeLeft: "2h 34m",
    bidCount: 12,
    auctionType: "timed" as const,
  },
  {
    id: "2",
    name: "Ajoite in Quartz - Messina",
    currentBid: 78000,
    timeLeft: "5h 12m",
    bidCount: 23,
    auctionType: "timed" as const,
  },
  {
    id: "3",
    name: "Emerald Crystal - Kagem Mine",
    currentBid: 62000,
    timeLeft: "1h 08m",
    bidCount: 18,
    auctionType: "timed" as const,
  },
  {
    id: "4",
    name: "Mimetite - Tsumeb Mine",
    currentBid: 32000,
    timeLeft: "8h 45m",
    bidCount: 15,
    auctionType: "silent" as const,
  },
  {
    id: "5",
    name: "Watermelon Tourmaline Set",
    currentBid: 28000,
    timeLeft: "12h 20m",
    bidCount: 9,
    auctionType: "timed" as const,
  },
  {
    id: "6",
    name: "Rare Fluorite Specimen",
    currentBid: 15000,
    timeLeft: "3h 55m",
    bidCount: 7,
    auctionType: "live" as const,
  },
];

export default function AuctionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title flex items-center gap-3">
          <Gavel className="w-8 h-8 text-gold-600" />
          Auctions
        </h1>
        <p className="section-subtitle">
          Bid on exceptional gemstones, minerals, and collectibles
        </p>
      </div>

      {/* Active Auctions */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            Active Auctions
          </h2>
          <div className="flex gap-2">
            {auctionTypes.map((type) => (
              <button
                key={type.value}
                className="px-4 py-2 text-sm border border-gray-200 rounded-full hover:bg-gold-50 hover:border-gold-300 transition-colors"
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAuctions.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>
      </section>

      {/* Upcoming Auctions */}
      <section className="mb-12">
        <h2 className="text-2xl font-serif font-bold flex items-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-gold-600" />
          Upcoming Auctions
        </h2>
        <div className="space-y-4">
          {upcomingAuctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-gold-500 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-serif font-bold text-lg mb-1">{auction.title}</h3>
                <p className="text-sm text-gray-500">{auction.description}</p>
                <p className="text-xs text-gray-400 mt-1">{auction.itemCount} items</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Starts</p>
                  <p className="font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gold-500" />
                    {new Date(auction.date).toLocaleDateString("en-ZA", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <button className="btn-gold text-sm py-2 px-4">Set Reminder</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Auction Calendar */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-serif font-bold mb-6">Auction Calendar</h2>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`py-3 rounded-lg cursor-pointer transition-colors ${
                day === 15 || day === 22
                  ? "bg-gold-100 text-gold-700 font-bold"
                  : "hover:bg-gray-50"
              }`}
            >
              {day}
              {(day === 15 || day === 22) && (
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mx-auto mt-1" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
