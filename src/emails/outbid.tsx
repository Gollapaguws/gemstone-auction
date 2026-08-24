import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Hr,
  Button,
} from "@react-email/components";

interface OutbidEmailProps {
  userName: string;
  productName: string;
  currentBid: string;
  yourBid: string;
  auctionUrl: string;
}

export function OutbidEmail({
  userName,
  productName,
  currentBid,
  yourBid,
  auctionUrl,
}: OutbidEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <div style={headerStyle}>
            <Text style={logoStyle}>African Gems & Minerals</Text>
          </div>

          <Text style={titleStyle}>You&apos;ve Been Outbid!</Text>
          <Text style={textStyle}>Hi {userName},</Text>
          <Text style={textStyle}>
            Someone has placed a higher bid on <strong>{productName}</strong>.
          </Text>

          <div style={alertBoxStyle}>
            <Text style={alertTextStyle}>
              Current bid: <strong>{currentBid}</strong> (your bid: {yourBid})
            </Text>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Button href={auctionUrl} style={buttonStyle}>
              Place New Bid
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
  color: "#DC2626",
  textAlign: "center" as const,
  marginBottom: "24px",
};

const textStyle = {
  fontSize: "16px",
  color: "#374151",
  lineHeight: "1.6",
  marginBottom: "12px",
};

const alertBoxStyle = {
  backgroundColor: "#FEF2F2",
  border: "1px solid #FECACA",
  borderRadius: "12px",
  padding: "16px",
  textAlign: "center" as const,
};

const alertTextStyle = {
  fontSize: "16px",
  color: "#DC2626",
  margin: 0,
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
