"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Activity } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onRequestAccess: () => void;
}

export function Header({ onRequestAccess }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Pillars", href: "#pillars" },
    { name: "Live Simulator", href: "#simulator" },
    { name: "Architecture", href: "#architecture" },
    { name: "Institutional Trust", href: "#trust" },
    { name: "Metrics", href: "#metrics" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-black/10 py-3.5 shadow-sm"
            : "bg-transparent py-5 md:py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="TradePe Home"
          >
            <div className="h-8 w-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center text-white font-display font-black text-lg group-hover:bg-[#FF4D1C] transition-colors duration-300">
              T
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-[#0A0A0A]">
              Trade<span className="font-italic-accent text-[#FF4D1C]">Pe</span>
            </span>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-black/10 bg-white/80 px-5 py-2 backdrop-blur-md shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#0A0A0A]/70 hover:text-[#FF4D1C] transition-colors rounded-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action & Status */}
          <div className="hidden sm:flex items-center gap-4">

            <MagneticButton
              variant="primary"
              size="sm"
              onClick={onRequestAccess}
              dataCursorText="Join"
            >
              <span>Request Access</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            <MagneticButton
              variant="primary"
              size="sm"
              onClick={onRequestAccess}
              className="px-3 py-1.5 text-xs"
            >
              Access
            </MagneticButton>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0A0A0A] hover:text-[#FF4D1C] rounded-lg bg-black/5 border border-black/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-[#0A0A0A]" />
              ) : (
                <Menu className="h-5 w-5 text-[#0A0A0A]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-30 bg-white/95 border-b border-black/15 px-6 py-8 backdrop-blur-xl shadow-xl sm:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-xl font-bold text-[#0A0A0A] hover:text-[#FF4D1C] transition-colors py-2 border-b border-black/5"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#0A0A0A]/70">
                  <Activity className="h-4 w-4 text-[#FF4D1C]" />
                  <span>Settlement Latency: &lt; 0.04s</span>
                </div>
                <MagneticButton
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onRequestAccess();
                  }}
                  className="w-full justify-center"
                >
                  <span>Request Institutional Access</span>
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
