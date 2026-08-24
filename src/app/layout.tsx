import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "African Gems & Minerals | Gemstones, Crystals & Fine Minerals",
    template: "%s | African Gems & Minerals",
  },
  description:
    "Multifaceted International Company dealing in Gemstones, Crystals, Fine Minerals, Fossils, Antique Mining Memorabilia and Lapidary Equipment. Est. 1984.",
  keywords: [
    "gemstones",
    "crystals",
    "minerals",
    "fossils",
    "mining antiques",
    "african gems",
    "tanzanite",
    "emerald",
    "ruby",
    "auction",
    "live sale",
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "African Gems & Minerals",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
