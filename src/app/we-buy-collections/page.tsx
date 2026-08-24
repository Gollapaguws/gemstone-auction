"use client";

import { useState } from "react";
import { Upload, Send, CheckCircle } from "lucide-react";

export default function WeBuyCollectionsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    collectionType: "",
    description: "",
    estimatedValue: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Submit form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-earth text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            We Buy Mineral Collections
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Over the years Rob Smith (Owner and CEO of African Gems & Minerals)
            has bought and showcased over 200 private Mineral, Gemstone, Scientific
            Instrument, Mining Memorabilia and rare Antique Mining Book Collections.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-serif font-bold text-2xl mb-6">
              Why Sell To Us?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Expert Valuation</h3>
                  <p className="text-gray-600 text-sm">
                    Rob Smith is a well-respected Mineral Dealer in South Africa
                    and Internationally, who will consult with you regarding your
                    Collection.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Instant Cash Buyers</h3>
                  <p className="text-gray-600 text-sm">
                    We are instant cash buyers and offer the utmost privacy in our
                    dealings.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">International Reach</h3>
                  <p className="text-gray-600 text-sm">
                    We have the ability to market at wholesale and retail levels
                    Internationally and we are able to buy and market Select Pieces.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">We Travel For Quality</h3>
                  <p className="text-gray-600 text-sm">
                    If the Collection or the individual pieces you are selling is
                    of a good quality we would be prepared to Travel.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gold-50 rounded-xl">
              <p className="text-sm text-gray-600">
                <strong>Call us for our expert advice.</strong> We look forward to
                working with you in disposing of your Collection or Individual
                pieces.
              </p>
              <p className="text-lg font-bold mt-2">+27 (0)83 260 1563</p>
            </div>
          </div>

          {/* Submission Form */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="font-serif font-bold text-2xl mb-6">
              Submit Your Collection
            </h2>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-500">
                  We&apos;ve received your submission. We&apos;ll be in touch
                  shortly to discuss your collection.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Collection Type
                  </label>
                  <select
                    value={form.collectionType}
                    onChange={(e) =>
                      setForm({ ...form, collectionType: e.target.value })
                    }
                    className="input-field"
                    required
                  >
                    <option value="">Select type...</option>
                    <option value="minerals">Mineral Collection</option>
                    <option value="gemstones">Gemstone Collection</option>
                    <option value="fossils">Fossil Collection</option>
                    <option value="mining">Mining Memorabilia</option>
                    <option value="books">Antique Books</option>
                    <option value="mixed">Mixed Collection</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="input-field min-h-[100px]"
                    placeholder="Tell us about your collection..."
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Estimated Value (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.estimatedValue}
                    onChange={(e) =>
                      setForm({ ...form, estimatedValue: e.target.value })
                    }
                    className="input-field"
                    placeholder="R..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gold-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Submitting..." : "Submit Collection"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
