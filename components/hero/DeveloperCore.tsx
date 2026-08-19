'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CORE_FRAGMENT, CORE_VERTEX } from './CustomShaders';
import type { SceneTuning } from './sceneConfig';

interface DeveloperCoreProps {
  tuning: SceneTuning;
  /** Live scroll progress, 0..1. A ref so scrolling never re-renders React. */
  scrollRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
}

/**
 * The nucleus of the scene: a noise-displaced icosahedron wrapped in a
 * wireframe shell and an outer glow hull.
 *
 * The three layers share one clock so they breathe together — the shell and
 * hull counter-rotate against the core, which gives the parallax that makes it
 * read as volumetric rather than as a flat sphere.
 */
export default function DeveloperCore({ tuning, scrollRef, pointerRef }: DeveloperCoreProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const hullRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPulse: { value: 0 },
      uPointer: { value: 0 },
      uScroll: { value: 0 },
      uColorDeep: { value: new THREE.Color('#1E3A8A') },
      uColorMid: { value: new THREE.Color('#3B82F6') },
      uColorHot: { value: new THREE.Color('#67E8F9') },
    }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;
    const pointer = pointerRef.current;

    if (materialRef.current) {
      const u = materialRef.current.uniforms;
      u.uTime.value = t;
      u.uPulse.value = 0.5 + 0.5 * Math.sin(t * 1.35);
      u.uScroll.value = scroll;
      // Distance of the cursor from centre, clamped — drives surface tension.
      u.uPointer.value = Math.min(1, Math.hypot(pointer.x, pointer.y));
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.14;
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.16 + pointer.y * 0.18;
      coreRef.current.rotation.z = pointer.x * 0.12;
      // Recedes slightly as the galaxy takes over on scroll.
      const s = 1 - scroll * 0.28;
      coreRef.current.scale.setScalar(s);
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.09;
      shellRef.current.rotation.x += delta * 0.045;
      shellRef.current.scale.setScalar(1.36 + Math.sin(t * 1.1) * 0.035 - scroll * 0.3);
      const shellMat = shellRef.current.material as THREE.MeshBasicMaterial;
      shellMat.opacity = 0.16 * (1 - scroll * 0.7);
    }

    if (hullRef.current) {
      hullRef.current.rotation.y += delta * 0.05;
      hullRef.current.scale.setScalar(1.85 + Math.sin(t * 0.8 + 1.2) * 0.05 - scroll * 0.4);
      const hullMat = hullRef.current.material as THREE.MeshBasicMaterial;
      hullMat.opacity = 0.06 * (1 - scroll * 0.8);
    }
  });

  return (
    <group>
      {/* Displaced, shaded nucleus */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, tuning.coreDetail]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={CORE_VERTEX}
          fragmentShader={CORE_FRAGMENT}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Wireframe cage */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#7DD3FC"
          wireframe
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Soft outer hull, sells the volumetric glow */}
      <mesh ref={hullRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#A78BFA"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
