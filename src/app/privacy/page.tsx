import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>Privacy Policy</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed">
        <p>Last updated: August 2026</p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>1. Information We Collect</h2>
        <p>
          We collect information you provide directly: name, email, phone number, shipping address,
          and payment information. We also collect usage data including IP address, browser type,
          and pages visited.
        </p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Process orders and payments</li>
          <li>Ship items to your address</li>
          <li>Send order updates and confirmations</li>
          <li>Improve our website and services</li>
          <li>Send marketing communications (with your consent)</li>
        </ul>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>3. Information Sharing</h2>
        <p>
          We do not sell your personal information. We share your information only with:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Payment processors (Yoco) to process transactions</li>
          <li>Shipping carriers to deliver your orders</li>
          <li>Service providers who assist in operating our website</li>
        </ul>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information.
          All payment data is encrypted and processed securely through Yoco.
        </p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>5. Cookies</h2>
        <p>
          We use cookies to maintain your session and improve your experience. You can
          control cookies through your browser settings.
        </p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>6. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information.
          Contact us at{" "}
          <a href="mailto:gems@africangems.com" className="text-[#2B2C30] underline">gems@africangems.com</a>{" "}
          to exercise these rights.
        </p>

        <h2 className="text-xl font-bold mt-8" style={{ fontFamily: "Poppins, sans-serif" }}>7. Contact</h2>
        <p>
          For privacy-related questions, contact us at{" "}
          <a href="mailto:gems@africangems.com" className="text-[#2B2C30] underline">gems@africangems.com</a>.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/" className="text-[#EDED3B] hover:underline font-semibold text-sm">← Back to Home</Link>
      </div>
    </div>
  );
}
