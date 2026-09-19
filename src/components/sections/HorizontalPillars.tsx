"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Globe, CheckCircle2, Lock, Check } from "lucide-react";
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
      tag: "Global Banking",
      titlePre: "Around the",
      titleAccent: "world",
      features: [
        "Fully digital onboarding and KYB process",
        "Open fully functional export ready current account with AD1/ recognised banks",
        "Instantly get local currency bank account across major countries",
      ],
      icon: Globe,
      cardContent: (
        <div className="rounded-2xl bg-white border border-black/15 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF4D1C]" />
              <span className="font-mono text-xs text-[#0A0A0A]/80 font-bold uppercase tracking-wider">
                KYB & GLOBAL ACCOUNTS
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              AD1 RECOGNISED
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-black/5">
              <span className="text-[#0A0A0A]/60">Onboarding & KYB:</span>
              <span className="text-[#0A0A0A] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                100% Fully Digital
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-black/5">
              <span className="text-[#0A0A0A]/60">Current Account:</span>
              <span className="text-[#0A0A0A] font-bold">Export-Ready (AD1 Bank)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-black/5">
              <span className="text-[#0A0A0A]/60">Local Currencies:</span>
              <span className="font-mono text-[#0A0A0A] font-bold">USD · EUR · GBP · AED · SGD · CAD</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs bg-[#FAFAFA] p-3 rounded-xl border border-black/5">
            <span className="text-[#0A0A0A]/70 font-medium">Account Activation Time:</span>
            <span className="text-[#FF4D1C] font-mono font-bold">INSTANT ON KYB CLEARANCE</span>
          </div>
        </div>
      ),
    },
    {
      id: "02",
      tag: "Payments & FX",
      titlePre: "Seamless",
      titleAccent: "payments",
      features: [
        "Real time FX booking at low rates",
        "Accept payments through local payment methods and SWIFT",
        "Receive INR in your bank account within 48hrs with live tracking",
      ],
      icon: Zap,
      cardContent: (
        <div className="rounded-2xl bg-white border border-black/15 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF4D1C] animate-pulse" />
              <span className="font-mono text-xs text-[#FF4D1C] font-bold uppercase tracking-wider">
                REAL-TIME FX & PAYOUTS
              </span>
            </div>
            <span className="font-mono text-xs text-[#0A0A0A]/70 font-semibold">
              SWIFT + LOCAL RAILS
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center py-2">
            <div className="p-2.5 rounded-xl bg-black/5 border border-black/10">
              <div className="text-[10px] text-[#0A0A0A]/50 uppercase font-mono">Inward</div>
              <div className="text-xs font-bold text-[#0A0A0A] mt-1">Local / SWIFT</div>
              <div className="text-[10px] text-[#0A0A0A]/60 mt-0.5">Major Countries</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FF4D1C]/10 border border-[#FF4D1C]/30 flex flex-col justify-center items-center">
              <div className="text-[10px] text-[#FF4D1C] uppercase font-mono font-bold">FX Booking</div>
              <div className="text-xs font-mono font-bold text-[#0A0A0A] mt-1">Real-Time</div>
              <div className="text-[10px] text-[#FF4D1C] font-semibold">Low Rates</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/5 border border-black/10">
              <div className="text-[10px] text-[#0A0A0A]/50 uppercase font-mono">INR Payout</div>
              <div className="text-xs font-bold text-[#0A0A0A] mt-1">&lt; 48 Hours</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Live Tracking</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-black/5">
            <span className="text-[#0A0A0A]/60">Settlement Timeline:</span>
            <span className="text-[#FF4D1C] font-mono font-bold">INR in bank within 48 hrs</span>
          </div>
        </div>
      ),
    },
    {
      id: "03",
      tag: "Automated Compliance",
      titlePre: "Effortless",
      titleAccent: "compliance",
      features: [
        "Automated export documentation for easiest creation and management",
        "Knock off shipping bills and generate eBRC digitally",
        "Download FIRA online within 24hrs",
      ],
      icon: ShieldCheck,
      cardContent: (
        <div className="rounded-2xl bg-white border border-black/15 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#FF4D1C]" />
              <span className="font-mono text-xs text-[#0A0A0A]/80 font-bold uppercase tracking-wider">
                EXPORT COMPLIANCE ENGINE
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#FF4D1C]/15 text-[#FF4D1C] border border-[#FF4D1C]/30 font-bold">
              DIGITAL eBRC
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-black/5">
              <span className="text-[#0A0A0A]/60">Export Documentation:</span>
              <span className="text-[#0A0A0A] font-bold">Automated Creation & Management</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-black/5">
              <span className="text-[#0A0A0A]/60">Shipping Bills:</span>
              <span className="text-emerald-700 font-medium">Knocked Off Digitally</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-black/5">
              <span className="text-[#0A0A0A]/60">FIRA Turnaround:</span>
              <span className="font-mono text-[#0A0A0A] font-bold">Online Download &lt; 24 hrs</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs bg-[#FAFAFA] p-3 rounded-xl border border-black/5">
            <span className="text-[#0A0A0A]/70 font-medium">Regulatory Friction:</span>
            <span className="text-[#FF4D1C] font-mono font-bold">100% AUTOMATED</span>
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

                        {/* Official Pillar Features Checklist */}
                        <ul className="space-y-4 pt-1">
                          {pillar.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF4D1C]/15 text-[#FF4D1C]">
                                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                              </div>
                              <span className="font-sans text-sm sm:text-base text-[#0A0A0A]/90 font-medium leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
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

                {/* Official Pillar Features Checklist (Mobile) */}
                <ul className="space-y-3.5">
                  {pillar.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF4D1C]/15 text-[#FF4D1C]">
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      </div>
                      <span className="font-sans text-sm text-[#0A0A0A]/90 font-medium leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div>{pillar.cardContent}</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
