"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { Mobile3DFallback } from "./Mobile3DFallback";

// Dynamic import with SSR disabled — R3F uses WebGL/Three.js
const DynamicTradeGlobe = dynamic(() => import("./TradeGlobe"), {
  ssr: false,
  loading: () => <Mobile3DFallback />,
});

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot() {
  return typeof window !== "undefined" && window.innerWidth >= 768;
}

function getServerSnapshot() {
  return false;
}

export function GlobeHeroContainer() {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const prefersReducedMotion = useReducedMotion();

  // Only fall back to static illustration if reduced motion is requested
  if (prefersReducedMotion) {
    return <Mobile3DFallback />;
  }

  return (
    <div
      className="relative mx-auto flex items-center justify-center overflow-hidden"
      style={{
        width: isDesktop ? 510 : 360,
        height: isDesktop ? 510 : 360,
        maxWidth: "100%",
        background: "transparent",
      }}
    >
      <DynamicTradeGlobe />
    </div>
  );
}
