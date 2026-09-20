"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function MetricsSection() {
  const partners = [
    {
      name: "DBS Bank",
      src: "/logos/dbs.png",
      width: 240,
      height: 70,
    },
    {
      name: "ICICI Bank",
      src: "/logos/icici.jpg",
      width: 240,
      height: 70,
    },
    {
      name: "YES BANK",
      src: "/logos/yesbank.jpg",
      width: 240,
      height: 70,
    },
    {
      name: "Operating under RBI's OPGSP Model",
      src: "/logos/rbi-opgsp.svg",
      width: 240,
      height: 70,
    },
    {
      name: "PCI DSS Level 1 Certified",
      src: "/logos/pci-dss.png",
      width: 240,
      height: 70,
    },
    {
      name: "ISO 27001 Security Certified",
      src: "/logos/iso-27001.svg",
      width: 240,
      height: 70,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="metrics" className="relative bg-transparent text-[#0A0A0A] py-12 md:py-16 border-t border-black/10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with In-View Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A]">
            Our Ecosystem &amp; <span className="font-italic-accent text-[#FF4D1C]">Certifications</span>
          </h2>
        </motion.div>

        {/* Logos Row with Staggered In-View Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-center"
        >
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="h-20 sm:h-24 px-4 py-3 rounded-2xl bg-[#F8F5EE] border border-black/10 flex items-center justify-center shadow-[0_4px_16px_-2px_rgba(0,0,0,0.03)] hover:border-[#FF4D1C]/40 hover:shadow-md transition-all duration-300 group"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="h-8 sm:h-10 w-auto max-w-[85%] max-h-[75%] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default MetricsSection;
