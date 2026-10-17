"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";

// Zone X coordinate mapping:
// 0 (Farm): -12
// 1 (Processing): -4
// 2 (Packaging): 4
// 3 (Port): 12
const getZoneX = (idx) => (idx - 1.5) * 8;

/* ─────────────────────────────────────────────────────────────
   ZONE 1: FARM (X: -16 to -8)
   ───────────────────────────────────────────────────────────── */
function FarmZone() {
  const cropsRef = useRef([]);

  useFrame((state) => {
    // Sway the crop plants with a sine wave
    const time = state.clock.getElapsedTime();
    cropsRef.current.forEach((crop, idx) => {
      if (crop) {
        crop.rotation.z = Math.sin(time * 2 + idx) * 0.05;
        crop.rotation.x = Math.cos(time * 1.5 + idx) * 0.03;
      }
    });
  });

  return (
    <group position={[-12, 0, 0]}>
      {/* Sunset Sunrise Glow Source */}
      <mesh position={[2, 1.5, -6]} id="farm-sunrise">
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#D9B27A" />
      </mesh>

      {/* Barn Silhouette */}
      <group position={[-4, 0, -4]}>
        <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 2.5, 3]} />
          <meshStandardMaterial color="#14171A" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.8, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <boxGeometry args={[2.2, 2.2, 3.2]} />
          <meshStandardMaterial color="#0E1012" roughness={0.8} />
        </mesh>
      </group>

      {/* Far Landscape Hills */}
      <mesh position={[0, -1, -5]} rotation={[0, 0.2, 0]}>
        <coneGeometry args={[10, 5, 4]} />
        <meshStandardMaterial color="#14171A" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[-6, -1.2, -7]} rotation={[0, -0.1, 0]}>
        <coneGeometry args={[12, 6, 4]} />
        <meshStandardMaterial color="#0E1012" roughness={0.9} flatShading />
      </mesh>

      {/* Crops field grid */}
      <group position={[0, 0.1, 0]}>
        {Array.from({ length: 18 }).map((_, idx) => {
          const row = Math.floor(idx / 6);
          const col = idx % 6;
          const px = -2.5 + col * 1.0 + Math.random() * 0.1;
          const pz = -1.5 + row * 1.2 + Math.random() * 0.1;
          return (
            <group
              key={idx}
              position={[px, 0, pz]}
              ref={(el) => (cropsRef.current[idx] = el)}
            >
              {/* Stem */}
              <mesh position={[0, 0.4, 0]} castShadow>
                <cylinderGeometry args={[0.04, 0.06, 0.8, 8]} />
                <meshStandardMaterial color="#C8A06D" roughness={0.8} />
              </mesh>
              {/* Leaves / Seeds */}
              <mesh position={[-0.1, 0.6, 0]} rotation={[0, 0, 0.4]}>
                <boxGeometry args={[0.2, 0.08, 0.1]} />
                <meshStandardMaterial color="#D9B27A" roughness={0.7} />
              </mesh>
              <mesh position={[0.1, 0.75, 0]} rotation={[0, 0, -0.4]}>
                <boxGeometry args={[0.22, 0.08, 0.1]} />
                <meshStandardMaterial color="#D9B27A" roughness={0.7} />
              </mesh>
              <mesh position={[0, 0.85, 0]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshStandardMaterial color="#F5F1EA" roughness={0.5} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   ZONE 2: PROCESSING (X: -8 to 0)
   ───────────────────────────────────────────────────────────── */
function ProcessingZone() {
  const sacksRef = useRef([]);

  useFrame((state) => {
    // Move sacks along the conveyor belt
    const speed = 1.2;
    const time = state.clock.getElapsedTime();
    sacksRef.current.forEach((sack, idx) => {
      if (sack) {
        // Offset starting positions, loop from x = -3 to x = 3
        const offset = idx * 2.0;
        let xPos = -3.5 + ((time * speed + offset) % 7.0);
        sack.position.x = xPos;
        // Subtle vertical bounce
        sack.position.y = 0.55 + Math.abs(Math.sin(xPos * 3)) * 0.05;
      }
    });
  });

  return (
    <group position={[-4, 0, 0]}>
      {/* Sorting Terminal Console */}
      <group position={[0, 0.5, -2.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#14171A" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.65, 0.2]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[1.8, 0.6, 0.1]} />
          <meshStandardMaterial color="#0E1012" emissive="#C8A06D" emissiveIntensity={0.15} roughness={0.2} />
        </mesh>
        {/* Blinking Warning indicators */}
        <mesh position={[-0.7, 0.3, 0.6]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#D9B27A" />
        </mesh>
      </group>

      {/* Industrial Machine Case */}
      <mesh position={[0, 1.8, -2.8]} castShadow>
        <boxGeometry args={[3.2, 2.2, 1.8]} />
        <meshStandardMaterial color="#0E1012" roughness={0.7} metalness={0.8} />
      </mesh>

      {/* Laser Inspection Beam */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2.2, 8]} />
        <meshBasicMaterial color="#D9B27A" />
      </mesh>

      {/* Conveyor Belt System */}
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[7.2, 0.28, 1.2]} />
        <meshStandardMaterial color="#14171A" roughness={0.7} metalness={0.5} />
      </mesh>
      {/* Conveyor Supports */}
      <mesh position={[-2.8, 0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
        <meshStandardMaterial color="#0E1012" />
      </mesh>
      <mesh position={[2.8, 0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
        <meshStandardMaterial color="#0E1012" />
      </mesh>

      {/* Telemetry Indicator Ring */}
      <group position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[0.6, 0.64, 32]} />
          <meshBasicMaterial color="#D9B27A" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Moving Sacks */}
      {Array.from({ length: 3 }).map((_, idx) => (
        <group
          key={idx}
          ref={(el) => (sacksRef.current[idx] = el)}
          position={[0, 0.5, 0]}
        >
          <mesh castShadow>
            <boxGeometry args={[0.7, 0.5, 0.5]} />
            <meshStandardMaterial color="#191D21" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial color="#D9B27A" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   ZONE 3: PACKAGING (X: 0 to 8)
   ───────────────────────────────────────────────────────────── */
function PackagingZone() {
  return (
    <group position={[4, 0, 0]}>
      {/* Packing Table Worktop */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.2, 0.15, 2.0]} />
        <meshStandardMaterial color="#14171A" roughness={0.6} />
      </mesh>
      {/* Table Legs */}
      <mesh position={[-2.8, 0.25, 0.8]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#0E1012" />
      </mesh>
      <mesh position={[2.8, 0.25, 0.8]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#0E1012" />
      </mesh>
      <mesh position={[-2.8, 0.25, -0.8]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#0E1012" />
      </mesh>
      <mesh position={[2.8, 0.25, -0.8]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#0E1012" />
      </mesh>

      {/* Label Printer Equipment */}
      <group position={[-1.8, 0.95, -0.4]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.8, 1.0]} />
          <meshStandardMaterial color="#0E1012" roughness={0.5} metalness={0.7} />
        </mesh>
        {/* Label strip exiting printer */}
        <mesh position={[0, -0.35, 0.55]} rotation={[0.2, 0, 0]}>
          <planeGeometry args={[0.6, 0.4]} />
          <meshStandardMaterial color="#191D21" emissive="#D9B27A" emissiveIntensity={0.05} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Premium Export Bulk Sacks */}
      <group position={[0.4, 0.9, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.45, 0.55, 0.9, 16]} />
          <meshStandardMaterial color="#191D21" roughness={0.8} />
        </mesh>
        {/* Golden Tag */}
        <mesh position={[0.2, 0.3, 0.45]} rotation={[0.2, 0.4, 0]}>
          <boxGeometry args={[0.28, 0.4, 0.02]} />
          <meshStandardMaterial color="#D9B27A" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Muted Spice Jars */}
      <group position={[1.6, 0.75, 0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.45, 12]} />
          <meshStandardMaterial color="#14171A" roughness={0.2} transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 12]} />
          <meshStandardMaterial color="#C8A06D" roughness={0.5} metalness={0.8} />
        </mesh>
      </group>
      <group position={[2.2, 0.75, -0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.45, 12]} />
          <meshStandardMaterial color="#14171A" roughness={0.2} transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 12]} />
          <meshStandardMaterial color="#C8A06D" roughness={0.5} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   ZONE 4: PORT (X: 8 to 16)
   ───────────────────────────────────────────────────────────── */
function PortZone() {
  const craneHookRef = useRef(null);

  useFrame((state) => {
    // Crane hook dynamic sway
    const time = state.clock.getElapsedTime();
    if (craneHookRef.current) {
      craneHookRef.current.position.y = 3.6 + Math.sin(time * 0.8) * 0.25;
    }
  });

  return (
    <group position={[12, 0, 0]}>
      {/* Moon / Night Light in background */}
      <mesh position={[4, 5, -8]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#E7DDD0" />
      </mesh>

      {/* Cargo Ship Hull (Asymmetrical geometric representation) */}
      <mesh position={[3.5, -0.1, -1.8]} rotation={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[6.2, 1.4, 3.0]} />
        <meshStandardMaterial color="#0E1012" roughness={0.8} />
      </mesh>

      {/* Water grid/plane */}
      <mesh position={[0, -0.7, 1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#0E1012" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Dock Floor Platform */}
      <mesh position={[-3, -0.2, -1]} castShadow receiveShadow>
        <boxGeometry args={[6.2, 0.8, 4.0]} />
        <meshStandardMaterial color="#14171A" roughness={0.9} />
      </mesh>

      {/* Stacking Containers */}
      <group position={[-3.5, 0.5, -1.5]}>
        {/* Navy Container */}
        <mesh position={[-0.8, 0, 0.2]} castShadow>
          <boxGeometry args={[1.5, 0.65, 0.7]} />
          <meshStandardMaterial color="#191D21" roughness={0.8} />
        </mesh>
        {/* Charcoal Container */}
        <mesh position={[0.8, 0, -0.2]} castShadow>
          <boxGeometry args={[1.5, 0.65, 0.7]} />
          <meshStandardMaterial color="#0E1012" roughness={0.8} />
        </mesh>
        {/* Gold Container (Stacked on top) */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <boxGeometry args={[1.5, 0.65, 0.7]} />
          <meshStandardMaterial color="#C8A06D" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>

      {/* Port Crane Structure */}
      <group position={[-1.2, 0.2, -2.5]}>
        {/* Vertical Truss */}
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[0.2, 4.0, 0.2]} />
          <meshStandardMaterial color="#14171A" />
        </mesh>
        {/* Horizontal Crane Arm */}
        <mesh position={[1.5, 4.0, 0]} castShadow>
          <boxGeometry args={[4.2, 0.15, 0.2]} />
          <meshStandardMaterial color="#0E1012" />
        </mesh>
        {/* Support Truss */}
        <mesh position={[0.6, 3.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[1.5, 0.1, 0.1]} />
          <meshStandardMaterial color="#14171A" />
        </mesh>

        {/* Suspended branded Golden container */}
        <group ref={craneHookRef} position={[2.5, 3.6, 0]}>
          {/* Crane cable */}
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 1.6, 4]} />
            <meshBasicMaterial color="#D9B27A" />
          </mesh>
          {/* Golden Cargo Container */}
          <mesh castShadow>
            <boxGeometry args={[1.4, 0.6, 0.6]} />
            <meshStandardMaterial color="#D9B27A" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   CAMERA CONTROLLER & MOUSE PARALLAX LERP
   ───────────────────────────────────────────────────────────── */
function CameraController({ activeStep, hoveredStep, introFinished }) {
  const { camera } = useThree();
  const targetX = useRef(getZoneX(3)); // Default to Port view on load

  useEffect(() => {
    // Find targets
    const targetIdx = hoveredStep !== null ? hoveredStep : activeStep;
    const destX = getZoneX(targetIdx);

    if (!introFinished) {
      // Direct hard updates during intro transitions
      gsap.to(camera.position, {
        x: destX,
        y: 1.8,
        z: 6.8,
        duration: 1.4,
        ease: "power3.inOut"
      });
      targetX.current = destX;
    } else {
      // Set baseline target for active step tick lerp
      targetX.current = destX;
    }
  }, [activeStep, hoveredStep, introFinished, camera]);

  useFrame((state) => {
    if (introFinished) {
      const pointer = state.pointer; // ranges -1 to 1

      // Subtle mouse drift coordinates (max 2 units X, 1 unit Y)
      const driftX = pointer.x * 1.8;
      const driftY = pointer.y * 1.0;

      // Heavy camera translation LERP calculation
      camera.position.x += (targetX.current + driftX - camera.position.x) * 0.06;
      camera.position.y += (1.8 + driftY - camera.position.y) * 0.06;
      camera.position.z += (6.8 - camera.position.z) * 0.06;

      // Ensure camera looks slightly down and focus stays central
      camera.lookAt(new THREE.Vector3(camera.position.x, 0.6, 0));
    }
  });

  return null;
}

/* ─────────────────────────────────────────────────────────────
   MAIN WEBGL SCENE COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function WebGLWorld({ activeStep, hoveredStep, introFinished }) {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ pointerEvents: "none" }}
    >
      <PerspectiveCamera makeDefault position={[getZoneX(0), 1.8, 6.8]} fov={45} />
      <CameraController
        activeStep={activeStep}
        hoveredStep={hoveredStep}
        introFinished={introFinished}
      />

      {/* Atmospheric Fog */}
      <fog attach="fog" args={["#0E1012", 4, 18]} />

      {/* Ambient Lighting */}
      <ambientLight intensity={0.4} color="#F5F1EA" />

      {/* Master Directional Sun / Light source */}
      <directionalLight
        position={[2, 6, 4]}
        intensity={2.8}
        color="#D9B27A"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      
      {/* Soft Fill Light from opposite direction */}
      <directionalLight
        position={[-8, 3, -2]}
        intensity={0.6}
        color="#E7DDD0"
      />

      {/* Ground Floor Plane (shared base) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.4, 0]}>
        <planeGeometry args={[100, 30]} />
        <meshStandardMaterial color="#0E1012" roughness={0.9} />
      </mesh>

      {/* Sparkles (ambient atmospheric particles) */}
      <Sparkles count={40} scale={[30, 4, 10]} size={1.2} speed={0.4} color="#D9B27A" />

      {/* Zones */}
      <FarmZone />
      <ProcessingZone />
      <PackagingZone />
      <PortZone />

      {/* Cinematic Post Processing Effects */}
      <EffectComposer>
        <DepthOfField
          focusDistance={0.012}
          focalLength={0.03}
          bokehScale={2.2}
          height={480}
        />
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        <Noise opacity={0.035} />
        <Vignette eskil={false} offset={0.15} darkness={1.0} />
      </EffectComposer>
    </Canvas>
  );
}