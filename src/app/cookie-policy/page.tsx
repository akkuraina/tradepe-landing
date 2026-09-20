import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";
import { TradePeWordmark } from "@/components/TradePeWordmark";

export const metadata: Metadata = {
  title: "Cookie Policy — TradePe Tech Pvt. Ltd.",
  description: "Cookie and tracking technologies governance policy of TradePe Tech Pvt. Ltd.",
};

export default function CookiePolicyPage() {
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
            Cookie <span className="font-italic-accent text-[#FF4D1C]">Policy</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#0A0A0A]/60">
            <TradePeWordmark /> Tech Pvt. Ltd. · 61, Mittal Chambers, Nariman Point, Mumbai 400021
          </p>
        </div>

        <div className="space-y-6 font-sans text-sm sm:text-base text-[#0A0A0A]/80 leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              1. What Are Cookies
            </h2>
            <p>
              Cookies and local storage identifiers are small data packets placed on your browser or device when accessing the <TradePeWordmark /> portal, API console, or website. They enable secure session management, prevent cross-site request forgery (CSRF), and maintain authentication tokens.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              2. Categories of Cookies We Use
            </h2>
            <div className="space-y-2.5 pt-1">
              <div className="p-3.5 rounded-xl bg-[#F8F5EE] border border-black/10">
                <div className="font-display font-bold text-[#0A0A0A]">Strictly Necessary Cookies</div>
                <div className="text-xs text-[#0A0A0A]/70 mt-0.5">Required for authentication, session verification, and API sandbox security. Cannot be disabled.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8F5EE] border border-black/10">
                <div className="font-display font-bold text-[#0A0A0A]">Performance &amp; Telemetry Cookies</div>
                <div className="text-xs text-[#0A0A0A]/70 mt-0.5">Measures page load speeds, WebGL rendering framerates, and corridor latency telemetry.</div>
              </div>
            </div>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
              3. Managing Preferences
            </h2>
            <p>
              You can control or disable non-essential cookies via your browser settings. However, disabling strictly necessary cookies may impede gateway authentication and API playground functionality.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
