import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/ui/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "TradePe — Next-Gen Cross-Border Trade & Settlement Infrastructure",
  description:
    "Institutional multi-currency settlement rails, real-time FX clearing, and automated trade compliance for high-velocity global enterprises.",
  keywords: [
    "Cross-border payments",
    "FX settlement",
    "Trade finance",
    "Global treasury",
    "Multi-currency rails",
    "Institutional fintech",
  ],
  authors: [{ name: "TradePe Technologies" }],
  openGraph: {
    title: "TradePe — Next-Gen Cross-Border Trade & Settlement Infrastructure",
    description:
      "Direct-clearing corridors, instant liquidity routing, and automated compliance.",
    type: "website",
    locale: "en_US",
    siteName: "TradePe",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradePe — Next-Gen Cross-Border Trade Infrastructure",
    description:
      "Direct-clearing corridors, instant liquidity routing, and automated compliance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSerif.variable} ${inter.variable}`}
    >
      <body className="bg-white text-[#0A0A0A] antialiased selection:bg-[#FF4D1C] selection:text-white relative min-h-screen overflow-x-hidden">
        <SmoothScrollProvider>
          <GrainOverlay />
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
