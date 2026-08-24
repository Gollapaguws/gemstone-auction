import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-serif font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be
          processed shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="btn-gold inline-flex items-center justify-center gap-2">
            View Orders <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/catalogue" className="btn-outline-gold inline-flex items-center justify-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
