"use client";

import { useState } from "react";
import { Gem, Heart, Share2, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import CountdownTimer from "@/components/auction/CountdownTimer";
import BidWidget from "@/components/auction/BidWidget";
import { formatCurrency } from "@/lib/utils";

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerMessage, setOfferMessage] = useState("");

  // Mock product data
  const product = {
    id: "1",
    name: "Tanzanite Crystal - Merelani Hills, Tanzania",
    description:
      "A stunning tanzanite crystal from the Merelani Hills in Tanzania. This exceptional specimen displays the characteristic blue-violet color that makes tanzanite one of the most sought-after gemstones in the world. The crystal exhibits excellent clarity and a beautiful prismatic form with well-defined termination.",
    origin: "Merelani Hills, Tanzania",
    dimensions: "4.2cm x 3.1cm x 2.8cm",
    weight: "42.5g",
    condition: "Excellent - Natural, untreated",
    type: "auction" as const,
    price: 45000,
    images: ["/images/tanzanite-1.jpg", "/images/tanzanite-2.jpg", "/images/tanzanite-3.jpg"],
    category: "Gemstones",
    subcategory: "Cut Gemstones",
    auction: {
      id: "auction-1",
      startPrice: 15000,
      currentBid: 45000,
      bidCount: 12,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      auctionType: "timed" as const,
    },
  };

  const relatedProducts = [
    { id: "2", name: "Emerald Crystal" },
    { id: "3", name: "Ruby Specimen" },
    { id: "4", name: "Sapphire Rough" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/catalogue" className="hover:text-gold-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Catalogue
        </Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span>{product.subcategory}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <Gem className="w-24 h-24" />
            </div>
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === idx
                    ? "border-gold-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Gem className="w-6 h-6" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-2">
            <span className="badge-auction">{product.auction.auctionType} Auction</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            {product.name}
          </h1>

          {/* Countdown */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Time Remaining</p>
            <CountdownTimer endDate={product.auction.endTime} size="lg" />
          </div>

          {/* Details */}
          <div className="space-y-3 mb-6 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Origin</span>
              <span className="font-medium">{product.origin}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Dimensions</span>
              <span className="font-medium">{product.dimensions}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Weight</span>
              <span className="font-medium">{product.weight}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Condition</span>
              <span className="font-medium">{product.condition}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="font-serif font-bold text-lg mb-2">Description</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Bid Widget */}
          <BidWidget
            auctionId={product.auction.id}
            currentBid={product.auction.currentBid}
            startPrice={product.auction.startPrice}
            bidCount={product.auction.bidCount}
          />

          {/* Enquiry Note */}
          <p className="text-xs text-gray-400 mt-4">
            All prices are estimates. As all items are unique, we will provide a
            formal quote based on your exact requirements. Prices exclude VAT, GST
            and Shipping.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <section>
        <h2 className="section-title text-2xl mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="card-product group"
            >
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <Gem className="w-12 h-12" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium group-hover:text-gold-600 transition-colors">
                  {p.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
