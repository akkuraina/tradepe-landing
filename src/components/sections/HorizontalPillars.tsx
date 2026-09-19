"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, UserCheck, CheckCircle2, Lock } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface HorizontalPillarsProps {
  onRequestAccess: () => void;
}

export function HorizontalPillars({ onRequestAccess }: HorizontalPillarsProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to horizontal translation (-66.66% across 3 panels)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  const pillars = [
    {
      id: "01",
      tag: "Autonomous Underwriting",
      titlePre: "Instant zero-friction",
      titleAccent: "underwriting.",
      description:
        "Automate corporate entity verification across 120+ global jurisdictions. Proprietary KYB graph neural nets clear compliance and sanction backlogs in under 60 seconds.",
      specs: [
        { label: "Global KYB Latency", val: "< 60 seconds" },
        { label: "Jurisdictions Supported", val: "120+ Sovereign" },
        { label: "Registry Verification", val: "100% Automated" },
      ],
      icon: UserCheck,
      cardContent: (
        <div className="rounded-2xl bg-white border border-black/15 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF4D1C]" />
              <span className="font-mono text-xs text-[#0A0A0A]/70 font-semibold">ENTITY_VERIFICATION {"//"} ID: TP-8841</span>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-black/5 text-[#0A0A0A] border border-black/10 font-bold">
              PASSED (99.8%)
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-black/5">
              <span className="text-[#0A0A0A]/60">Entity Name:</span>
              <span className="text-[#0A0A0A] font-bold">Apex Global Logistics Pte Ltd</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-black/5">
              <span className="text-[#0A0A0A]/60">UBO Graph:</span>
              <span className="text-[#0A0A0A] font-medium">3 Tiers Cleared · 0 Sanction Flags</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-black/5">
              <span className="text-[#0A0A0A]/60">LEI / Tax ID:</span>
              <span className="font-mono text-[#0A0A0A] font-bold">5493006MHB84DD0Z1823</span>
            </div>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-[#0A0A0A]/60">Risk Score Engine:</span>
            <span className="text-[#FF4D1C] font-mono font-bold">LOW RISK (Tier 1 Cleared)</span>
          </div>
        </div>
      ),
    },
    {
      id: "02",
      tag: "Direct Clearing Network",
      titlePre: "Next-gen multi-currency",
      titleAccent: "rails.",
      description:
        "Bypass legacy correspondent banking chains. Direct programmatic integration with domestic high-value payment rails (RTGS, FedNow, SEPA Instant, Pix, FAST) for atomic settlement.",
      specs: [
        { label: "Settlement Latency", val: "< 3.2 seconds" },
        { label: "Intermediary Hops", val: "0 Hops (Direct)" },
        { label: "FX Markup Spread", val: "0% Spot Flat" },
      ],
      icon: Zap,
      cardContent: (
        <div className="rounded-2xl bg-white border border-black/15 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF4D1C] animate-pulse" />
              <span className="font-mono text-xs text-[#FF4D1C] font-bold">ATOMIC_ROUTING_ENGINE</span>
            </div>
            <span className="font-mono text-xs text-[#0A0A0A]/60 font-semibold">CORRIDOR: USD ⇄ INR</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center py-2">
            <div className="p-2.5 rounded-xl bg-black/5 border border-black/10">
              <div className="text-[10px] text-[#0A0A0A]/50 uppercase font-mono">Origin</div>
              <div className="text-sm font-bold text-[#0A0A0A] mt-1">FedNow</div>
              <div className="text-[10px] text-[#0A0A0A]/60 mt-0.5">USD Debited</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FF4D1C]/10 border border-[#FF4D1C]/30 flex flex-col justify-center items-center">
              <div className="text-[10px] text-[#FF4D1C] uppercase font-mono font-bold">TradePe</div>
              <div className="text-xs font-mono font-bold text-[#0A0A0A] mt-1">0.02s Hop</div>
              <div className="text-[10px] text-[#FF4D1C] font-semibold">Atomic Lock</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/5 border border-black/10">
              <div className="text-[10px] text-[#0A0A0A]/50 uppercase font-mono">Destination</div>
              <div className="text-sm font-bold text-[#0A0A0A] mt-1">RTGS</div>
              <div className="text-[10px] text-[#0A0A0A]/60 mt-0.5">INR Credited</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-black/5">
            <span className="text-[#0A0A0A]/60">Correspondent Bank Deductions:</span>
            <span className="text-[#FF4D1C] font-mono font-bold">$0.00 (Bypassed)</span>
          </div>
        </div>
      ),
    },
    {
      id: "03",
      tag: "Real-time Compliance",
      titlePre: "Automated cross-border",
      titleAccent: "guardrails.",
      description:
        "Continuous automated sanctions screening, dual-use customs classification, automated regulatory invoice reconciliation, and direct digital dispatch of sovereign export filings.",
      specs: [
        { label: "Sanction Screening", val: "Sub-millisecond" },
        { label: "Data Standard", val: "ISO 20022 Native" },
        { label: "Customs Alignment", val: "FEMA / Form A2 Auto" },
      ],
      icon: ShieldCheck,
      cardContent: (
        <div className="rounded-2xl bg-white border border-black/15 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#FF4D1C]" />
              <span className="font-mono text-xs text-[#0A0A0A]/80 font-bold">COMPLIANCE_DISPATCH_LEDGER</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#FF4D1C]/15 text-[#FF4D1C] border border-[#FF4D1C]/30 font-bold">
              AUDIT READY
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 py-1 text-[#0A0A0A]/80">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#FF4D1C] shrink-0" />
              <span>OFAC, EU, UN & FATF Lists Screened</span>
            </div>
            <div className="flex items-center gap-2 py-1 text-[#0A0A0A]/80">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#FF4D1C] shrink-0" />
              <span>Commercial Invoice & Bill of Lading Match: 100%</span>
            </div>
            <div className="flex items-center gap-2 py-1 text-[#0A0A0A]/80">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#FF4D1C] shrink-0" />
              <span>Automatic EDPMS & EDPMS IRM Generation</span>
            </div>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs border-t border-black/5">
            <span className="text-[#0A0A0A]/60">Regulatory Ledger:</span>
            <span className="font-mono text-[#0A0A0A] font-bold">SOC2 Type II Verified</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="pillars" className="relative bg-white text-[#0A0A0A]">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-[#FF4D1C] mb-3">
              ✦ ARCHITECTURAL PILLARS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A]">
              The Three Pillars of <span className="font-italic-accent text-[#FF4D1C]">TradePe</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-[#0A0A0A]/70 max-w-md">
            Engineered from ground up to replace obsolete 1970s correspondent banking networks with direct sovereign settlement rails.
          </p>
        </div>
      </div>

      {/* Desktop Horizontal Scroll Experience (Pins and scrubs horizontally) */}
      {isDesktop && !prefersReducedMotion ? (
        <div ref={targetRef} className="relative h-[300vh]">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <motion.div style={{ x }} className="flex w-[300vw] h-full items-center">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="w-screen h-full flex items-center justify-center px-8 lg:px-16"
                  >
                    <div className="w-full max-w-6xl rounded-3xl bg-[#FAFAFA] border border-black/15 p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xl relative overflow-hidden">
                      {/* Background Watermark ID */}
                      <span
                        className="pointer-events-none absolute right-6 bottom-2 font-display text-9xl font-black text-black/[0.04] select-none"
                        aria-hidden="true"
                      >
                        {pillar.id}
                      </span>

                      {/* Left Info Column */}
                      <div className="lg:col-span-6 space-y-6 z-10">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-[#FF4D1C]/15 border border-[#FF4D1C]/30 flex items-center justify-center text-[#FF4D1C]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D1C] font-bold">
                            Pillar {pillar.id} {"//"} {pillar.tag}
                          </span>
                        </div>

                        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] leading-tight">
                          {pillar.titlePre}{" "}
                          <span className="font-italic-accent text-[#FF4D1C]">
                            {pillar.titleAccent}
                          </span>
                        </h3>

                        <p className="font-sans text-base text-[#0A0A0A]/75 leading-relaxed">
                          {pillar.description}
                        </p>

                        {/* Specs Matrix */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-black/10">
                          {pillar.specs.map((s, idx) => (
                            <div key={idx}>
                              <div className="font-display text-lg font-bold text-[#0A0A0A]">
                                {s.val}
                              </div>
                              <div className="font-sans text-[11px] text-[#0A0A0A]/55 uppercase tracking-wider mt-0.5">
                                {s.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2">
                          <MagneticButton
                            variant="primary"
                            size="md"
                            onClick={onRequestAccess}
                          >
                            <span>Explore {pillar.tag}</span>
                            <ArrowRight className="h-4 w-4" />
                          </MagneticButton>
                        </div>
                      </div>

                      {/* Right Mockup Column */}
                      <div className="lg:col-span-6 z-10">
                        {pillar.cardContent}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      ) : (
        /* Mobile / Tablet / Reduced Motion Graceful Vertical Stack */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="rounded-2xl bg-[#FAFAFA] border border-black/15 p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden"
              >
                <span
                  className="pointer-events-none absolute right-4 bottom-2 font-display text-7xl font-black text-black/[0.04] select-none"
                  aria-hidden="true"
                >
                  {pillar.id}
                </span>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-[#FF4D1C]/15 border border-[#FF4D1C]/30 flex items-center justify-center text-[#FF4D1C]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FF4D1C] font-bold">
                    Pillar {pillar.id} · {pillar.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A] leading-tight">
                  {pillar.titlePre}{" "}
                  <span className="font-italic-accent text-[#FF4D1C]">
                    {pillar.titleAccent}
                  </span>
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#0A0A0A]/75 leading-relaxed">
                  {pillar.description}
                </p>

                <div>{pillar.cardContent}</div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-black/10">
                  {pillar.specs.map((s, idx) => (
                    <div key={idx}>
                      <div className="font-display text-base font-bold text-[#0A0A0A]">
                        {s.val}
                      </div>
                      <div className="font-sans text-[10px] text-[#0A0A0A]/55 uppercase tracking-wider mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
