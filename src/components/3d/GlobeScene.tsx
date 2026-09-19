"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { TradeGlobe } from "./TradeGlobe";

export function GlobeScene() {
  return (
    <div className="relative h-full w-full select-none pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="h-full w-full"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Suspense fallback={null}>
          <TradeGlobe />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default GlobeScene;
