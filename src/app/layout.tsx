import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "African Gems And Minerals – The Wealth Of Africa Lies Beneath The Earth",
  description: "Fine Minerals, Gemstones, Crystals, Fossils & Mining Antiques. Discover rare and exceptional geological treasures from Africa and around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
