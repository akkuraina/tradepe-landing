"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Treasury Rails Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] selection:bg-[#FF4D1C] selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-black/10 py-6 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Header */}
        <div className="mb-14 border-b border-black/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-[#FF4D1C] font-bold mb-4">
            ✦ INSTITUTIONAL SUPPORT DESK
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0A0A0A] mb-3">
            Contact <span className="font-italic-accent text-[#FF4D1C]">TradePe</span>
          </h1>
          <p className="font-sans text-base text-[#0A0A0A]/70 max-w-2xl">
            Get in touch with our liquidity desk, regulatory engineers, or executive treasury leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Official Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl bg-[#FAFAFA] border border-black/15 p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <span className="font-sans text-xs uppercase tracking-widest font-bold text-[#FF4D1C]">
                  Corporate Headquarters
                </span>
                <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">
                  TradePe Tech Pvt. Ltd.
                </h2>
                <p className="font-display text-sm text-[#0A0A0A]/70 italic">
                  India&apos;s 1st Neobank for Global Trade
                </p>
              </div>

              <div className="space-y-4 pt-2 text-sm text-[#0A0A0A]/80">
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

              <div className="border-t border-black/10 pt-4 text-xs font-mono text-[#0A0A0A]/60 space-y-1">
                <div>Corporate CIN: U72900MH2024PTC123456</div>
                <div>Hours: 24/7/365 Continuous Clearing Support</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-black/15 p-8 sm:p-10 shadow-lg">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-2xl font-bold text-[#0A0A0A] mb-2">
                    Send a Message to <span className="font-italic-accent text-[#FF4D1C]">Support</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Aditya Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-4 py-3 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1.5">
                        Corporate Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="aditya@enterprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-4 py-3 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-4 py-3 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1.5">
                        Inquiry Scope
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-4 py-3 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                      >
                        <option value="Treasury Rails Inquiry">Treasury Rails &amp; Corridors</option>
                        <option value="API Integration & Sandbox">API Integration &amp; Sandbox</option>
                        <option value="Compliance & KYB Underwriting">Compliance &amp; KYB</option>
                        <option value="Partner Banks & Liquidity">Partner Banks &amp; Liquidity</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1.5">
                      Message Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please specify your corridor requirements, monthly cross-border volume, or integration questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl bg-black/5 border border-black/15 px-4 py-3 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                  >
                    <span>Dispatch Inquiry to Treasury Desk</span>
                    <Send className="h-4 w-4" />
                  </MagneticButton>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FF4D1C]/15 text-[#FF4D1C]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-[#0A0A0A]">
                    Message <span className="font-italic-accent text-[#FF4D1C]">Received</span>
                  </h3>
                  <p className="font-sans text-sm text-[#0A0A0A]/70 max-w-md mx-auto">
                    Thank you, {formData.name || "there"}. A dedicated TradePe liquidity specialist will respond to <strong>{formData.email}</strong> within 2 hours.
                  </p>
                  <div className="pt-4">
                    <MagneticButton
                      onClick={() => setSubmitted(false)}
                      variant="dark"
                      size="sm"
                    >
                      Send Another Message
                    </MagneticButton>
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
