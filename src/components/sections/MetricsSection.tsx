"use client";

import { motion } from "framer-motion";
import { StatCounter } from "@/components/ui/StatCounter";

export function MetricsSection() {
  const metrics = [
    {
      value: 14.2,
      decimals: 1,
      prefix: "$",
      suffix: "B+",
      label: "Annualized Volume Routed",
      description: "Direct enterprise trade settlements cleared across our multi-currency mesh.",
    },
    {
      value: 3.2,
      decimals: 1,
      prefix: "< ",
      suffix: "s",
      label: "Median Settlement Latency",
      description: "From corporate initiator debit to beneficiary central bank credit.",
    },
    {
      value: 40,
      decimals: 0,
      prefix: "",
      suffix: "+",
      label: "Sovereign Corridors",
      description: "Direct-clearing domestic clearing system connections worldwide.",
    },
    {
      value: 99.99,
      decimals: 2,
      prefix: "",
      suffix: "%",
      label: "Core Clearing Uptime",
      description: "Institutional reliability with multi-region redundancy and failover.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="metrics" className="relative bg-white text-[#0A0A0A] py-24 md:py-32 border-t border-black/10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with In-View Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4">
            Proven at institutional <span className="font-italic-accent text-[#FF4D1C]">scale.</span>
          </h2>
          <p className="font-sans text-base text-[#0A0A0A]/70">
            Real-time performance metrics across our distributed multi-currency clearing network.
          </p>
        </motion.div>

        {/* Metrics Grid with Staggered In-View Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="rounded-3xl bg-[#FAFAFA] border border-black/15 p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#FF4D1C] transition-colors group shadow-sm"
            >
              <div>
                <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0A] tracking-tight group-hover:text-[#FF4D1C] transition-colors">
                  <StatCounter
                    value={m.value}
                    decimals={m.decimals}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    duration={2.4}
                  />
                </div>
                <div className="font-sans text-sm font-bold uppercase tracking-wider text-[#0A0A0A] mt-3">
                  {m.label}
                </div>
              </div>

              <div className="font-sans text-xs text-[#0A0A0A]/60 leading-relaxed border-t border-black/10 pt-4">
                {m.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
