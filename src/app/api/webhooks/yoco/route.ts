import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("standard-webhooks-signature");

    // TODO: Verify webhook signature with Yoco
    // const isValid = await verifyWebhookSignature(body, signature, process.env.YOCO_WEBHOOK_SECRET);
    // if (!isValid) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    const event = JSON.parse(body);

    switch (event.type) {
      case "payment.succeeded":
        // Update order status to paid
        console.log("Payment succeeded:", event.data);
        break;
      case "payment.failed":
        // Handle failed payment
        console.log("Payment failed:", event.data);
        break;
      default:
        console.log("Unhandled event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
