import type { Metadata, Viewport } from "next";
import { Anton, Oswald, Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "WRASSLIN — The Indie Wrestling Hub",
    template: "%s · WRASSLIN",
  },
  description:
    "Discover independent wrestling promotions in your area and beyond. Rosters, events, videos, news, storylines, merch, tickets, and a community built for the pro wrestling fan.",
  keywords: ["indie wrestling", "independent wrestling", "pro wrestling", "wrestling promotions", "wrestling events"],
  openGraph: {
    title: "WRASSLIN — The Indie Wrestling Hub",
    description: "Every promotion. One hub. Built for the pro wrestling fan.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
