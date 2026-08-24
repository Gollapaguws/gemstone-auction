import { Resend } from "resend";
import { BidPlacedEmail } from "@/emails/bid-placed";
import { OutbidEmail } from "@/emails/outbid";
import { AuctionWonEmail } from "@/emails/auction-won";
import { OrderConfirmationEmail } from "@/emails/order-confirmation";
import { render } from "@react-email/render";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM_EMAIL = "African Gems & Minerals <notifications@africangems.com>";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: SendEmailParams) {
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject,
    html,
  });

  if (error) {
    console.error("Email error:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function sendBidPlacedEmail(params: {
  to: string;
  userName: string;
  productName: string;
  bidAmount: string;
  auctionEndTime: string;
  auctionUrl: string;
}) {
  const html = await render(
    BidPlacedEmail({
      userName: params.userName,
      productName: params.productName,
      bidAmount: params.bidAmount,
      auctionEndTime: params.auctionEndTime,
      auctionUrl: params.auctionUrl,
    })
  );

  return sendEmail({
    to: params.to,
    subject: `Bid Placed: ${params.productName}`,
    html,
  });
}

export async function sendOutbidEmail(params: {
  to: string;
  userName: string;
  productName: string;
  currentBid: string;
  yourBid: string;
  auctionUrl: string;
}) {
  const html = await render(
    OutbidEmail({
      userName: params.userName,
      productName: params.productName,
      currentBid: params.currentBid,
      yourBid: params.yourBid,
      auctionUrl: params.auctionUrl,
    })
  );

  return sendEmail({
    to: params.to,
    subject: `Outbid: ${params.productName}`,
    html,
  });
}

export async function sendAuctionWonEmail(params: {
  to: string;
  userName: string;
  productName: string;
  finalPrice: string;
  checkoutUrl: string;
}) {
  const html = await render(
    AuctionWonEmail({
      userName: params.userName,
      productName: params.productName,
      finalPrice: params.finalPrice,
      checkoutUrl: params.checkoutUrl,
    })
  );

  return sendEmail({
    to: params.to,
    subject: `You Won: ${params.productName}`,
    html,
  });
}

export async function sendOrderConfirmationEmail(params: {
  to: string;
  userName: string;
  orderId: string;
  productName: string;
  amount: string;
  orderUrl: string;
}) {
  const html = await render(
    OrderConfirmationEmail({
      userName: params.userName,
      orderId: params.orderId,
      productName: params.productName,
      amount: params.amount,
      orderUrl: params.orderUrl,
    })
  );

  return sendEmail({
    to: params.to,
    subject: `Order Confirmed: ${params.orderId}`,
    html,
  });
}
