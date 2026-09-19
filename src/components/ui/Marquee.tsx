"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MarqueeItem {
  pair: string;
  rate?: string;
  change?: string;
  isUp?: boolean;
}

const DEFAULT_CORRIDORS: MarqueeItem[] = [
  { pair: "USD / INR", rate: "95.940", change: "+0.14%", isUp: true },
  { pair: "EUR / SGD", rate: "1.4580", change: "-0.08%", isUp: false },
  { pair: "GBP / USD", rate: "1.2942", change: "+0.31%", isUp: true },
  { pair: "AED / INR", rate: "26.124", change: "+0.12%", isUp: true },
  { pair: "USD / BRL", rate: "5.6820", change: "-0.45%", isUp: false },
  { pair: "SGD / JPY", rate: "114.22", change: "+0.28%", isUp: true },
  { pair: "USD / AED", rate: "3.6725", change: "+0.02%", isUp: true },
  { pair: "EUR / INR", rate: "104.095", change: "-0.19%", isUp: false },
  { pair: "AUD / USD", rate: "0.6521", change: "-0.22%", isUp: false },
  { pair: "CAD / INR", rate: "70.544", change: "+0.18%", isUp: true },
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
          {item.change && (
            <span
              className={cn(
                "ml-2.5 px-2 py-0.5 rounded text-[10px] md:text-xs font-semibold font-mono flex items-center gap-1",
                item.isUp
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              )}
            >
              {item.isUp ? (
                <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
              ) : (
                <ArrowDownRight className="h-3 w-3 stroke-[2.5]" />
              )}
              <span>{item.change}</span>
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
