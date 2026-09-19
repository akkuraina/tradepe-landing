"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { Mobile3DFallback } from "./Mobile3DFallback";

// Dynamic import with SSR disabled for R3F Canvas
const DynamicGlobeScene = dynamic(() => import("./GlobeScene"), {
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

  // Gracefully degrade on mobile (<768px) or if user prefers reduced motion
  if (!isDesktop || prefersReducedMotion) {
    return <Mobile3DFallback />;
  }

  return (
    <div className="relative h-[380px] sm:h-[460px] lg:h-[560px] w-full max-w-[580px] mx-auto">
      <DynamicGlobeScene />
    </div>
  );
}
