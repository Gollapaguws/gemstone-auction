import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: {
    default: "African Gems & Minerals – Fine Minerals, Gemstones, Crystals, Fossils & Mining Antiques",
    template: "%s | African Gems & Minerals",
  },
  description: "Discover rare and exceptional geological treasures from Africa and around the world. Fine minerals, gemstones, crystals, fossils, and mining antiques. The Wealth of Africa Lies Beneath the Earth.",
  keywords: ["gemstones", "minerals", "crystals", "fossils", "mining antiques", "african gems", "auction", "fine minerals", "tanzanite", "emerald", "ruby", "sapphire"],
  authors: [{ name: "African Gems & Minerals" }],
  creator: "African Gems & Minerals",
  publisher: "African Gems & Minerals",
  metadataBase: new URL("https://www.africangems.com"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "African Gems & Minerals",
    title: "African Gems & Minerals – Fine Minerals, Gemstones, Crystals, Fossils & Mining Antiques",
    description: "Discover rare and exceptional geological treasures from Africa and around the world.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "African Gems & Minerals",
    description: "Discover rare and exceptional geological treasures from Africa and around the world.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
};

export const viewport: Viewport = {
  themeColor: "#EDED3B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
