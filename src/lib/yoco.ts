const YOCO_API = "https://payments.yoco.com/api";

interface CheckoutParams {
  amount: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

interface CheckoutResponse {
  id: string;
  status: string;
  amount: number;
  currency: string;
  redirectUrl: string;
  paymentId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export async function createCheckout(
  params: CheckoutParams
): Promise<CheckoutResponse> {
  const res = await fetch(`${YOCO_API}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create checkout");
  }

  return res.json();
}

export async function getCheckout(checkoutId: string) {
  const res = await fetch(`${YOCO_API}/checkouts/${checkoutId}`, {
    headers: {
      Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to retrieve checkout");
  }

  return res.json();
}

export async function refundPayment(
  checkoutId: string,
  amount?: number
) {
  const body: Record<string, number> = {};
  if (amount) body.amount = amount;

  const res = await fetch(`${YOCO_API}/checkouts/${checkoutId}/refund`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to process refund");
  }

  return res.json();
}

export async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const data = encoder.encode(payload);

  return crypto.subtle
    .importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, [
      "verify",
    ])
    .then((key) =>
      crypto.subtle.verify(
        "HMAC",
        key,
        Uint8Array.from(signature, (c) => c.charCodeAt(0)),
        data
      )
    );
}
