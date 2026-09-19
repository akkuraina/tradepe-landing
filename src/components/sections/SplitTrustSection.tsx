"use client";

import { ShieldCheck, Lock, Landmark, CheckCircle, Scale, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface SplitTrustSectionProps {
  onRequestAccess: () => void;
}

export function SplitTrustSection({ onRequestAccess }: SplitTrustSectionProps) {
  const trustCards = [
    {
      icon: Landmark,
      tag: "LIQUIDITY NETWORKS",
      title: "Tier-1 Correspondent Replacement Mesh",
      description:
        "Direct pre-funded liquidity buffers and bilateral clearing agreements with regulated banking institutions across North America, Europe, MENA, and APAC.",
      points: [
        "Zero exposure to intermediary bank freezes",
        "Deterministic exchange rate lock for 120 seconds",
        "Deep multi-million dollar single-ticket capacity",
      ],
    },
    {
      icon: ShieldCheck,
      tag: "COMPLIANCE & AUDIT",
      title: "SOC 2 Type II & ISO 27001 Certified",
      description:
        "Every line of routing code and settlement ledger is continuously audited by top-tier independent cybersecurity and financial compliance firms.",
      points: [
        "Continuous automated vulnerability assessments",
        "End-to-end payload encryption in transit and at rest",
        "Strict role-based access control (RBAC) & dual authorization",
      ],
    },
    {
      icon: Lock,
      tag: "SECURITY VAULTS",
      title: "Institutional MPC Key Architecture",
      description:
        "Multi-Party Computation (MPC) eliminates single private key vulnerabilities. Transaction signing shards are distributed across geographically isolated HSMs.",
      points: [
        "No single operator can unilaterally redirect capital",
        "Programmable velocity limits and threshold signing",
        "Hardware Security Module (HSM) FIPS 140-2 Level 3 verified",
      ],
    },
    {
      icon: Scale,
      tag: "REGULATORY ALIGNMENT",
      title: "Global Jurisdictional Adherence",
      description:
        "Compliant with FinCEN (US), MAS (Singapore), RBI/FEMA (India), FCA (UK), and EU PSD2 cross-border standards.",
      points: [
        "Automated Form A2 / LRS / EDPMS IRM export filings",
        "Real-time sanctions screening against OFAC, UN & EU lists",
        "Zero-delay automated travel rule data compliance",
      ],
    },
  ];

  return (
    <section id="trust" className="relative bg-white text-[#0A0A0A] py-24 md:py-36 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Fixed / Sticky Statement (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A0A0A] leading-[1.08]">
              Engineered for institutional grade <span className="font-italic-accent text-[#FF4D1C]">resilience.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#0A0A0A]/75 leading-relaxed">
              Global enterprises trust TradePe to move mission-critical trade volume with zero downtime, zero counterparty risk, and airtight regulatory adherence.
            </p>

            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#0A0A0A]/85">
                <CheckCircle className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                <span className="font-medium">$0 Unreconciled Transaction Loss Record</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#0A0A0A]/85">
                <CheckCircle className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                <span className="font-medium">99.999% Core API Availability SLA</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#0A0A0A]/85">
                <CheckCircle className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                <span className="font-medium">24/7 Dedicated Treasury Desk & Key Account Engineers</span>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Compliance & Partner Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {trustCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-[#FAFAFA] border border-black/15 p-6 sm:p-8 space-y-5 shadow-sm hover:border-black/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#FF4D1C]/15 border border-[#FF4D1C]/30 flex items-center justify-center text-[#FF4D1C]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF4D1C]">
                        {card.tag}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#0A0A0A]/40 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#0A0A0A]">
                    {card.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#0A0A0A]/75 leading-relaxed">
                    {card.description}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-black/10 text-xs sm:text-sm text-[#0A0A0A]/85">
                    {card.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D1C]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
