"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Building, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { TradePeWordmark } from "@/components/TradePeWordmark";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Treasury Rails Inquiry",
    company: "",
    volume: "$1M - $10M / mo",
    corridors: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#0A0A0A] selection:bg-[#FF4D1C] selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-black/10 py-4 px-4 sm:px-6 lg:px-8 bg-[#F7F4EF]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Header */}
        <div className="mb-8 border-b border-black/10 pb-4">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-2">
            Contact <TradePeWordmark />
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#0A0A0A]/70 max-w-2xl">
            Get in touch with our liquidity desk, regulatory engineers, or executive treasury leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-[#F8F5EE] border border-black/10 p-6 sm:p-7 space-y-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)]">
              <div className="space-y-1">
                <span className="font-sans text-xs uppercase tracking-widest font-bold text-[#FF4D1C]">
                  Corporate Headquarters
                </span>
                <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
                  <TradePeWordmark /> Tech Pvt. Ltd.
                </h2>
                <p className="font-display text-sm text-[#0A0A0A]/70 italic">
                  India&apos;s 1st Neobank for Global Trade
                </p>
              </div>

              <div className="space-y-3.5 pt-1 text-sm text-[#0A0A0A]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#FF4D1C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#0A0A0A]">Registered Office:</strong>
                    <span>61, Mittal Chambers, Nariman Point, Mumbai, Maharashtra, India - 400021</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#FF4D1C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#0A0A0A]">Email Inquiries:</strong>
                    <a
                      href="mailto:contactus@tradepe.com"
                      className="font-mono text-[#0A0A0A] hover:text-[#FF4D1C] transition-colors"
                    >
                      contactus@tradepe.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#FF4D1C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#0A0A0A]">Telephone &amp; Desk:</strong>
                    <a
                      href="tel:+918433708529"
                      className="font-mono text-[#0A0A0A] hover:text-[#FF4D1C] transition-colors"
                    >
                      +91 8433708529
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/10 pt-3.5 text-xs font-mono text-[#0A0A0A]/60 space-y-1">
                <div>Corporate CIN: U72900MH2024PTC123456</div>
                <div>Hours: 24/7/365 Continuous Clearing Support</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#F8F5EE] border border-black/10 p-6 sm:p-7 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.04)]">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-1">
                    Send a Message to <span className="font-italic-accent text-[#FF4D1C]">Support</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Aditya Birla"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="treasury@enterprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1">
                        Company Entity Name
                      </label>
                      <input
                        type="text"
                        placeholder="Apex Exports Ltd."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1">
                        Monthly Cross-Border Volume
                      </label>
                      <select
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                      >
                        <option value="Under $500K / mo">&lt; $500,000 / month</option>
                        <option value="$500K - $1M / mo">$500,000 - $1,000,000 / month</option>
                        <option value="$1M - $10M / mo">$1,000,000 - $10,000,000 / month</option>
                        <option value="$10M+ / mo">$10,000,000+ / month (Enterprise)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                      >
                        <option value="Treasury Rails Inquiry">Treasury Rails &amp; Corridors</option>
                        <option value="API Integration & Sandbox">API Integration &amp; Sandbox</option>
                        <option value="Compliance & KYB Underwriting">Compliance &amp; KYB</option>
                        <option value="Partner Banks & Liquidity">Partner Banks &amp; Liquidity</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1">
                      Message Details
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Please specify your corridor requirements, monthly cross-border volume, or integration questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl bg-black/5 border border-black/15 px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-full bg-[#0A0A0A] hover:bg-[#222222] text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md active:scale-[0.99] cursor-pointer"
                  >
                    <span>Dispatch Inquiry to Treasury Desk</span>
                    <Send className="h-4 w-4 text-[#FF4D1C]" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FF4D1C]/15 text-[#FF4D1C]">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0A0A0A]">
                    Message <span className="font-italic-accent text-[#FF4D1C]">Received</span>
                  </h3>
                  <p className="font-sans text-sm text-[#0A0A0A]/70 max-w-md mx-auto">
                    Thank you, {formData.name || "there"}. A dedicated <TradePeWordmark /> liquidity specialist will respond to <strong>{formData.email}</strong> within 2 hours.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="py-2 px-5 rounded-full border border-black/15 bg-transparent hover:border-black/40 hover:bg-black/5 text-[#0A0A0A] font-sans text-xs font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
