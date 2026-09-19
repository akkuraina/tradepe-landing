"use client";

import { useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

// Brand accent color matching the hero italic accent token ("friction")
const BRAND_ACCENT = "#FF4D1C";

// TradePe 6 core corridor cities with exact place + country labels
const HUBS = [
  { name: "Mumbai", label: "Mumbai, India", lat: 19.076, lng: 72.8777, isAnchor: true },
  { name: "New York", label: "New York, USA", lat: 40.7128, lng: -74.006, isAnchor: false },
  { name: "London", label: "London, UK", lat: 51.5074, lng: -0.1278, isAnchor: false },
  { name: "Frankfurt", label: "Frankfurt, Germany", lat: 50.1109, lng: 8.6821, isAnchor: false },
  { name: "Dubai", label: "Dubai, UAE", lat: 25.2048, lng: 55.2708, isAnchor: false },
  { name: "Singapore", label: "Singapore", lat: 1.3521, lng: 103.8198, isAnchor: false },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/**
 * Computes a smooth geodesic 3D arc between two spherical points,
 * lifting the trajectory radially outward along the surface normal.
 */
function createSphericalArc(p1: THREE.Vector3, p2: THREE.Vector3) {
  const points: THREE.Vector3[] = [];
  const segments = 36;
  const distance = p1.distanceTo(p2);

  // Balanced radial lift: short arcs get prominent height (>=0.30) while distant arcs peak at 0.46
  const maxLift = Math.min(0.46, Math.max(0.30, distance * 0.22));

  const v1 = p1.clone().normalize();
  const v2 = p2.clone().normalize();

  const dot = Math.min(Math.max(v1.dot(v2), -1), 1);
  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega);

  const startR = p1.length();
  const endR = p2.length();

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    let interpolated: THREE.Vector3;

    if (sinOmega > 0.001) {
      const a = Math.sin((1 - t) * omega) / sinOmega;
      const b = Math.sin(t * omega) / sinOmega;
      interpolated = new THREE.Vector3(
        a * v1.x + b * v2.x,
        a * v1.y + b * v2.y,
        a * v1.z + b * v2.z
      ).normalize();
    } else {
      interpolated = v1.clone().lerp(v2, t).normalize();
    }

    const altitude = Math.sin(t * Math.PI) * maxLift;
    const currentRadius = THREE.MathUtils.lerp(startR, endR, t) + altitude;

    points.push(interpolated.multiplyScalar(currentRadius));
  }

  return new THREE.CatmullRomCurve3(points);
}

function HubMarker({
  hub,
}: {
  hub: (typeof HUBS)[number] & { pos: THREE.Vector3 };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={hub.pos}>
      {/* 1. Visible Dot Mesh (Unlit MeshBasicMaterial, toneMapped=false for exact #FF4D1C match) */}
      <mesh raycast={() => null}>
        <sphereGeometry args={[hub.isAnchor ? 0.055 : 0.038, 16, 16]} />
        <meshBasicMaterial
          color="#FF4D1C"
          toneMapped={false}
        />
      </mesh>

      {/* 2. Invisible Hit Target Mesh (Generous 3-4x size so pointer easily triggers hover) */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[hub.isAnchor ? 0.16 : 0.12, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* 3. Hover Tooltip Pill */}
      {hovered && (
        <Html
          position={[0, 0.05, 0]}
          center
          occlude="raycast"
          style={{
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
            transform: "translate3d(0, -14px, 0)",
          }}
        >
          <div className="bg-[#0A0A0A]/85 text-white font-sans text-[11px] leading-tight font-medium px-2 py-0.5 rounded-[5px] shadow-lg border border-white/15 backdrop-blur-sm">
            {hub.label}
          </div>
        </Html>
      )}
    </group>
  );
}

function EarthSphere({ isDesktop }: { isDesktop: boolean }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  const radius = 2.0;
  const segments = isDesktop ? 64 : 48;

  // Load realistic 2K Earth textures
  const [dayMap, normalMap, specularMap, cloudsMap] = useTexture([
    "/textures/earth-daymap.jpg",
    "/textures/earth-normal.jpg",
    "/textures/earth-specular.jpg",
    "/textures/earth-clouds.jpg",
  ]);

  if (dayMap) {
    dayMap.colorSpace = THREE.SRGBColorSpace;
  }

  // Precompute 3D vectors for the 6 trade corridor hubs
  const hubPositions = useMemo(() => {
    return HUBS.map((h) => ({
      ...h,
      pos: latLngToVector3(h.lat, h.lng, radius * 1.016),
    }));
  }, [radius]);

  // Precompute 5 independent trade route curves originating from Mumbai (index 0)
  const routeCurves = useMemo(() => {
    const mumbaiPos = hubPositions[0].pos;
    return hubPositions.slice(1).map((hub) => ({
      name: hub.name,
      curve: createSphericalArc(mumbaiPos, hub.pos),
    }));
  }, [hubPositions]);

  useFrame((_, delta) => {
    // Independent cloud layer rotation
    if (cloudsRef.current && !prefersReducedMotion) {
      cloudsRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <group rotation={[0, -1.35, 0]}>
      {/* 1. Base Earth Sphere (Photoreal NASA Albedo + Normal Relief) */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[radius, segments, segments]} />
        <meshStandardMaterial
          map={dayMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.4, 0.4)}
          roughness={0.65}
          metalness={0.02}
        />
      </mesh>

      {/* 2. Cloud Layer Sphere (Desktop only, excluded from raycasting) */}
      {isDesktop && (
        <mesh ref={cloudsRef} raycast={() => null}>
          <sphereGeometry args={[radius * 1.012, 48, 48]} />
          <meshStandardMaterial
            map={cloudsMap}
            transparent
            opacity={0.36}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* 3. Trade Corridor 3D Arcs (Unlit MeshBasicMaterial, toneMapped=false for pure #FF4D1C match) */}
      {routeCurves.map((r, i) => (
        <mesh key={`arc-${i}`} raycast={() => null}>
          <tubeGeometry args={[r.curve, 64, 0.0075, 6, false]} />
          <meshBasicMaterial
            color="#FF4D1C"
            toneMapped={false}
            transparent
            opacity={0.95}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* 4. Six Interactive Trade Hub Markers with Hover Tooltips */}
      <group>
        {hubPositions.map((hub, i) => (
          <HubMarker key={`pin-${i}`} hub={hub} />
        ))}
      </group>
    </group>
  );
}

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

export function TradeGlobe() {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative h-full w-full select-none cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="h-full w-full bg-transparent"
      >
        {/* Balanced 3-point lighting for vivid Earth colors across the globe */}
        <directionalLight position={[3.5, 2.5, 4.5]} intensity={1.9} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[-3.5, -2.0, -2.0]} intensity={0.35} />

        <Suspense fallback={null}>
          <EarthSphere isDesktop={isDesktop} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          autoRotate={!prefersReducedMotion}
          autoRotateSpeed={0.7}
          rotateSpeed={0.55}
        />
      </Canvas>
    </div>
  );
}

export default TradeGlobe;
