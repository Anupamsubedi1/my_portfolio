'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import * as THREE from 'three';
import { PALETTE, type SceneTuning } from './sceneConfig';

interface SceneLightingProps {
  tuning: SceneTuning;
  scrollRef: React.MutableRefObject<number>;
}

/**
 * Lighting, atmosphere and the post chain.
 *
 * Almost every material in this scene is additive and unlit, so the lights are
 * doing less work than they would in a normal scene — the glow comes from the
 * bloom pass picking up bright additive pixels. The lights exist to give the
 * wireframe solids and the core some directional shape.
 */
export default function SceneLighting({ tuning, scrollRef }: SceneLightingProps) {
  const keyLight = useRef<THREE.PointLight>(null);
  const rimLight = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!tuning.animate) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;

    // Slow orbit gives the core a moving highlight instead of a static one.
    if (keyLight.current) {
      keyLight.current.position.x = Math.sin(t * 0.28) * 7;
      keyLight.current.position.z = Math.cos(t * 0.28) * 7;
      keyLight.current.intensity = 24 + Math.sin(t * 1.4) * 6;
    }
    if (rimLight.current) {
      rimLight.current.position.x = Math.sin(t * 0.21 + Math.PI) * 9;
      rimLight.current.position.y = Math.cos(t * 0.19) * 5;
      rimLight.current.intensity = 18 + Math.cos(t * 1.1) * 5;
    }

    // Pull the fog back as the galaxy expands, so the wider scene stays legible
    // instead of the new outer shells being swallowed by atmosphere.
    const fog = state.scene.fog as THREE.Fog | null;
    if (fog) {
      fog.near = 14 + scroll * 9;
      fog.far = 46 + scroll * 26;
    }
  });

  return (
    <>
      {/* Atmospheric depth — far shells dissolve into the background colour. */}
      <fog attach="fog" args={[PALETTE.fog, 14, 46]} />

      <ambientLight intensity={0.18} color={PALETTE.white} />
      <pointLight ref={keyLight} position={[6, 4, 6]} intensity={24} color={PALETTE.cyan} distance={40} decay={2} />
      <pointLight ref={rimLight} position={[-8, -3, -4]} intensity={18} color={PALETTE.violet} distance={40} decay={2} />
      <directionalLight position={[0, 8, 4]} intensity={0.5} color={PALETTE.ice} />

      {tuning.postProcessing && (
        <EffectComposer
          // The scene has no opaque geometry worth a depth pre-pass.
          enableNormalPass={false}
          multisampling={0}
        >
          <Bloom
            intensity={tuning.bloom}
            luminanceThreshold={0.52}
            luminanceSmoothing={0.35}
            kernelSize={KernelSize.LARGE}
            mipmapBlur
          />
          <Vignette
            offset={0.18}
            darkness={0.92}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      )}
    </>
  );
}
