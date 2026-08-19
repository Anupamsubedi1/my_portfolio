'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor, Preload } from '@react-three/drei';
import * as THREE from 'three';
import DeveloperCore from './DeveloperCore';
import ParticleGalaxy from './ParticleGalaxy';
import FloatingTechObjects from './FloatingTechObjects';
import SceneLighting from './SceneLighting';
import { PALETTE, getTuning, resolveTier, type SceneTuning } from './sceneConfig';

interface HeroSceneProps {
  scrollRef: React.MutableRefObject<number>;
}

const POINTER_ZERO = { x: 0, y: 0 };

/**
 * Cinematic camera: a slow lissajous drift plus a small, heavily damped pull
 * toward the cursor. The damping is the whole trick — an undamped camera that
 * tracks the mouse 1:1 feels cheap and makes people motion-sick. This lags far
 * enough behind that it reads as weight.
 */
function CameraRig({
  scrollRef,
  pointerRef,
  animate,
}: {
  scrollRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  animate: boolean;
}) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const lookAt = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state, delta) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;
    const pointer = pointerRef.current;

    // Ambient drift, independent of input.
    const driftX = Math.sin(t * 0.13) * 1.15;
    const driftY = Math.cos(t * 0.1) * 0.75;

    target.set(
      driftX + pointer.x * 2.1,
      driftY + pointer.y * 1.3,
      // Pull back through the scroll so the expanding galaxy stays in frame.
      15 + scroll * 7.5
    );

    // Frame-rate independent damping toward the target.
    const lerp = 1 - Math.pow(0.0015, delta);
    camera.position.lerp(target, lerp);

    // Drop the look-at point slightly on scroll for a subtle tilt.
    lookAt.set(0, -scroll * 1.4, 0);
    camera.lookAt(lookAt);
  });

  return null;
}

/** Tracks the pointer into a ref. Never sets state, so it never re-renders. */
function usePointerTracking(enabled: boolean) {
  const pointerRef = useRef({ ...POINTER_ZERO });

  useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    // Recentre when the cursor leaves, so the scene settles rather than sticking.
    const onPointerLeave = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [enabled]);

  return pointerRef;
}

export default function HeroScene({ scrollRef }: HeroSceneProps) {
  // Resolved once on the client; the tier depends on APIs that do not exist on
  // the server, and re-resolving would rebuild every buffer.
  const [tuning, setTuning] = useState<SceneTuning | null>(null);
  const [degraded, setDegraded] = useState(false);

  useEffect(() => {
    setTuning(getTuning(resolveTier()));
  }, []);

  const pointerRef = usePointerTracking(Boolean(tuning?.animate));

  if (!tuning) return null;

  // If the monitor reports sustained low FPS, drop the post chain first — it is
  // the most expensive thing here and the least structural.
  const effective: SceneTuning = degraded
    ? { ...tuning, postProcessing: false, bloom: 0 }
    : tuning;

  return (
    <Canvas
      // `frameloop="demand"` would stall the ambient animation, so we stay on
      // "always" but keep the per-frame cost low instead.
      dpr={[1, effective.maxDpr]}
      gl={{
        antialias: false, // bloom hides aliasing; MSAA is not worth the fill rate
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 15], fov: 55, near: 0.1, far: 120 }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(new THREE.Color(PALETTE.background), 1);
        scene.background = new THREE.Color(PALETTE.background);
      }}
    >
      <PerformanceMonitor
        onDecline={() => setDegraded(true)}
        // Only react to a sustained decline, not a single slow frame.
        flipflops={3}
      />
      <AdaptiveDpr pixelated={false} />

      <CameraRig scrollRef={scrollRef} pointerRef={pointerRef} animate={effective.animate} />
      <SceneLighting tuning={effective} scrollRef={scrollRef} />

      <DeveloperCore tuning={effective} scrollRef={scrollRef} pointerRef={pointerRef} />
      <ParticleGalaxy tuning={effective} scrollRef={scrollRef} pointerRef={pointerRef} />
      <FloatingTechObjects tuning={effective} scrollRef={scrollRef} />

      <Preload all />
    </Canvas>
  );
}
