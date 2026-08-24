import Link from "next/link";
import { Gem, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface AuctionCardProps {
  id: string;
  name: string;
  currentBid: number;
  timeLeft: string;
  bidCount: number;
  image?: string;
  auctionType?: "timed" | "live" | "silent";
}

export default function AuctionCard({
  id,
  name,
  currentBid,
  timeLeft,
  bidCount,
  auctionType = "timed",
}: AuctionCardProps) {
  return (
    <Link href={`/product/${id}`} className="card-auction group">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
          <Gem className="w-12 h-12" />
        </div>
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {auctionType === "live" && <span className="badge-live">Live</span>}
          {auctionType === "silent" && (
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              Silent
            </span>
          )}
          {auctionType === "timed" && <span className="badge-auction">Auction</span>}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 group-hover:text-gold-600 transition-colors mb-2 line-clamp-2">
          {name}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-gray-500 text-xs">Current Bid</p>
            <p className="font-bold text-gold-600">{formatCurrency(currentBid)}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs flex items-center gap-1 justify-end">
              <Clock className="w-3 h-3" /> {timeLeft}
            </p>
            <p className="text-gray-500 text-xs">{bidCount} bids</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
