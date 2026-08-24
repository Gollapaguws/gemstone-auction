import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Button,
} from "@react-email/components";

interface OrderConfirmationEmailProps {
  userName: string;
  orderId: string;
  productName: string;
  amount: string;
  orderUrl: string;
}

export function OrderConfirmationEmail({
  userName,
  orderId,
  productName,
  amount,
  orderUrl,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <div style={headerStyle}>
            <Text style={logoStyle}>African Gems & Minerals</Text>
          </div>

          <Text style={titleStyle}>Order Confirmed</Text>
          <Text style={textStyle}>Hi {userName},</Text>
          <Text style={textStyle}>
            Thank you for your purchase! Your order has been confirmed.
          </Text>

          <div style={boxStyle}>
            <Text style={boxLabelStyle}>Order Summary</Text>
            <Text style={boxTextStyle}>Order: {orderId}</Text>
            <Text style={boxTextStyle}>Product: {productName}</Text>
            <Text style={boxTextStyle}>Amount: {amount}</Text>
            <Text style={boxTextStyle}>Status: Paid</Text>
          </div>

          <Text style={textStyle}>
            We&apos;ll send you a shipping notification once your item is on its
            way.
          </Text>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Button href={orderUrl} style={buttonStyle}>
              View Order
            </Button>
          </div>

          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            African Gems & Minerals | Est. 1984
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: "#FAF8F5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "32px",
};

const headerStyle = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#C9A84C",
  margin: 0,
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#1A1A1A",
  textAlign: "center" as const,
  marginBottom: "24px",
};

const textStyle = {
  fontSize: "16px",
  color: "#374151",
  lineHeight: "1.6",
  marginBottom: "12px",
};

const boxStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "12px",
  padding: "20px",
  marginTop: "20px",
  marginBottom: "20px",
};

const boxLabelStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#C9A84C",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  marginBottom: "12px",
};

const boxTextStyle = {
  fontSize: "14px",
  color: "#374151",
  margin: "4px 0",
};

const buttonStyle = {
  backgroundColor: "#C9A84C",
  color: "#FFFFFF",
  padding: "12px 32px",
  borderRadius: "8px",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "16px",
};

const hrStyle = {
  border: "none",
  borderTop: "1px solid #E5E7EB",
  margin: "32px 0 16px",
};

const footerStyle = {
  fontSize: "14px",
  color: "#9CA3AF",
  textAlign: "center" as const,
  marginBottom: 0,
};
