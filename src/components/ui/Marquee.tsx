"use client";

import { cn } from "@/lib/utils";

interface MarqueeItem {
  pair: string;
  rate?: string;
  speed?: string;
  badge?: string;
}

const DEFAULT_CORRIDORS: MarqueeItem[] = [
  { pair: "USD / INR", rate: "86.42", speed: "0.02s", badge: "Direct T-0" },
  { pair: "EUR / SGD", rate: "1.458", speed: "0.04s", badge: "Instant" },
  { pair: "GBP / USD", rate: "1.294", speed: "0.01s", badge: "Direct T-0" },
  { pair: "AED / INR", rate: "23.53", speed: "0.02s", badge: "Instant" },
  { pair: "USD / BRL", rate: "5.680", speed: "0.08s", badge: "Direct T-0" },
  { pair: "SGD / JPY", rate: "114.20", speed: "0.05s", badge: "Instant" },
  { pair: "USD / AED", rate: "3.673", speed: "0.02s", badge: "Direct T-0" },
  { pair: "EUR / INR", rate: "93.10", speed: "0.04s", badge: "Instant" },
  { pair: "AUD / USD", rate: "0.652", speed: "0.03s", badge: "Direct T-0" },
  { pair: "CAD / INR", rate: "63.20", speed: "0.04s", badge: "Instant" },
];

interface MarqueeProps {
  items?: MarqueeItem[];
  direction?: "left" | "right";
  className?: string;
  variant?: "light" | "bordered";
}

export function Marquee({
  items = DEFAULT_CORRIDORS,
  direction = "left",
  className = "",
  variant = "bordered",
}: MarqueeProps) {
  const content = (
    <div className="flex items-center shrink-0">
      {items.map((item, idx) => (
        <div
          key={`${item.pair}-${idx}`}
          className="flex items-center mx-4 md:mx-8 shrink-0 group select-none"
        >
          <span className="font-display text-base md:text-xl font-bold tracking-tight text-[#0A0A0A] group-hover:text-[#FF4D1C] transition-colors">
            {item.pair}
          </span>
          {item.rate && (
            <span className="ml-2.5 font-sans text-xs md:text-sm text-[#0A0A0A]/60 font-mono">
              {item.rate}
            </span>
          )}
          {item.speed && (
            <span className="ml-2 px-2 py-0.5 rounded text-[10px] md:text-xs font-semibold font-sans bg-[#FF4D1C]/10 text-[#FF4D1C] border border-[#FF4D1C]/30">
              ⚡ {item.speed}
            </span>
          )}
          {/* Orange separator */}
          <span
            className="ml-6 md:ml-10 text-[#FF4D1C] text-sm md:text-base font-serif"
            aria-hidden="true"
          >
            ✦
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-4 md:py-5 bg-[#FAFAFA]",
        variant === "bordered" && "border-y border-black/10",
        className
      )}
      aria-label="Real-time Trade Corridor Status"
    >
      {/* Side Fade Gradients */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10"
        aria-hidden="true"
      />

      <div
        className={cn(
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
      >
        {content}
        {content}
      </div>
    </div>
  );
}
