"use client";

import { useMemo, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

// Brand accent color matching the hero italic accent token ("friction")
const BRAND_ACCENT = "#FF4D1C";

// TradePe 11 trade corridor hubs (Mumbai anchor + 10 global corridors)
const HUBS = [
  { name: "Mumbai", label: "Mumbai, India", lat: 19.076, lng: 72.8777, isAnchor: true },
  { name: "New York", label: "New York, USA", lat: 40.7128, lng: -74.006, isAnchor: false },
  { name: "London", label: "London, UK", lat: 51.5074, lng: -0.1278, isAnchor: false },
  { name: "Frankfurt", label: "Frankfurt, Germany", lat: 50.1109, lng: 8.6821, isAnchor: false },
  { name: "Dubai", label: "Dubai, UAE", lat: 25.2048, lng: 55.2708, isAnchor: false },
  { name: "Singapore", label: "Singapore", lat: 1.3521, lng: 103.8198, isAnchor: false },
  { name: "São Paulo", label: "São Paulo, Brazil", lat: -23.5505, lng: -46.6333, isAnchor: false },
  { name: "Johannesburg", label: "Johannesburg, South Africa", lat: -26.2041, lng: 28.0473, isAnchor: false },
  { name: "Sydney", label: "Sydney, Australia", lat: -33.8688, lng: 151.2093, isAnchor: false },
  { name: "Tokyo", label: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, isAnchor: false },
  { name: "Toronto", label: "Toronto, Canada", lat: 43.6532, lng: -79.3832, isAnchor: false },
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
 * Scaled strictly to chord distance to prevent looping or spiky curves on short corridors.
 */
function createSphericalArc(p1: THREE.Vector3, p2: THREE.Vector3) {
  const points: THREE.Vector3[] = [];
  const segments = 48;
  const distance = p1.distanceTo(p2);

  // Proportional lift: short corridors (e.g. Mumbai -> Dubai) get a low, gentle arc (~0.07),
  // while distant corridors scale smoothly and cap at 0.32 (never ballooning or looping)
  const maxLift = Math.min(0.32, Math.max(0.06, distance * 0.11));

  const v1 = p1.clone().normalize();
  const v2 = p2.clone().normalize();

  const dot = Math.min(Math.max(v1.dot(v2), -0.9999), 0.9999);
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
      {/* 1. Visible Dot Mesh (Softened brand orange #F0562A for seamless 3D harmony) */}
      <mesh raycast={() => null}>
        <sphereGeometry args={[hub.isAnchor ? 0.055 : 0.038, 16, 16]} />
        <meshBasicMaterial
          color="#F0562A"
          toneMapped={false}
        />
      </mesh>

      {/* 2. Invisible Hit Target Mesh (Generous size so pointer easily triggers hover) */}
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
        <sphereGeometry args={[hub.isAnchor ? 0.18 : 0.12, 12, 12]} />
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

  const radius = 2.0;
  const segments = isDesktop ? 64 : 48;

  // Load realistic 2K Earth textures without clouds
  const [dayMap, normalMap, specularMap] = useTexture([
    "/textures/earth-daymap.jpg",
    "/textures/earth-normal.jpg",
    "/textures/earth-specular.jpg",
  ]);

  if (dayMap) {
    dayMap.colorSpace = THREE.SRGBColorSpace;
    dayMap.wrapS = THREE.RepeatWrapping;
    dayMap.wrapT = THREE.ClampToEdgeWrapping;
  }

  // Precompute 3D vectors for the 11 trade corridor hubs
  const hubPositions = useMemo(() => {
    return HUBS.map((h) => ({
      ...h,
      pos: latLngToVector3(h.lat, h.lng, radius * 1.016),
    }));
  }, [radius]);

  // Precompute 10 independent trade route curves originating from Mumbai (index 0)
  // with directional departure offsets to form an elegant radial fan instead of a tangled cluster
  const routeCurves = useMemo(() => {
    const mumbaiPos = hubPositions[0].pos;
    const mumbaiNorm = mumbaiPos.clone().normalize();

    return hubPositions.slice(1).map((hub) => {
      // Calculate tangent departure vector from Mumbai toward destination
      const targetNorm = hub.pos.clone().normalize();
      const dot = Math.min(Math.max(mumbaiNorm.dot(targetNorm), -0.999), 0.999);
      const tangent = targetNorm.clone().sub(mumbaiNorm.clone().multiplyScalar(dot)).normalize();

      // Subtle outward start offset (~0.026 units) along each arc's own outbound trajectory
      const offsetStart = mumbaiNorm
        .clone()
        .add(tangent.multiplyScalar(0.026))
        .normalize()
        .multiplyScalar(radius * 1.016);

      return {
        name: hub.name,
        curve: createSphericalArc(offsetStart, hub.pos),
      };
    });
  }, [hubPositions, radius]);

  // 1. Core Arc Shader Material: directional brightness & opacity gradient from Mumbai outward
  const coreMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColorStart: { value: new THREE.Color("#FF6A3D") },
        uColorEnd: { value: new THREE.Color("#D64B1E") },
        uOpacityStart: { value: 0.96 },
        uOpacityEnd: { value: 0.65 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorStart;
        uniform vec3 uColorEnd;
        uniform float uOpacityStart;
        uniform float uOpacityEnd;
        varying vec2 vUv;
        void main() {
          float t = clamp(vUv.x, 0.0, 1.0);
          vec3 col = mix(uColorStart, uColorEnd, t);
          float alpha = mix(uOpacityStart, uOpacityEnd, t);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    });
  }, []);

  // 2. Additive Halo Glow Shader Material: soft ambient light emission around each corridor
  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColorStart: { value: new THREE.Color("#FF6A3D") },
        uColorEnd: { value: new THREE.Color("#D64B1E") },
        uOpacityStart: { value: 0.22 },
        uOpacityEnd: { value: 0.11 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorStart;
        uniform vec3 uColorEnd;
        uniform float uOpacityStart;
        uniform float uOpacityEnd;
        varying vec2 vUv;
        void main() {
          float t = clamp(vUv.x, 0.0, 1.0);
          vec3 col = mix(uColorStart, uColorEnd, t);
          float alpha = mix(uOpacityStart, uOpacityEnd, t);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
  }, []);

  return (
    <group rotation={[0, -1.35, 0]}>
      {/* 1. Base Earth Sphere (Photoreal NASA Albedo + Normal Relief) */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[radius, segments, segments]} />
        <meshStandardMaterial
          map={dayMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.35, 0.35)}
          roughness={0.55}
          metalness={0.02}
        />
      </mesh>

      {/* 2. Trade Corridor 3D Arcs: Dual Layer (Outer Additive Glow + Inner Gradient Core) */}
      {routeCurves.map((r, i) => (
        <group key={`arc-group-${i}`}>
          {/* A. Soft Light-Bloom Halo (Wider radius, AdditiveBlending) */}
          <mesh material={glowMaterial} raycast={() => null}>
            <tubeGeometry args={[r.curve, 36, 0.018, 6, false]} />
          </mesh>

          {/* B. Core Corridor Tube with Directional Gradient */}
          <mesh material={coreMaterial} raycast={() => null}>
            <tubeGeometry args={[r.curve, 48, 0.0055, 6, false]} />
          </mesh>
        </group>
      ))}

      {/* 3. 11 Interactive Trade Hub Markers with Hover Tooltips */}
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
    <div className="relative h-full w-full overflow-hidden select-none cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="h-full w-full bg-transparent overflow-hidden"
      >
        {/* Soft, photorealistic planet lighting with high fill to prevent black void crushing */}
        <hemisphereLight args={["#ffffff", "#4a5d6e", 1.45]} />
        <directionalLight position={[4.0, 3.0, 4.0]} intensity={1.2} />
        <directionalLight position={[-4.0, -2.0, -3.0]} intensity={0.7} />
        <directionalLight position={[0, 1.0, 5.0]} intensity={0.45} />

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
