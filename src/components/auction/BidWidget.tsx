"use client";

import { useState } from "react";
import { Gavel } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface BidWidgetProps {
  auctionId: string;
  currentBid: number;
  startPrice: number;
  bidCount: number;
  onBid?: (amount: number) => void;
}

export default function BidWidget({
  auctionId,
  currentBid,
  startPrice,
  bidCount,
  onBid,
}: BidWidgetProps) {
  const [bidAmount, setBidAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const minimumBid = currentBid > 0 ? currentBid + 100 : startPrice;
  const suggestedBids = [
    minimumBid,
    minimumBid + 500,
    minimumBid + 1000,
    minimumBid + 5000,
  ];

  const handleBid = async () => {
    const amount = parseInt(bidAmount, 10);
    if (amount < minimumBid) return;

    setIsLoading(true);
    try {
      // TODO: Call API to place bid
      onBid?.(amount);
      setBidAmount("");
    } catch (error) {
      console.error("Bid failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Gavel className="w-5 h-5 text-gold-600" />
        <h3 className="font-serif font-bold text-lg">Place a Bid</h3>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Current Bid</p>
        <p className="text-2xl font-bold text-gold-600">
          {formatCurrency(currentBid || startPrice)}
        </p>
        <p className="text-xs text-gray-400">{bidCount} bids placed</p>
      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-600 block mb-1">
          Your Bid (min. {formatCurrency(minimumBid)})
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder={minimumBid.toString()}
            min={minimumBid}
            step="100"
            className="input-field flex-1"
          />
          <button
            onClick={handleBid}
            disabled={!bidAmount || parseInt(bidAmount, 10) < minimumBid || isLoading}
            className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Placing..." : "Bid"}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestedBids.map((amount) => (
          <button
            key={amount}
            onClick={() => setBidAmount(amount.toString())}
            className="text-xs border border-gray-200 rounded-full px-3 py-1 hover:bg-gold-50 hover:border-gold-300 transition-colors"
          >
            {formatCurrency(amount)}
          </button>
        ))}
      </div>
    </div>
  );
}
