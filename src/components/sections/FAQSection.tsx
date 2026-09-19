"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { TradePeWordmark } from "@/components/TradePeWordmark";

interface FAQItem {
  q: ReactNode;
  a: ReactNode;
}

export function FAQSection() {
  const faqs: FAQItem[] = [
    {
      q: (
        <>
          How does <TradePeWordmark /> achieve sub-second cross-border settlement without SWIFT?
        </>
      ),
      a: (
        <>
          <TradePeWordmark /> operates a bilateral liquidity bridge connected directly to domestic instant clearing systems (such as FedNow & RTP in the US, RTGS in India, SEPA Instant in the EU, Pix in Brazil, and FAST in Singapore). Instead of routing funds through 3–5 intermediate correspondent banks with multi-day cutoff batches, <TradePeWordmark /> uses automated pre-funded local liquidity pools to execute atomic, simultaneous debits and credits locally.
        </>
      ),
    },
    {
      q: "What regulatory licenses and compliance guardrails are enforced?",
      a: (
        <>
          <TradePeWordmark /> adheres strictly to global regulatory frameworks, including FinCEN (US), MAS (Singapore), RBI FEMA guidelines (India), FCA (UK), and PSD2 (Europe). Every transaction undergoes sub-millisecond screening against OFAC, EU, UN, and FATF PEP sanctions lists, and automatically generates compliance artifacts such as Form A2 / LRS, customs IRM filings, and electronic trade declarations.
        </>
      ),
    },
    {
      q: "How are FX exchange rates determined, and are there hidden spreads?",
      a: (
        <>
          Unlike legacy banks that apply 2.5% to 3.5% hidden spreads, <TradePeWordmark /> provides direct interbank institutional spot rates sourced from deep multi-provider liquidity pools. Pricing is completely transparent: users pay a single, predictable flat fee (as low as 0.15%), with zero intermediary cable or wire deduction surprises.
        </>
      ),
    },
    {
      q: "What is the developer onboarding and API integration timeline?",
      a: "Our unified REST and GraphQL APIs with ISO 20022 native data structures allow enterprise engineering teams to integrate in less than 48 hours. We provide full sandbox simulation environments, instant webhooks, and SDKs in TypeScript, Python, Go, and Java.",
    },
    {
      q: (
        <>
          How does <TradePeWordmark /> manage counterparty and liquidity risk?
        </>
      ),
      a: (
        <>
          <TradePeWordmark /> utilizes multi-party computation (MPC) key sharding with hardware security modules (HSM Level 3) and non-custodial atomic smart escrows. Funds are never held on speculative balance sheets, and real-time liquidity buffers ensure 100% solvency across all active corridors.
        </>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="faq" className="relative bg-white text-[#0A0A0A] py-12 md:py-16 border-t border-black/10 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with In-View Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-4">
            Frequently answered <span className="font-italic-accent text-[#FF4D1C]">questions.</span>
          </h2>
          <p className="font-sans text-base text-[#0A0A0A]/70">
            Everything enterprise treasurers, CFOs, and developers need to know about <TradePeWordmark /> rails.
          </p>
        </motion.div>

        {/* Accordion List with Staggered In-View Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Accordion.Item
                  value={`item-${idx}`}
                  className="rounded-3xl bg-[#FAFAFA] border border-black/15 overflow-hidden transition-colors data-[state=open]:border-[#FF4D1C]/60 shadow-sm"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left font-display text-lg sm:text-xl font-bold text-[#0A0A0A] hover:text-[#FF4D1C] transition-colors group cursor-pointer">
                      <span>{faq.q}</span>
                      <ChevronDown className="h-5 w-5 text-[#0A0A0A]/50 group-hover:text-[#FF4D1C] transition-transform duration-300 ease-out group-data-[state=open]:rotate-180 shrink-0 ml-4" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="px-6 pb-6 pt-0 font-sans text-sm sm:text-base text-[#0A0A0A]/75 leading-relaxed border-t border-black/5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <div className="pt-4">{faq.a}</div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </motion.div>

      </div>
    </section>
  );
}
