"use client";

import { Marquee } from "@/components/ui/Marquee";

const CORRIDORS = [
  { pair: "USD / INR", rate: "83.672", speed: "0.02s", badge: "Direct RTGS" },
  { pair: "EUR / SGD", rate: "1.4580", speed: "0.04s", badge: "Instant FAST" },
  { pair: "GBP / USD", rate: "1.2942", speed: "0.01s", badge: "FedNow Direct" },
  { pair: "AED / INR", rate: "23.531", speed: "0.02s", badge: "Direct Local" },
  { pair: "USD / BRL", rate: "5.6820", speed: "0.07s", badge: "Pix Instant" },
  { pair: "SGD / JPY", rate: "114.22", speed: "0.04s", badge: "Zengin Link" },
  { pair: "EUR / INR", rate: "93.104", speed: "0.03s", badge: "Direct RTGS" },
  { pair: "USD / AED", rate: "3.6725", speed: "0.01s", badge: "Instant CBUAE" },
  { pair: "AUD / USD", rate: "0.6521", speed: "0.02s", badge: "Direct NPP" },
  { pair: "CAD / INR", rate: "63.210", speed: "0.04s", badge: "Direct RTGS" },
];

export function MarqueeStrip() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-1">
      <Marquee items={CORRIDORS} direction="left" variant="bordered" />
    </section>
  );
}
