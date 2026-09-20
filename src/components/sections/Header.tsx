"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Activity } from "lucide-react";
import { useSmoothScroll, useLenis } from "@/components/ui/SmoothScroll";
import { cn } from "@/lib/utils";

import { TradePeWordmark } from "@/components/TradePeWordmark";

interface HeaderProps {
  onRequestAccess?: () => void;
}

export function Header({ onRequestAccess }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Why Us", href: "#pillars" },
    { name: "Simulator", href: "#simulator" },
    { name: "FAQ's", href: "#faq" },
    { name: "Contact Us", href: "#footer" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === "/") {
      if (lenis) {
        lenis.scrollTo(0, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (href.startsWith("#")) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        if (lenis) {
          lenis.scrollTo(href, {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            offset: -80,
          });
        } else {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[#F7F4EF]/90 backdrop-blur-md border-b border-black/10 py-3.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
            : "bg-transparent py-5 md:py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* 1. Brand Logo: TradePe (smooth-scrolls to top of page) */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center group cursor-pointer"
            aria-label="TradePe Home"
          >
            <span className="font-display text-2xl font-bold tracking-tight">
              <TradePeWordmark />
            </span>
          </a>

          {/* 2. Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-black/10 bg-[#F7F4EF]/85 px-5 py-2 backdrop-blur-md shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#0A0A0A]/70 hover:text-[#FF4D1C] transition-colors rounded-full cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* 3. Right Actions: Login & Get Started (Desktop -> /404) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/404"
              className="text-xs px-4 py-2 font-medium text-[#0A0A0A] rounded-full border border-black/15 bg-transparent hover:border-black/40 hover:bg-black/5 hover:text-[#0A0A0A] transition-all duration-200 active:scale-[0.98]"
            >
              <span>Login</span>
            </Link>

            <Link
              href="/404"
              className="text-xs px-4 py-2 font-medium text-white bg-[#FF4D1C] rounded-full inline-flex items-center gap-1.5 hover:bg-[#E03D0F] hover:shadow-xs transition-all duration-200 active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle & CTA */}
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              href="/404"
              className="px-2.5 py-1 text-xs font-medium text-[#0A0A0A] rounded-full border border-black/15 hover:bg-black/5 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/404"
              className="px-3 py-1 text-xs font-medium text-white bg-[#FF4D1C] rounded-full hover:bg-[#E03D0F] transition-colors"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0A0A0A] hover:text-[#FF4D1C] rounded-lg bg-black/5 border border-black/10 cursor-pointer"
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
            className="fixed inset-x-0 top-[65px] z-30 bg-[#F7F4EF]/98 border-b border-black/15 px-6 py-8 backdrop-blur-xl shadow-xl sm:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-display text-xl font-bold text-[#0A0A0A] hover:text-[#FF4D1C] transition-colors py-2 border-b border-black/5 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#0A0A0A]/70">
                  <Activity className="h-4 w-4 text-[#FF4D1C]" />
                  <span>Settlement Latency: &lt; 0.04s</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    href="/404"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center py-2.5 px-4 text-xs font-medium text-[#0A0A0A] rounded-full border border-black/20 hover:bg-black/5 transition-colors"
                  >
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/404"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-medium text-white bg-[#FF4D1C] rounded-full hover:bg-[#E03D0F] transition-colors"
                  >
                    <span>Get Started</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
