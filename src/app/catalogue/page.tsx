import { Gem, Filter } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

const categories = [
  { name: "All", slug: "all" },
  { name: "Fine Minerals", slug: "minerals" },
  { name: "Gemstones", slug: "gemstones" },
  { name: "Crystals", slug: "crystals" },
  { name: "Fossils", slug: "fossils" },
  { name: "Mining Antiques", slug: "antiques" },
  { name: "Lapidary Equipment", slug: "lapidary" },
];

const subcategories: Record<string, string[]> = {
  minerals: ["Tsumeb", "Kalahari", "Messina", "Southern Africa", "Worldwide"],
  gemstones: [
    "Cut Gemstones",
    "Facet Rough",
    "Tumbling Rough",
    "Lab Grown",
  ],
  crystals: ["Healing", "Clusters", "Points", "Tumbled"],
};

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Most Popular", value: "popular" },
];

export default function CataloguePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title">Product Catalogue</h1>
        <p className="section-subtitle">
          Browse our extensive collection of gemstones, minerals, and more
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gold-600" />
              <h2 className="font-serif font-bold text-lg">Filters</h2>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider mb-3">
                Category
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat.slug}
                    className="flex items-center gap-2 cursor-pointer hover:text-gold-600 transition-colors"
                  >
                    <input
                      type="radio"
                      name="category"
                      defaultChecked={cat.slug === "all"}
                      className="text-gold-500 focus:ring-gold-500"
                    />
                    <span className="text-sm">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider mb-3">
                Price Range (ZAR)
              </h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="input-field text-sm py-2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="input-field text-sm py-2"
                />
              </div>
            </div>

            {/* Auction Type */}
            <div className="mb-6">
              <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider mb-3">
                Sale Type
              </h3>
              <div className="space-y-2">
                {["Buy Now", "Auction", "Make Offer"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="text-gold-500 rounded focus:ring-gold-500"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="btn-gold w-full text-sm py-2">Apply Filters</button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">48</span> items
            </p>
            <select className="input-field w-auto text-sm py-2">
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { id: "1", name: "Tanzanite Crystal", price: 45000, origin: "Tanzania" },
              { id: "2", name: "Ajoite in Quartz", price: null, origin: "Messina, SA" },
              { id: "3", name: "Emerald Crystal", price: 28000, origin: "Zambia" },
              { id: "4", name: "Mimetite - Tsumeb", price: 32000, origin: "Namibia" },
              { id: "5", name: "Amethyst Cluster", price: 8500, origin: "Brazil" },
              { id: "6", name: "Black Tourmaline", price: 3200, origin: "Namibia" },
              { id: "7", name: "Watermelon Tourmaline", price: 15000, origin: "Mozambique" },
              { id: "8", name: "Fluorite - Riemvasmaak", price: 6800, origin: "South Africa" },
              { id: "9", name: "Rhodochrosite", price: 12000, origin: "Kalahari, SA" },
            ].map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg text-sm ${
                  page === 1
                    ? "bg-gold-500 text-white"
                    : "border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
