import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { TradePeWordmark } from "@/components/TradePeWordmark";

export const metadata: Metadata = {
  title: "Privacy Policy — TradePe Tech Pvt. Ltd.",
  description: "Privacy policy and data governance practices of TradePe Tech Pvt. Ltd. governing institutional cross-border trade information.",
};

export default function PrivacyPolicyPage() {
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
            <span>Back to <TradePeWordmark /></span>
          </Link>
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <TradePeWordmark />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-12 border-b border-black/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-[#FF4D1C] font-bold mb-4">
            <Lock className="h-3.5 w-3.5" />
            <span>DATA GOVERNANCE // TRADEPE TECH PVT. LTD.</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4">
            Privacy <span className="font-italic-accent text-[#FF4D1C]">Policy</span>
          </h1>
          <p className="font-sans text-sm text-[#0A0A0A]/60">
            Effective Date: January 1, 2026 · <TradePeWordmark /> Tech Pvt. Ltd., 61, Mittal Chambers, Nariman Point, Mumbai 400021
          </p>
        </div>

        <div className="space-y-10 font-sans text-sm sm:text-base text-[#0A0A0A]/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              1. Information Collection &amp; KYB Data
            </h2>
            <p>
              <TradePeWordmark /> Tech Pvt. Ltd. collects institutional corporate information including Certificate of Incorporation, Goods &amp; Services Tax Identification Number (GSTIN), Importer Exporter Code (IEC), Legal Entity Identifier (LEI), director KYC, and transactional invoices necessary to fulfill statutory anti-money laundering and FEMA regulatory mandates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              2. Purpose of Processing
            </h2>
            <p>
              We process corporate and transaction data strictly for:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-[#0A0A0A]/75">
              <li>Executing real-time multi-currency settlement instructions.</li>
              <li>Performing automated dual-use goods and sanctions screening.</li>
              <li>Generating regulatory documentation (such as Form A2, EDPMS/IDPMS, and customs declarations).</li>
              <li>Preventing unauthorized fraudulent intrusions and cyber risks.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              3. Data Security &amp; Encryption Standards
            </h2>
            <p>
              All payload data is protected using AES-256 encryption at rest and TLS 1.3 in transit. Our cryptographic systems adhere to SOC 2 Type II, ISO 27001, and PCI-DSS Level 1 compliance specifications. Multi-party computation (MPC) prevents single points of credential compromise.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              4. Contact the Data Protection Officer
            </h2>
            <p>
              For privacy inquiries, audit reports, or data subject requests, please contact our Data Protection Office at:
            </p>
            <div className="p-4 rounded-xl bg-[#FAFAFA] border border-black/10 font-mono text-xs text-[#0A0A0A] space-y-1">
              <div>Email: <strong>contactus@tradepe.com</strong></div>
              <div>Address: 61, Mittal Chambers, Nariman Point, Mumbai, Maharashtra 400021</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
