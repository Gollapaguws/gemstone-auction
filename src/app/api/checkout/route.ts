import { NextRequest, NextResponse } from "next/server";

const YOCO_API = "https://payments.yoco.com/api";

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, metadata } = await request.json();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const res = await fetch(`${YOCO_API}/checkouts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: currency || "ZAR",
        successUrl: `${appUrl}/checkout/success?checkoutId={checkoutId}`,
        cancelUrl: `${appUrl}/cart`,
        metadata,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { error: error.message || "Failed to create checkout" },
        { status: res.status }
      );
    }

    const checkout = await res.json();
    return NextResponse.json(checkout);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
