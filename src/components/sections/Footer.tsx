"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Building } from "lucide-react";

interface FooterProps {
  onRequestAccess?: () => void;
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function Footer({}: FooterProps) {
  return (
    <footer className="relative bg-[#FAFAFA] text-[#0A0A0A] border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        
        {/* Part 1: Headline & Kinetic CTA Typography */}
        <div className="text-center pb-6 sm:pb-8">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] max-w-2xl mx-auto">
            Step into next-generation multi-currency liquidity.
          </h2>

          <div className="py-2 sm:py-4">
            <span className="font-italic-accent text-[#FF4D1C] text-[clamp(4.5rem,18vw,14rem)] leading-[0.88] tracking-tight block select-none hover:text-[#ff6b42] transition-colors duration-300">
              Transact.
            </span>
          </div>
        </div>

        {/* Part 2: Main Footer Directory */}
        <div className="pt-4 sm:pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          
          {/* Company & Address Column (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <Link href="/" className="inline-block group">
              <span className="font-display text-2xl font-bold tracking-tight text-[#0A0A0A]">
                Trade<span className="font-italic-accent text-[#FF4D1C]">Pe</span>
              </span>
            </Link>

            <div className="space-y-0.5">
              <p className="font-display text-base sm:text-lg font-bold text-[#0A0A0A]">
                India&apos;s 1st Neobank for Global Trade
              </p>
              <p className="font-sans text-sm font-semibold text-[#0A0A0A]/80 flex items-center gap-1.5">
                <Building className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                TradePe Tech Pvt. Ltd.
              </p>
            </div>

            <div className="flex items-start gap-2 text-xs sm:text-sm text-[#0A0A0A]/70 leading-relaxed max-w-sm">
              <MapPin className="h-4 w-4 text-[#FF4D1C] shrink-0 mt-0.5" />
              <span>61, Mittal Chambers, Nariman Point, Mumbai, Maharashtra, India- 400021</span>
            </div>
          </div>

          {/* Legal Column (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="font-sans text-xs font-bold uppercase tracking-widest text-[#0A0A0A]">
              Legal
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#0A0A0A]/75">
              <li>
                <Link href="/terms-conditions" className="hover:text-[#FF4D1C] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#FF4D1C] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-[#FF4D1C] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/grievance-policy" className="hover:text-[#FF4D1C] transition-colors">
                  Grievance Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Column (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="font-sans text-xs font-bold uppercase tracking-widest text-[#0A0A0A]">
              Contact Us
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#0A0A0A]/75">
              <li>
                <Link href="/contact" className="hover:text-[#FF4D1C] transition-colors font-medium">
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
              <li>
                <a
                  href="https://in.linkedin.com/company/treq-tradepetech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4D1C] transition-colors flex items-center gap-2 font-mono"
                >
                  <LinkedInIcon className="h-4 w-4 text-[#FF4D1C] shrink-0" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Part 3: Centered Copyright */}
        <div className="mt-8 pt-4 text-center text-xs text-[#0A0A0A]/60">
          © 2026 TradePe Tech Pvt. Ltd.
        </div>

      </div>
    </footer>
  );
}
