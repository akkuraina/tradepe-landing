"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock, RefreshCw, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface CorridorOption {
  from: string;
  to: string;
  fromSymbol: string;
  toSymbol: string;
  rate: number;
  label: string;
  speed: string;
}

const CORRIDOR_OPTIONS: CorridorOption[] = [
  { from: "USD", to: "INR", fromSymbol: "$", toSymbol: "₹", rate: 86.42, label: "US (FedNow) ⇄ India (RTGS)", speed: "0.02s" },
  { from: "EUR", to: "SGD", fromSymbol: "€", toSymbol: "S$", rate: 1.458, label: "EU (SEPA Instant) ⇄ Singapore (FAST)", speed: "0.04s" },
  { from: "AED", to: "INR", fromSymbol: "AED ", toSymbol: "₹", rate: 23.53, label: "UAE (CBUAE) ⇄ India (RTGS)", speed: "0.02s" },
  { from: "GBP", to: "USD", fromSymbol: "£", toSymbol: "$", rate: 1.294, label: "UK (Faster Payments) ⇄ US (FedNow)", speed: "0.01s" },
  { from: "USD", to: "BRL", fromSymbol: "$", toSymbol: "R$", rate: 5.68, label: "US (FedNow) ⇄ Brazil (Pix Direct)", speed: "0.07s" },
];

interface CorridorSimulatorProps {
  onRequestAccess: () => void;
}

