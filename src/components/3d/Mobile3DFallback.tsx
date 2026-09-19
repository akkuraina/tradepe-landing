"use client";

import { motion } from "framer-motion";

export function Mobile3DFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-6 select-none">
      {/* Background Radial Glow */}
      <div className="absolute h-64 w-64 rounded-full bg-[#FF4D1C]/10 blur-3xl pointer-events-none" />

      <div className="relative h-72 w-72 md:h-80 md:w-80 rounded-full border border-black/15 flex items-center justify-center">
        {/* Inner concentric ring */}
        <div className="absolute h-56 w-56 rounded-full border border-dashed border-black/20 animate-[spin_60s_linear_infinite]" />
        
        {/* Orange Meridian Ring */}
        <div className="absolute h-64 w-64 rounded-full border border-[#FF4D1C]/40 rotate-45" />

        {/* Core graphic */}
        <div className="relative h-44 w-44 rounded-full bg-white border border-black/15 flex flex-col items-center justify-center p-4 text-center shadow-xl">
          <span className="h-2 w-2 rounded-full bg-[#FF4D1C] animate-ping mb-2" />
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#FF4D1C]">
            Direct Clearing
          </span>
          <span className="font-display text-lg font-bold text-[#0A0A0A] mt-0.5">
            40+ Corridors
          </span>
          <span className="font-sans text-[11px] text-[#0A0A0A]/60 font-mono mt-1">
            Latency &lt; 0.04s
          </span>
        </div>

        {/* Orbiting Satellite Node 1 (New York - London) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#FF4D1C]/50 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D1C]" />
            <span className="font-mono text-[10px] text-[#0A0A0A] font-semibold">NYC ⇄ LON</span>
          </div>
        </motion.div>

        {/* Orbiting Satellite Node 2 (Mumbai - Singapore) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute bottom-4 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-black/20 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" />
            <span className="font-mono text-[10px] text-[#0A0A0A] font-semibold">BOM ⇄ SIN</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
