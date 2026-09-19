"use client";

import { Marquee } from "@/components/ui/Marquee";

const CORRIDORS = [
  { pair: "USD / INR", rate: "95.940", change: "+0.14%", isUp: true },
  { pair: "EUR / SGD", rate: "1.4580", change: "-0.08%", isUp: false },
  { pair: "GBP / USD", rate: "1.2942", change: "+0.31%", isUp: true },
  { pair: "AED / INR", rate: "26.124", change: "+0.12%", isUp: true },
  { pair: "USD / BRL", rate: "5.6820", change: "-0.45%", isUp: false },
  { pair: "SGD / JPY", rate: "114.22", change: "+0.28%", isUp: true },
  { pair: "EUR / INR", rate: "104.095", change: "-0.19%", isUp: false },
  { pair: "USD / AED", rate: "3.6725", change: "+0.02%", isUp: true },
  { pair: "AUD / USD", rate: "0.6521", change: "-0.22%", isUp: false },
  { pair: "CAD / INR", rate: "70.544", change: "+0.18%", isUp: true },
];

export function MarqueeStrip() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-1">
      <Marquee items={CORRIDORS} direction="left" variant="bordered" />
    </section>
  );
}
