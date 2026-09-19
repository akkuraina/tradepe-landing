"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin, Building } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface FooterProps {
  onRequestAccess: () => void;
}

export function Footer({ onRequestAccess }: FooterProps) {
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().split(" ").slice(4, 5)[0] + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#FAFAFA] text-[#0A0A0A] border-t border-black/10 overflow-hidden">
      
      {/* Massive Closing CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-[#FF4D1C] mb-6 font-bold">
          ✦ SCALE GLOBAL COMMERCE
        </div>

        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-2 max-w-2xl mx-auto">
          Step into next-generation multi-currency liquidity.
        </h2>

        {/* The One Giant Italic-Orange Word Requirement */}
        <div className="py-6 sm:py-10">
          <span className="font-italic-accent text-[#FF4D1C] text-[clamp(4.5rem,19vw,15rem)] leading-[0.88] tracking-tight block select-none hover:text-[#ff6b42] transition-colors duration-300">
            Transact.
          </span>
        </div>

        {/* Magnetic Button directly beneath */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <MagneticButton
            variant="primary"
            size="xl"
            onClick={onRequestAccess}
            dataCursorText="Access"
            className="text-base sm:text-lg px-10 py-5"
          >
            <span>Request Institutional Rails</span>
            <ArrowRight className="h-5 w-5" />
          </MagneticButton>

          <MagneticButton
            variant="dark"
            size="xl"
            href="#simulator"
            dataCursorText="Simulate"
            className="text-base sm:text-lg px-8 py-5"
          >
            <span>Explore Simulator</span>
          </MagneticButton>
        </div>
      </div>

      {/* Footer Details & Navigation */}
      <div className="border-t border-black/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Company & Address Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="h-8 w-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center text-white font-display font-black text-lg group-hover:bg-[#FF4D1C] transition-colors duration-300">
                  T
                </div>
                <span className="font-display text-2xl font-bold tracking-tight text-[#0A0A0A]">
                  Trade<span className="font-italic-accent text-[#FF4D1C]">Pe</span>
                </span>
              </Link>

              <div className="space-y-1">
                <p className="font-display text-lg font-bold text-[#0A0A0A]">
                  India&apos;s 1st Neobank for Global Trade
                </p>
                <p className="font-sans text-sm font-semibold text-[#0A0A0A]/80 flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                  TradePe Tech Pvt. Ltd.
                </p>
              </div>

              <div className="flex items-start gap-2 text-xs sm:text-sm text-[#0A0A0A]/70 leading-relaxed pt-1 max-w-sm">
                <MapPin className="h-4 w-4 text-[#FF4D1C] shrink-0 mt-0.5" />
                <span>61, Mittal Chambers, Nariman Point, Mumbai, Maharashtra, India- 400021</span>
              </div>
            </div>

            {/* Legal Column (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <div className="font-sans text-xs font-bold uppercase tracking-widest text-[#0A0A0A]">
                Legal
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#0A0A0A]/70">
                <li>
                  <Link href="/terms-conditions" className="hover:text-[#FF4D1C] transition-colors flex items-center gap-1.5">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-[#FF4D1C] transition-colors flex items-center gap-1.5">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="hover:text-[#FF4D1C] transition-colors flex items-center gap-1.5">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/grievance-policy" className="hover:text-[#FF4D1C] transition-colors flex items-center gap-1.5">
                    Grievance Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us Column (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="font-sans text-xs font-bold uppercase tracking-widest text-[#0A0A0A]">
                Contact Us
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#0A0A0A]/70">
                <li>
                  <Link href="/contact" className="hover:text-[#FF4D1C] transition-colors flex items-center gap-1.5 font-medium">
                    Support Desk &amp; Inquiries
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:contactus@tradepe.com"
                    className="hover:text-[#FF4D1C] transition-colors flex items-center gap-2 font-mono"
                  >
                    <Mail className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                    contactus@tradepe.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+918433708529"
                    className="hover:text-[#FF4D1C] transition-colors flex items-center gap-2 font-mono"
                  >
                    <Phone className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                    +91 8433708529
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="mt-12 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0A0A0A]/60">
            <div>
              © 2026 TradePe Tech Pvt. Ltd.
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span>Security Audited</span>
              <span>•</span>
              <span>ISO 20022 Native</span>
              <span>•</span>
              <span className="text-[#FF4D1C] font-semibold">Direct RTGS &amp; FedNow Rail SLA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
