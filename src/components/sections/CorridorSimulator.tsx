"use client";

import { useState } from "react";
import { Zap, RefreshCw, CheckCircle2 } from "lucide-react";
import { TransparentPricingCard } from "@/components/ui/TransparentPricingCard";

interface CorridorOption {
  from: string;
  to: string;
  fromSymbol: string;
  toSymbol: string;
  rate: number;
  label: string;
  speed: string;
  flagFrom: string;
  flagTo: string;
}

const CORRIDOR_OPTIONS: CorridorOption[] = [
  { from: "USD", to: "INR", fromSymbol: "$", toSymbol: "₹", rate: 83.6723, label: "US (FedNow) ⇄ India (RTGS)", speed: "0.02s", flagFrom: "🇺🇸", flagTo: "🇮🇳" },
  { from: "EUR", to: "SGD", fromSymbol: "€", toSymbol: "S$", rate: 1.4580, label: "EU (SEPA Instant) ⇄ Singapore (FAST)", speed: "0.04s", flagFrom: "🇪🇺", flagTo: "🇸🇬" },
  { from: "AED", to: "INR", fromSymbol: "AED ", toSymbol: "₹", rate: 23.5310, label: "UAE (CBUAE) ⇄ India (RTGS)", speed: "0.02s", flagFrom: "🇦🇪", flagTo: "🇮🇳" },
  { from: "GBP", to: "USD", fromSymbol: "£", toSymbol: "$", rate: 1.2942, label: "UK (Faster Payments) ⇄ US (FedNow)", speed: "0.01s", flagFrom: "🇬🇧", flagTo: "🇺🇸" },
  { from: "USD", to: "BRL", fromSymbol: "$", toSymbol: "R$", rate: 5.6820, label: "US (FedNow) ⇄ Brazil (Pix Direct)", speed: "0.07s", flagFrom: "🇺🇸", flagTo: "🇧🇷" },
];

interface CorridorSimulatorProps {
  onRequestAccess?: () => void;
}

export function CorridorSimulator({}: CorridorSimulatorProps) {
  const [selectedCorridorIndex, setSelectedCorridorIndex] = useState(0);
  const [amount, setAmount] = useState<number>(10000);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(false);

  const corridor = CORRIDOR_OPTIONS[selectedCorridorIndex];

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
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4">
            Zero-margin spot rates. <span className="font-italic-accent text-[#FF4D1C]">100% transparent.</span>
          </h2>
          <p className="font-sans text-base text-[#0A0A0A]/70">
            No hidden currency markups, no surprise intermediary wire cuts. See the exact fee and GST breakdown upfront before dispatching funds.
          </p>
        </div>

        {/* Interactive Pricing Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Transparent Pricing Card (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* The Exact Transparent Pricing Card */}
            <TransparentPricingCard
              amount={amount}
              rate={corridor.rate}
              currencyFrom={corridor.from}
              currencyTo={corridor.to}
              fromSymbol={corridor.fromSymbol}
              toSymbol={corridor.toSymbol}
              flagFrom={corridor.flagFrom}
              flagTo={corridor.flagTo}
            />
          </div>

          {/* Right Column: Controls (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl bg-[#FAFAFA] border border-black/15 p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75 mb-3">
                  Select Trade Corridor
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CORRIDOR_OPTIONS.map((item, idx) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setSelectedCorridorIndex(idx);
                        setSimulatedProgress(false);
                      }}
                      className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                        selectedCorridorIndex === idx
                          ? "bg-white border-[#FF4D1C] text-[#0A0A0A] shadow-sm ring-1 ring-[#FF4D1C]"
                          : "bg-white/70 border-black/10 text-[#0A0A0A]/70 hover:border-black/20 hover:text-[#0A0A0A]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.flagFrom}</span>
                        <span className="font-mono font-bold">{item.from} ⇄ {item.to}</span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#FF4D1C]/10 text-[#FF4D1C] font-bold">
                        {item.speed}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Transfer Amount Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/75">
                    Adjust Transfer Principal
                  </label>
                  <span className="font-mono text-sm text-[#FF4D1C] font-bold">
                    {corridor.fromSymbol}{amount.toLocaleString()} {corridor.from}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={500000}
                  step={1000}
                  value={amount}
                  onChange={(e) => {
                    setAmount(Number(e.target.value));
                    setSimulatedProgress(false);
                  }}
                  className="w-full accent-[#FF4D1C] cursor-pointer h-2 bg-black/10 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#0A0A0A]/50 mt-1.5 font-medium">
                  <span>$1,000</span>
                  <span>$10,000 (Default)</span>
                  <span>$100,000</span>
                  <span>$500,000</span>
                </div>
              </div>

              {/* Instant Dispatch Simulator */}
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

              {/* Live simulation completion message */}
              {simulatedProgress && (
                <div className="p-3.5 rounded-xl bg-white border border-black/10 text-xs font-mono text-[#0A0A0A] flex items-center gap-2 shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-[#107c24] shrink-0" />
                  <span>Instant dispatch simulated in {corridor.speed} with zero FX margin.</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