export function CorridorSimulator({ onRequestAccess }: CorridorSimulatorProps) {
  const [selectedCorridorIndex, setSelectedCorridorIndex] = useState(0);
  const [amount, setAmount] = useState<number>(100000);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(false);

  const corridor = CORRIDOR_OPTIONS[selectedCorridorIndex];

  // Legacy bank markups: 2.75% FX spread + $45 cable fee
  const legacyMarkup = amount * 0.0275 + 45;
  const legacyReceived = (amount - legacyMarkup) * corridor.rate;
  const tradePeFee = amount * 0.0015; // 0.15% transparent flat
  const tradePeReceived = (amount - tradePeFee) * corridor.rate;
  const savings = tradePeReceived - legacyReceived;

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulatedProgress(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedProgress(true);
    }, 900);
  };

  return (
    <section id="simulator" className="relative bg-white text-[#0A0A0A] py-24 md:py-32 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF4D1C]/10 border border-[#FF4D1C]/25 text-xs font-mono text-[#FF4D1C] mb-4 font-bold">
            ⚡ LIVE CORRIDOR ENGINE
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4">
            Calculate your settlement <span className="font-italic-accent text-[#FF4D1C]">velocity</span>
          </h2>
          <p className="font-sans text-base text-[#0A0A0A]/70">
            Compare TradePe direct atomic clearing vs legacy SWIFT correspondent banking chains in real time.
          </p>
        </div>

        {/* Interactive Simulator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#FAFAFA] border border-black/15 p-6 sm:p-8 space-y-6 shadow-md">
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-3">
                Select Corridor Route
              </label>
              <div className="space-y-2">
                {CORRIDOR_OPTIONS.map((item, idx) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setSelectedCorridorIndex(idx);
                      setSimulatedProgress(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                      selectedCorridorIndex === idx
                        ? "bg-white border-[#FF4D1C] text-[#0A0A0A] shadow-sm ring-1 ring-[#FF4D1C]"
                        : "bg-white/70 border-black/10 text-[#0A0A0A]/70 hover:border-black/20 hover:text-[#0A0A0A]"
                    }`}
                  >
                    <div>
                      <div className="font-mono font-bold text-sm text-[#0A0A0A]">{item.from} ⇄ {item.to}</div>
                      <div className="text-[11px] text-[#0A0A0A]/55 mt-0.5">{item.label}</div>
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#FF4D1C]/10 text-[#FF4D1C] font-bold">
                      {item.speed}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Transfer Amount Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75">
                  Transaction Principal
                </label>
                <span className="font-mono text-sm text-[#FF4D1C] font-bold">
                  {corridor.fromSymbol}{amount.toLocaleString()} {corridor.from}
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={2000000}
                step={10000}
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                  setSimulatedProgress(false);
                }}
                className="w-full accent-[#FF4D1C] cursor-pointer h-2 bg-black/10 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#0A0A0A]/50 mt-1.5 font-medium">
                <span>$10,000</span>
                <span>$500,000</span>
                <span>$1,000,000</span>
                <span>$2,000,000</span>
              </div>
            </div>

            {/* Simulate Trigger */}
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0A0A0A] hover:bg-[#222222] text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-[#FF4D1C]" />
                  <span>Simulating Direct Mesh...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 text-[#FF4D1C]" />
                  <span>Simulate Instant Dispatch</span>
                </>
              )}
            </button>
          </div>

          {/* Results Comparison Matrix (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Legacy Correspondent Banking */}
              <div className="rounded-3xl bg-[#FAFAFA] border border-black/15 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <span className="font-mono text-xs text-[#0A0A0A]/60 uppercase tracking-wider font-semibold">
                    Legacy Correspondent
                  </span>
                  <span className="text-xs font-mono text-red-600 font-bold flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> 3–5 Days
                  </span>
                </div>

                <div>
                  <div className="text-[11px] text-[#0A0A0A]/50 uppercase font-sans font-medium">
                    Beneficiary Receives
                  </div>
                  <div className="font-display text-2xl font-bold text-[#0A0A0A]/60">
                    {corridor.toSymbol}{Math.floor(legacyReceived).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#0A0A0A]/60 border-t border-black/10 pt-3">
                  <div className="flex justify-between">
                    <span>Intermediary Bank Cuts:</span>
                    <span className="text-red-600 font-mono font-medium">-$45.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hidden FX Spread (2.75%):</span>
                    <span className="text-red-600 font-mono font-medium">
                      -{corridor.fromSymbol}{(amount * 0.0275).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hops Required:</span>
                    <span className="text-[#0A0A0A] font-mono font-semibold">3–5 Banks</span>
                  </div>
                </div>
              </div>

              {/* TradePe Direct Clearing Rails */}
              <div className="rounded-3xl bg-white border-2 border-[#FF4D1C] p-6 space-y-4 relative shadow-[0_0_40px_-10px_rgba(255,77,28,0.2)]">
                <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-[#FF4D1C] text-white text-[10px] font-bold font-mono uppercase tracking-wider shadow-sm">
                  Direct T-0
                </div>

                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <span className="font-mono text-xs text-[#FF4D1C] uppercase tracking-wider font-bold">
                    TradePe Direct Rails
                  </span>
                  <span className="text-xs font-mono text-[#FF4D1C] font-bold flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5" /> {corridor.speed}
                  </span>
                </div>

                <div>
                  <div className="text-[11px] text-[#0A0A0A]/60 uppercase font-sans font-medium">
                    Beneficiary Receives
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[#0A0A0A]">
                    {corridor.toSymbol}{Math.floor(tradePeReceived).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#0A0A0A]/80 border-t border-black/10 pt-3">
                  <div className="flex justify-between">
                    <span>Intermediary Bank Cuts:</span>
                    <span className="text-[#0A0A0A] font-mono font-bold">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>FX Spread Markup:</span>
                    <span className="text-[#0A0A0A] font-mono font-bold">0.15% Flat</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Direct Clearing:</span>
                    <span className="text-[#FF4D1C] font-mono font-bold">1 Direct Hop</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Savings Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-[#FF4D1C]/15 via-[#FF4D1C]/5 to-white border border-[#FF4D1C]/40 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <div className="font-sans text-xs uppercase tracking-widest text-[#FF4D1C] font-bold">
                  Estimated Retained Capital Per Transaction
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#0A0A0A] mt-0.5">
                  +{corridor.toSymbol}{Math.floor(savings).toLocaleString()}{" "}
                  <span className="text-sm font-sans font-normal text-[#0A0A0A]/60">
                    (~${Math.floor(savings / corridor.rate).toLocaleString()} USD saved)
                  </span>
                </div>
              </div>

              <MagneticButton
                variant="primary"
                size="md"
                onClick={onRequestAccess}
                className="shrink-0"
              >
                <span>Lock In Corridors</span>
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>

            {/* Live simulation status log */}
            {simulatedProgress && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-black/5 border border-black/10 p-4 font-mono text-xs text-[#0A0A0A] space-y-1 shadow-sm"
              >
                <div className="text-[#FF4D1C] font-bold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>SIMULATION DISPATCH COMPLETED IN 0.024 SECONDS</span>
                </div>
                <div className="text-[#0A0A0A]/70">
                  Payload Route: [Origin FedNow] → [TradePe Multi-Liquidity Bridge] → [Destination RTGS Central Bank Node]
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
