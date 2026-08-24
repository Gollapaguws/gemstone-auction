import Link from "next/link";
import { Gem } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price?: number | null;
  image?: string;
  type?: "fixed_price" | "auction" | "offer";
  origin?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  type = "fixed_price",
  origin,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="card-product group">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
          <Gem className="w-12 h-12" />
        </div>
        {type === "auction" && (
          <div className="absolute top-3 left-3 z-10">
            <span className="badge-auction">Auction</span>
          </div>
        )}
        {type === "offer" && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-earth-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              Make Offer
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 group-hover:text-gold-600 transition-colors mb-1 line-clamp-2">
          {name}
        </h3>
        {origin && <p className="text-xs text-gray-500 mb-2">{origin}</p>}
        <div>
          {price ? (
            <p className="font-bold text-gold-600">{formatCurrency(price)}</p>
          ) : (
            <p className="text-sm text-gray-500">Enquire for price</p>
          )}
        </div>
      </div>
    </Link>
  );
}
