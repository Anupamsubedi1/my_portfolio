'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PALETTE, type SceneTuning } from './sceneConfig';

interface FloatingTechObjectsProps {
  tuning: SceneTuning;
  scrollRef: React.MutableRefObject<number>;
}

type ShapeKey = 'box' | 'octa' | 'tetra';
const SHAPES: ShapeKey[] = ['box', 'octa', 'tetra'];

interface Item {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  spin: THREE.Vector3;
  drift: THREE.Vector3;
  scale: number;
  phase: number;
}

/**
 * Wireframe solids drifting through the field — the "digital fragments" layer.
 *
 * All objects of a shape share one InstancedMesh, so 34 solids cost three draw
 * calls rather than 34. Matrices are composed on the CPU, which is fine at this
 * count and lets each fragment keep its own drift and spin.
 *
 * They stay hidden until the second scroll phase, then fade and scale in.
 */
export default function FloatingTechObjects({ tuning, scrollRef }: FloatingTechObjectsProps) {
  const meshRefs = useRef<Record<ShapeKey, THREE.InstancedMesh | null>>({
    box: null,
    octa: null,
    tetra: null,
  });

  // Reused across frames so the loop allocates nothing.
  const scratch = useMemo(
    () => ({ matrix: new THREE.Matrix4(), quaternion: new THREE.Quaternion(), scale: new THREE.Vector3() }),
    []
  );

  const groups = useMemo(() => {
    const perShape = Math.max(1, Math.round(tuning.techObjects / SHAPES.length));
    const result: Record<ShapeKey, Item[]> = { box: [], octa: [], tetra: [] };

    SHAPES.forEach((shape, shapeIndex) => {
      for (let i = 0; i < perShape; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 7 + Math.random() * 11;
        result[shape].push({
          position: new THREE.Vector3(
            Math.cos(angle) * radius,
            (Math.random() * 2 - 1) * 5.5,
            Math.sin(angle) * radius - 3
          ),
          rotation: new THREE.Euler(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          ),
          spin: new THREE.Vector3(
            (Math.random() * 2 - 1) * 0.25,
            (Math.random() * 2 - 1) * 0.25,
            (Math.random() * 2 - 1) * 0.18
          ),
          drift: new THREE.Vector3(
            (Math.random() * 2 - 1) * 0.16,
            (Math.random() * 2 - 1) * 0.13,
            (Math.random() * 2 - 1) * 0.1
          ),
          scale: 0.28 + Math.random() * 0.62,
          phase: Math.random() * Math.PI * 2 + shapeIndex,
        });
      }
    });

    return result;
  }, [tuning.techObjects]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;

    // Phase 2 of the scroll story: hidden geometry emerges.
    const reveal = THREE.MathUtils.smoothstep(scroll, 0.28, 0.72);
    const step = tuning.animate ? Math.min(delta, 0.05) : 0;

    SHAPES.forEach((shape) => {
      const mesh = meshRefs.current[shape];
      const items = groups[shape];
      if (!mesh || items.length === 0) return;

      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0.5 * reveal;
      mesh.visible = reveal > 0.01;
      if (!mesh.visible) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (step > 0) {
          item.rotation.x += item.spin.x * step;
          item.rotation.y += item.spin.y * step;
          item.rotation.z += item.spin.z * step;
          item.position.addScaledVector(item.drift, step);

          // Soft box: fold drift back rather than letting fragments escape.
          if (Math.abs(item.position.x) > 20) item.drift.x *= -1;
          if (Math.abs(item.position.y) > 7) item.drift.y *= -1;
          if (Math.abs(item.position.z) > 14) item.drift.z *= -1;
        }

        // Bob independently, and grow in as the reveal progresses.
        const bob = Math.sin(t * 0.6 + item.phase) * 0.35;
        const s = item.scale * (0.35 + reveal * 0.65);

        scratch.quaternion.setFromEuler(item.rotation);
        scratch.scale.setScalar(s);
        scratch.matrix.compose(
          new THREE.Vector3(item.position.x, item.position.y + bob, item.position.z),
          scratch.quaternion,
          scratch.scale
        );
        mesh.setMatrixAt(i, scratch.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
    });
  });

  useEffect(() => {
    const meshes = meshRefs.current;
    return () => {
      SHAPES.forEach((shape) => {
        const mesh = meshes[shape];
        mesh?.geometry.dispose();
        (mesh?.material as THREE.Material | undefined)?.dispose();
      });
    };
  }, []);

  const shapeColor: Record<ShapeKey, string> = {
    box: PALETTE.cyan,
    octa: PALETTE.violet,
    tetra: PALETTE.ice,
  };

  return (
    <group>
      {SHAPES.map((shape) => {
        const count = groups[shape].length;
        if (count === 0) return null;

        return (
          <instancedMesh
            key={shape}
            ref={(node) => {
              meshRefs.current[shape] = node;
            }}
            args={[undefined, undefined, count]}
            frustumCulled={false}
          >
            {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
            {shape === 'octa' && <octahedronGeometry args={[0.7, 0]} />}
            {shape === 'tetra' && <tetrahedronGeometry args={[0.8, 0]} />}
            <meshBasicMaterial
              color={shapeColor[shape]}
              wireframe
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </instancedMesh>
        );
      })}
    </group>
  );
}
