import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — TradePe Tech Pvt. Ltd.",
  description: "Terms and conditions governing the use of TradePe global trade clearing and multi-currency settlement rails.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] selection:bg-[#FF4D1C] selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-black/10 py-6 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#FF4D1C] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to TradePe</span>
          </Link>
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            Trade<span className="font-italic-accent text-[#FF4D1C]">Pe</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-12 border-b border-black/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-[#FF4D1C] font-bold mb-4">
            <Scale className="h-3.5 w-3.5" />
            <span>LEGAL AGREEMENT // TRADEPE TECH PVT. LTD.</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4">
            Terms of <span className="font-italic-accent text-[#FF4D1C]">Service</span>
          </h1>
          <p className="font-sans text-sm text-[#0A0A0A]/60">
            Last Updated: January 15, 2026 · Registered Office: 61, Mittal Chambers, Nariman Point, Mumbai, Maharashtra, India - 400021
          </p>
        </div>

        <div className="space-y-10 font-sans text-sm sm:text-base text-[#0A0A0A]/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              1. Master Services &amp; Platform Scope
            </h2>
            <p>
              These Terms of Service (&quot;Agreement&quot;) govern access to and usage of the cross-border trade settlement infrastructure, direct clearing corridors, APIs, and multi-currency liquidity rails operated by <strong>TradePe Tech Pvt. Ltd.</strong> (&quot;TradePe&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
            </p>
            <p>
              By accessing our platform, integrating our APIs, or submitting an onboarding dossier, your enterprise entity agrees to be bound by these Terms, applicable Reserve Bank of India (RBI) Foreign Exchange Management Act (FEMA) regulations, and international AML/CFT directives.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              2. Corporate Eligibility &amp; Autonomous Underwriting
            </h2>
            <p>
              Services are exclusively available to legally incorporated commercial enterprises, financial institutions, and authorized exporters/importers. All participants must undergo Know-Your-Business (KYB) verification, Ultimate Beneficial Owner (UBO) screening, and real-time sanction checks against UN, OFAC, and EU databases prior to gateway activation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              3. Direct Settlement Rails &amp; Atomic Routing
            </h2>
            <p>
              TradePe facilitates real-time instruction routing across domestic instant clearing systems (including RTGS, FedNow, SEPA Instant, Pix, and FAST). We provide deterministic conversion rates and direct-clearing status telemetry. TradePe does not operate as a speculative deposit-taking institution; funds are routed via regulated partner settlement banks and segregated escrow buffers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              4. Fees, Foreign Exchange &amp; Transparency
            </h2>
            <p>
              Foreign exchange conversion occurs at transparent institutional spot rates with agreed basis-point processing fees. Zero unannounced correspondent banking cable deductions or intermediary processing charges will be levied on authorized transaction payloads.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              5. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              This Agreement shall be governed by and construed in accordance with the substantive laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
