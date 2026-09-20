import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { TradePeWordmark } from "@/components/TradePeWordmark";

export const metadata: Metadata = {
  title: "Grievance Policy & Redressal Mechanism — TradePe Tech Pvt. Ltd.",
  description: "Customer grievance redressal mechanism and nodal officer escalation details for TradePe Tech Pvt. Ltd.",
};

export default function GrievancePolicyPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#0A0A0A] selection:bg-[#FF4D1C] selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-black/10 py-4 px-4 sm:px-6 lg:px-8 bg-[#F7F4EF]/90 backdrop-blur-md sticky top-0 z-30">
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-6 border-b border-black/10 pb-4">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-2">
            Grievance <span className="font-italic-accent text-[#FF4D1C]">Policy</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#0A0A0A]/60">
            <TradePeWordmark /> Tech Pvt. Ltd. · 61, Mittal Chambers, Nariman Point, Mumbai, Maharashtra, India - 400021
          </p>
        </div>

        <div className="space-y-6 font-sans text-sm sm:text-base text-[#0A0A0A]/80 leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              1. Redressal Philosophy &amp; Commitment
            </h2>
            <p>
              <TradePeWordmark /> Tech Pvt. Ltd. is dedicated to transparent, rapid resolution of all corporate treasury and cross-border settlement grievances. Our multi-tiered grievance escalation protocol ensures issues are addressed with deterministic turnaround times.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              2. Escalation Matrix
            </h2>
            
            <div className="space-y-3 pt-1">
              {/* Level 1 */}
              <div className="rounded-2xl bg-[#F8F5EE] border border-black/10 p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#FF4D1C] uppercase">Level 1 — Primary Support Desk</span>
                  <span className="font-mono text-xs text-[#0A0A0A]/50 font-semibold">TAT: 4 Hours</span>
                </div>
                <p className="text-xs sm:text-sm text-[#0A0A0A]/80">
                  Contact your assigned treasury manager or email our 24/7 technical desk with your Transaction ID.
                </p>
                <div className="font-mono text-xs text-[#0A0A0A]">
                  Email: <strong>contactus@tradepe.com</strong> · Phone: <strong>+91 8433708529</strong>
                </div>
              </div>

              {/* Level 2 */}
              <div className="rounded-2xl bg-[#F8F5EE] border border-black/10 p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#FF4D1C] uppercase">Level 2 — Principal Grievance Officer</span>
                  <span className="font-mono text-xs text-[#0A0A0A]/50 font-semibold">TAT: 24 Hours</span>
                </div>
                <p className="text-xs sm:text-sm text-[#0A0A0A]/80">
                  If the resolution at Level 1 is unsatisfactory within 24 hours, escalate directly to the Nodal Grievance Officer.
                </p>
                <div className="font-mono text-xs text-[#0A0A0A] space-y-0.5">
                  <div>Officer Name: <strong>Grievance Redressal Desk</strong></div>
                  <div>Address: <strong>61, Mittal Chambers, Nariman Point, Mumbai, Maharashtra 400021</strong></div>
                  <div>Email: <strong>contactus@tradepe.com</strong></div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              3. Resolution Timeframes
            </h2>
            <p>
              Standard settlement discrepancies or API payload queries are resolved within 4 to 24 business hours. Complex regulatory or customs reconciliation items will be acknowledged within 2 hours with daily status reports.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
