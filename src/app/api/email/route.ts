import { NextRequest, NextResponse } from "next/server";
import {
  sendBidPlacedEmail,
  sendOutbidEmail,
  sendAuctionWonEmail,
  sendOrderConfirmationEmail,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...params } = body;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    switch (type) {
      case "bid_placed":
        await sendBidPlacedEmail({
          to: params.to,
          userName: params.userName,
          productName: params.productName,
          bidAmount: params.bidAmount,
          auctionEndTime: params.auctionEndTime,
          auctionUrl: `${appUrl}/product/${params.productId}`,
        });
        break;

      case "outbid":
        await sendOutbidEmail({
          to: params.to,
          userName: params.userName,
          productName: params.productName,
          currentBid: params.currentBid,
          yourBid: params.yourBid,
          auctionUrl: `${appUrl}/product/${params.productId}`,
        });
        break;

      case "auction_won":
        await sendAuctionWonEmail({
          to: params.to,
          userName: params.userName,
          productName: params.productName,
          finalPrice: params.finalPrice,
          checkoutUrl: `${appUrl}/checkout?orderId=${params.orderId}`,
        });
        break;

      case "order_confirmed":
        await sendOrderConfirmationEmail({
          to: params.to,
          userName: params.userName,
          orderId: params.orderId,
          productName: params.productName,
          amount: params.amount,
          orderUrl: `${appUrl}/dashboard`,
        });
        break;

      default:
        return NextResponse.json(
          { error: "Unknown email type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
