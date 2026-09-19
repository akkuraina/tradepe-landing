"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlobeHeroContainer } from "@/components/3d/GlobeHeroContainer";

interface HeroProps {
  onRequestAccess: () => void;
}

export function Hero({ onRequestAccess }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for kinetic headline
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 md:pt-36 pb-16 overflow-hidden bg-white">
      {/* Background Subtle Atmosphere */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[#FF4D1C]/5 blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Grid: Kinetic Typography on Left, 3D Interactive Signature on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Kinetic Typography & CTAs (7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col z-10 text-left"
          >


            {/* Oversized Kinetic Headline with Editorial Italic Accent */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(2.5rem,6.5vw,5.4rem)] font-bold tracking-[-0.035em] text-[#0A0A0A] leading-[1.04] mb-6"
            >
              Cross-border <br />
              capital without <br className="hidden sm:inline" />
              the <span className="font-italic-accent text-[#FF4D1C] text-[1.12em] font-normal hover:text-[#ff6b42] transition-colors">friction.</span>
            </motion.h1>

            {/* Editorial Body Copy */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-base sm:text-lg text-[#0A0A0A]/75 max-w-xl leading-relaxed mb-8 sm:mb-10"
            >
              Direct-clearing trade corridors for global enterprises. Bypass correspondent banking hops, eliminate multi-day settlement delays, and route liquidity at institutional spot rates.
            </motion.p>

            {/* CTAs with Magnetic Physics */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10"
            >
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={onRequestAccess}
                dataCursorText="Start"
                ariaLabel="Deploy Direct Rails"
              >
                <span>Deploy Direct Rails</span>
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>

              <MagneticButton
                variant="dark"
                size="lg"
                href="#simulator"
                dataCursorText="Simulate"
                ariaLabel="Simulate Corridor FX"
              >
                <span>Simulate Corridor FX</span>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Column: Photoreal 3D Earth Globe (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <GlobeHeroContainer />
          </div>

        </div>
      </div>
    </section>
  );
}
