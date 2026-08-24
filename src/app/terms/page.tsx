import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>Terms of Service</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed">
        <p>Last updated: August 2026</p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>1. Introduction</h2>
        <p>
          Welcome to African Gems &amp; Minerals. These Terms of Service govern your use of our website and services.
          By accessing or using our website, you agree to be bound by these terms.
        </p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>2. Products and Services</h2>
        <p>
          All items listed are genuine natural specimens. Images are representative; actual items may vary slightly.
          All prices are estimates and subject to change. Prices exclude VAT, GST, and shipping unless stated otherwise.
        </p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>3. Auctions</h2>
        <p>
          By placing a bid, you enter into a binding agreement to purchase the item if you are the winning bidder.
          All bids are final and cannot be retracted. We reserve the right to cancel any auction at our discretion.
        </p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>4. Payment</h2>
        <p>
          We accept payment via Yoco. All payments must be completed before items are shipped.
          We reserve the right to cancel orders where payment is not received within the specified timeframe.
        </p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>5. Shipping</h2>
        <p>
          Items are shipped via insured courier services. Shipping costs are calculated at checkout.
          International shipments may be subject to customs duties and taxes, which are the buyer&apos;s responsibility.
        </p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>6. Returns</h2>
        <p>
          Due to the unique nature of our items, returns are accepted within 14 days of delivery for items
          that are materially different from their description. Contact us to arrange a return.
        </p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>7. Privacy</h2>
        <p>
          Your personal information is handled in accordance with our Privacy Policy. We do not sell or share
          your information with third parties except as necessary to fulfil your order.
        </p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>8. Contact</h2>
        <p>
          For questions about these Terms, please contact us at{" "}
          <a href="mailto:gems@africangems.com" className="text-[#2B2C30] underline">gems@africangems.com</a>.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/" className="text-[#EDED3B] hover:underline font-semibold text-sm">← Back to Home</Link>
      </div>
    </div>
  );
}
