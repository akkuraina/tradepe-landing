"use client";

import { useState } from "react";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { HorizontalPillars } from "@/components/sections/HorizontalPillars";
import { CorridorSimulator } from "@/components/sections/CorridorSimulator";
import { SplitTrustSection } from "@/components/sections/SplitTrustSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";
import { WaitlistModal } from "@/components/ui/WaitlistModal";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedCorridor, setSelectedCorridor] = useState("USD / INR");

  const handleOpenAccessModal = (corridor?: string) => {
    if (corridor) setSelectedCorridor(corridor);
    setWaitlistOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-white text-[#0A0A0A] selection:bg-[#FF4D1C] selection:text-white">
      {/* Editorial Fixed Header */}
      <Header onRequestAccess={() => handleOpenAccessModal()} />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10 flex flex-col">
        {/* 1. Hero with Kinetic Typography & 3D Interactive Signature */}
        <Hero onRequestAccess={() => handleOpenAccessModal()} />

        {/* 2. Infinite Marquee Corridors Strip */}
        <MarqueeStrip />

        {/* 3. Horizontal Scroll Product Pillars (Onboarding, Rails, Compliance) */}
        <HorizontalPillars onRequestAccess={() => handleOpenAccessModal()} />

        {/* 4. Interactive Live Corridor Routing & Settlement Simulator */}
        <CorridorSimulator onRequestAccess={() => handleOpenAccessModal()} />

        {/* 5. Infrastructure Comparison Matrix (Legacy SWIFT vs TradePe) */}
        {/* <ArchitectureMatrix onRequestAccess={() => handleOpenAccessModal()} /> */}

        {/* 6. Split-Screen Institutional Trust & Compliance Proofs */}
        <SplitTrustSection onRequestAccess={() => handleOpenAccessModal()} />

        {/* 7. Animated In-View Stat Counters & Telemetry */}
        <MetricsSection />

        {/* 8. Frequently Answered Questions Accordion */}
        <FAQSection />
      </main>

      {/* 9. Oversized Italic-Orange CTA Footer & Legal / Contact Directory */}
      <Footer onRequestAccess={() => handleOpenAccessModal()} />

      {/* Interactive Radix Access Request / Sandbox Modal */}
      <WaitlistModal
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
        defaultCorridor={selectedCorridor}
      />
    </div>
  );
}
