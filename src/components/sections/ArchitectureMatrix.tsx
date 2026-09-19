"use client";

import { Check, X, ArrowRight, Server } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TradePeWordmark } from "@/components/TradePeWordmark";

interface ArchitectureMatrixProps {
  onRequestAccess: () => void;
}

export function ArchitectureMatrix({ onRequestAccess }: ArchitectureMatrixProps) {
  const comparisons = [
    {
      feature: "Routing Architecture",
      legacy: "Sequential multi-bank chain (3–5 intermediary correspondent banks)",
      tradePe: "Single-hop direct mesh into local central bank clearing systems",
    },
    {
      feature: "Settlement Speed",
      legacy: "T+2 to T+5 business days (delayed by time zones and cutoff times)",
      tradePe: "Sub-second atomic settlement (24/7/365 continuous execution)",
    },
    {
      feature: "FX Spread & Transparency",
      legacy: "Opaque spreads (up to 3.5% markup) + unexpected cable deductions",
      tradePe: "Institutional interbank spot + transparent flat bps fee",
    },
    {
      feature: "Reconciliation & Invoicing",
      legacy: "Manual MT103 tracking, missing remitter metadata, endless email threads",
      tradePe: "ISO 20022 rich payload with automated ERP ledger sync",
    },
    {
      feature: "Weekend & Holiday Availability",
      legacy: "Stalls entirely on banking holidays and weekend cutoff windows",
      tradePe: "100% autonomous 24/7 liquidity routing across all 40+ corridors",
    },
    {
      feature: "Developer Integration",
      legacy: "Batch SFTP files and legacy SWIFT FIN MT messages",
      tradePe: "Modern REST / GraphQL API, Webhooks, SDKs with sandbox simulation",
    },
  ];

  return (
    <section id="architecture" className="relative bg-white text-[#0A0A0A] py-24 md:py-32 border-t border-black/10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-[#FF4D1C] mb-4 font-bold">
            ✦ INFRASTRUCTURE COMPARISON
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4">
            Why legacy banking is <span className="font-italic-accent text-[#FF4D1C]">obsolete</span>
          </h2>
          <p className="font-sans text-base text-[#0A0A0A]/70">
            A side-by-side architectural audit between 1970s correspondent banking and <TradePeWordmark /> modern direct clearing rails.
          </p>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="rounded-3xl bg-[#FAFAFA] border border-black/15 overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-black/10 bg-black/5 p-4 sm:p-6 text-xs uppercase font-mono font-bold tracking-wider">
            <div className="md:col-span-4 text-[#0A0A0A]/70">Evaluation Parameter</div>
            <div className="md:col-span-4 text-[#0A0A0A]/50 mt-2 md:mt-0">Legacy Correspondent Banking</div>
            <div className="md:col-span-4 text-[#FF4D1C] mt-2 md:mt-0 flex items-center gap-1.5">
              <span><TradePeWordmark /> Direct Rails</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D1C] animate-pulse" />
            </div>
          </div>

          <div className="divide-y divide-black/10">
            {comparisons.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 text-sm gap-4 items-center hover:bg-black/[0.02] transition-colors"
              >
                <div className="md:col-span-4 font-display font-bold text-[#0A0A0A] text-base">
                  {row.feature}
                </div>

                <div className="md:col-span-4 flex items-start gap-2.5 text-[#0A0A0A]/60 text-xs sm:text-sm">
                  <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{row.legacy}</span>
                </div>

                <div className="md:col-span-4 flex items-start gap-2.5 text-[#0A0A0A] text-xs sm:text-sm">
                  <Check className="h-4 w-4 text-[#FF4D1C] shrink-0 mt-0.5" />
                  <span className="font-semibold">{row.tradePe}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer of Matrix */}
          <div className="p-6 sm:p-8 bg-black/5 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Server className="h-5 w-5 text-[#FF4D1C]" />
              <span className="font-sans text-xs text-[#0A0A0A]/75 font-medium">
                Ready to deprecate legacy SWIFT files? Access our unified API sandbox today.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
