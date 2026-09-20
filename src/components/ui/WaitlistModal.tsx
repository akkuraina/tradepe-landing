"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, Globe2, Mail } from "lucide-react";
import confetti from "canvas-confetti";
import { TradePeWordmark } from "@/components/TradePeWordmark";
import { MagneticButton } from "./MagneticButton";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCorridor?: string;
}

export function WaitlistModal({
  open,
  onOpenChange,
  defaultCorridor = "USD / INR",
}: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [volume, setVolume] = useState("$1M - $10M / mo");
  const [corridor, setCorridor] = useState(defaultCorridor);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [queueNumber, setQueueNumber] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const randomRank = Math.floor(Math.random() * 40) + 12;
      setQueueNumber(randomRank);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FF4D1C", "#0A0A0A", "#FAFAFA"],
        });
      } catch {
        // Safe fallback
      }
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail("");
    setCompany("");
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[94vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#F8F5EE] border border-black/10 p-6 md:p-8 shadow-2xl focus:outline-none animate-in zoom-in-95 duration-200 text-[#0A0A0A]">
          {/* Close button */}
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-full p-2 text-[#0A0A0A]/50 hover:bg-black/5 hover:text-[#0A0A0A] transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>

          {!isSubmitted ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-[#FF4D1C] animate-pulse" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#FF4D1C]">
                  Institutional Sandbox Access
                </span>
              </div>

              <Dialog.Title className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#0A0A0A] mb-2">
                Request <TradePeWordmark /> <span className="font-italic-accent">clearing</span> access
              </Dialog.Title>

              <Dialog.Description className="font-sans text-sm text-[#0A0A0A]/70 mb-6 leading-relaxed">
                Connect your multi-currency liquidity accounts with zero correspondent hops. Deploy sub-second settlements in 40+ global corridors.
              </Dialog.Description>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="work-email"
                    className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1.5"
                  >
                    Corporate Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0A0A0A]/40" />
                    <input
                      id="work-email"
                      type="email"
                      required
                      placeholder="treasury@enterprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-black/5 border border-black/15 px-10 py-3 text-sm text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="company-name"
                      className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1.5"
                    >
                      Company Entity
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0A0A0A]/40" />
                      <input
                        id="company-name"
                        type="text"
                        required
                        placeholder="Apex Trading Corp"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-10 py-3 text-sm text-[#0A0A0A] placeholder:text-[#0A0A0A]/40 focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="primary-corridor"
                      className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1.5"
                    >
                      Primary Route
                    </label>
                    <div className="relative">
                      <Globe2 className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0A0A0A]/40" />
                      <select
                        id="primary-corridor"
                        value={corridor}
                        onChange={(e) => setCorridor(e.target.value)}
                        className="w-full rounded-xl bg-black/5 border border-black/15 px-10 py-3 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="USD / INR" className="bg-white text-[#0A0A0A]">USD / INR (Direct RTGS)</option>
                        <option value="EUR / SGD" className="bg-white text-[#0A0A0A]">EUR / SGD (Fast T-0)</option>
                        <option value="AED / INR" className="bg-white text-[#0A0A0A]">AED / INR (Instant Local)</option>
                        <option value="GBP / USD" className="bg-white text-[#0A0A0A]">GBP / USD (Direct Clearing)</option>
                        <option value="USD / BRL" className="bg-white text-[#0A0A0A]">USD / BRL (Pix Direct)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="monthly-volume"
                    className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-1.5"
                  >
                    Expected Monthly Cross-Border Volume
                  </label>
                  <select
                    id="monthly-volume"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full rounded-xl bg-black/5 border border-black/15 px-4 py-3 text-sm text-[#0A0A0A] focus:border-[#FF4D1C] focus:bg-white focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="<$500k / mo" className="bg-white text-[#0A0A0A]">&lt; $500,000 / month</option>
                    <option value="$500k - $1M / mo" className="bg-white text-[#0A0A0A]">$500,000 - $1,000,000 / month</option>
                    <option value="$1M - $10M / mo" className="bg-white text-[#0A0A0A]">$1,000,000 - $10,000,000 / month</option>
                    <option value="$10M+ / mo" className="bg-white text-[#0A0A0A]">$10,000,000+ / month (Enterprise Dedicated)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full justify-center text-sm py-3.5"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Allocating Gateway...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Confirm Allocation Priority
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </MagneticButton>
                </div>

                <div className="flex items-center justify-center gap-2 text-center text-[11px] text-[#0A0A0A]/60 pt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#FF4D1C]" />
                  <span>Encrypted SOC2 Tier-1 Banking Gateway. No commitment required.</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FF4D1C]/15 border border-[#FF4D1C]/30 text-[#FF4D1C] mb-4">
                <CheckCircle2 className="h-7 w-7" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-xs text-[#0A0A0A]/80 font-mono mb-3 font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-[#FF4D1C]" />
                Priority Position: #{queueNumber ?? 18} in Liquidity Wave 1
              </div>

              <Dialog.Title className="font-display text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-2">
                Access Request <span className="font-italic-accent">Confirmed</span>
              </Dialog.Title>

              <p className="font-sans text-sm text-[#0A0A0A]/70 mb-6 leading-relaxed max-w-sm mx-auto">
                We have assigned a dedicated liquidity architect for <strong className="text-[#0A0A0A]">{company || email}</strong>. Check your inbox for sandbox API credentials and correspondent routing guidelines.
              </p>

              <div className="p-4 rounded-xl bg-black/5 border border-black/10 mb-6 text-left text-xs space-y-1.5">
                <div className="flex justify-between text-[#0A0A0A]/60">
                  <span>Authorized Corridor:</span>
                  <span className="text-[#0A0A0A] font-mono font-bold">{corridor}</span>
                </div>
                <div className="flex justify-between text-[#0A0A0A]/60">
                  <span>Routing Engine:</span>
                  <span className="text-[#FF4D1C] font-mono font-bold"><TradePeWordmark /> HyperRoute v2</span>
                </div>
                <div className="flex justify-between text-[#0A0A0A]/60">
                  <span>Target Settlement:</span>
                  <span className="text-[#0A0A0A] font-mono font-bold">&lt; 3.2 seconds</span>
                </div>
              </div>

              <MagneticButton
                onClick={handleReset}
                variant="dark"
                size="md"
                className="w-full justify-center"
              >
                Close Window
              </MagneticButton>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
