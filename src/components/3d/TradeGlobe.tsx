"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// Defined trade hub coordinates (lat/lng mapped to 3D sphere radius R=2.2)
const HUBS = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Sao Paulo", lat: -23.5505, lng: -46.6333 },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generates an elevated 3D arc curve between two spherical points
function createCurvedRoute(p1: THREE.Vector3, p2: THREE.Vector3, radius: number): THREE.Vector3[] {
  const distance = p1.distanceTo(p2);
  const mid = p1.clone().add(p2).multiplyScalar(0.5);
  // Elevate mid-point proportionally to distance
  const elevation = 1 + (distance / radius) * 0.35;
  mid.normalize().multiplyScalar(radius * elevation);

  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
  return curve.getPoints(32);
}

export function TradeGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRingsRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const prefersReducedMotion = useReducedMotion();

  const radius = 2.2;

  // Compute hub vectors
  const hubPositions = useMemo(() => {
    return HUBS.map((h) => latLngToVector3(h.lat, h.lng, radius));
  }, [radius]);

  // Defined trade corridors between hubs
  const routes = useMemo(() => {
    const pairs = [
      [0, 1], // NY - London
      [1, 2], // London - Mumbai
      [2, 3], // Mumbai - Singapore
      [3, 5], // Singapore - Tokyo
      [2, 4], // Mumbai - Dubai
      [1, 4], // London - Dubai
      [0, 6], // NY - Sao Paulo
      [7, 2], // Frankfurt - Mumbai
      [4, 3], // Dubai - Singapore
    ];

    return pairs.map(([i, j], idx) => {
      const p1 = hubPositions[i];
      const p2 = hubPositions[j];
      const points = createCurvedRoute(p1, p2, radius);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const isOrangeRoute = idx % 2 === 0;
      const material = new THREE.LineBasicMaterial({
        color: isOrangeRoute ? 0xff4d1c : 0x0a0a0a,
        transparent: true,
        opacity: isOrangeRoute ? 0.9 : 0.2,
      });
      return new THREE.Line(geometry, material);
    });
  }, [hubPositions, radius]);

  // Particle positions on sphere for matrix grid dots
  const gridPoints = useMemo(() => {
    const coords: number[] = [];
    const count = 480;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      coords.push(x, y, z);
    }
    return new Float32Array(coords);
  }, [radius]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!prefersReducedMotion) {
      // Gentle auto-rotation
      groupRef.current.rotation.y += delta * 0.15;

      // Mouse interactive tilt damping
      const targetRotationX = mouse.y * 0.35;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    }

    // Scroll reactivity
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const scrollFactor = scrollY * 0.0008;
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(scrollFactor) * 0.12;
    }

    // Pulse animation for hub halos
    if (pulseRingsRef.current) {
      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 3) * 0.25;
      pulseRingsRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Inner Solid Core (Off-white #F8F8F8) */}
      <mesh>
        <sphereGeometry args={[radius * 0.96, 32, 32]} />
        <meshBasicMaterial color="#FAFAFA" />
      </mesh>

      {/* 2. Outer Wireframe Polyhedron (Geometric Dark Graphic) */}
      <mesh>
        <icosahedronGeometry args={[radius, 3]} />
        <meshBasicMaterial
          color="#0A0A0A"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* 3. Secondary Outer Accent Ring (Subtle Orange Meridian) */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[radius * 1.08, radius * 1.09, 64]} />
        <meshBasicMaterial
          color="#FF4D1C"
          side={THREE.DoubleSide}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* 4. Matrix Point Grid (Dark Coordinates) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[gridPoints, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#0A0A0A"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>

      {/* 5. Curved Corridors / Flight Paths (Orange and White Lines) */}
      {routes.map((routeLine, idx) => (
        <primitive key={`route-${idx}`} object={routeLine} />
      ))}

      {/* 6. Hub Markers (Vivid Orange Nodes) */}
      <group>
        {hubPositions.map((pos, idx) => (
          <mesh key={`hub-${idx}`} position={pos}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshBasicMaterial color="#FF4D1C" />
          </mesh>
        ))}
      </group>

      {/* 7. Pulsating Halo Rings on Hubs */}
      <group ref={pulseRingsRef}>
        {hubPositions.map((pos, idx) => (
          <mesh key={`pulse-${idx}`} position={pos}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshBasicMaterial
              color="#FF4D1C"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
