'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GALAXY_FRAGMENT, GALAXY_VERTEX } from './CustomShaders';
import { PARTICLE_COLORS, type SceneTuning } from './sceneConfig';

interface ParticleGalaxyProps {
  tuning: SceneTuning;
  scrollRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
}

/**
 * Two cooperating systems that look like one:
 *
 *  1. The galaxy — thousands of points whose orbits are solved entirely in the
 *     vertex shader. No CPU loop touches them, so raising the count costs GPU
 *     fill rate and essentially no JavaScript.
 *
 *  2. The neural mesh — a much smaller set of nodes integrated on the CPU, with
 *     lines drawn between near neighbours. Link-finding is O(n^2) and needs real
 *     positions in JS, which is exactly what a GPU-only system cannot give you.
 *     Hence the split: GPU for volume, CPU for the handful that must be linked.
 */
export default function ParticleGalaxy({ tuning, scrollRef, pointerRef }: ParticleGalaxyProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const frameCount = useRef(0);
  const nodePointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  /* ---------------- GPU galaxy ---------------- */

  const galaxy = useMemo(() => {
    const count = tuning.particles;
    const positions = new Float32Array(count * 3); // required by three; shader overrides
    const radius = new Float32Array(count);
    const angle = new Float32Array(count);
    const speed = new Float32Array(count);
    const scale = new Float32Array(count);
    const layer = new Float32Array(count);
    const seed = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Three depth shells, weighted so the middle band is densest.
      const shell = Math.random();
      const l = shell < 0.45 ? 0 : shell < 0.8 ? 0.5 : 1;

      radius[i] = 3.2 + l * 6.5 + Math.pow(Math.random(), 0.65) * 9;
      angle[i] = Math.random() * Math.PI * 2;
      // Inner orbits sweep faster, like an accretion disc.
      speed[i] = (0.055 + Math.random() * 0.1) * (1 - l * 0.55);
      scale[i] = 1.6 + Math.random() * 5.4 * (1 - l * 0.35);
      layer[i] = l;
      seed[i] = Math.random();

      color.set(PARTICLE_COLORS[(Math.random() * PARTICLE_COLORS.length) | 0]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aRadius', new THREE.BufferAttribute(radius, 1));
    geometry.setAttribute('aAngle', new THREE.BufferAttribute(angle, 1));
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    geometry.setAttribute('aLayer', new THREE.BufferAttribute(layer, 1));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    // Points never leave this radius, so skip per-frame bounds computation.
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 40);

    return geometry;
  }, [tuning.particles]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPixelRatio: { value: 1 },
      uPointerX: { value: 0 },
      uPointerY: { value: 0 },
    }),
    []
  );

  /* ---------------- CPU neural mesh ---------------- */

  const mesh = useMemo(() => {
    const count = tuning.nodes;
    if (count === 0) return null;

    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const maxLinks = (count * (count - 1)) / 2;

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * 11;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * 6;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * 5;
      velocities[i * 3] = (Math.random() * 2 - 1) * 0.012;
      velocities[i * 3 + 1] = (Math.random() * 2 - 1) * 0.012;
      velocities[i * 3 + 2] = (Math.random() * 2 - 1) * 0.008;
      sizes[i] = 3 + Math.random() * 4;
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    nodeGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const linkGeometry = new THREE.BufferGeometry();
    linkGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(maxLinks * 6), 3)
    );

    return { positions, velocities, nodeGeometry, linkGeometry };
  }, [tuning.nodes]);

  const LINK_DISTANCE = 4.2;
  const BOUNDS = { x: 12, y: 6.5, z: 5.5 };

  const rebuildLinks = (scroll: number) => {
    if (!mesh || !linesRef.current) return;
    const { positions, linkGeometry } = mesh;
    const target = linkGeometry.attributes.position.array as Float32Array;
    const count = tuning.nodes;

    // Links reach further as the scene resolves into a network.
    const reach = LINK_DISTANCE * (1 + scroll * 0.55);
    const reachSq = reach * reach;

    let cursor = 0;
    for (let i = 0; i < count; i++) {
      const ix = positions[i * 3];
      const iy = positions[i * 3 + 1];
      const iz = positions[i * 3 + 2];

      for (let j = i + 1; j < count; j++) {
        const dx = ix - positions[j * 3];
        const dy = iy - positions[j * 3 + 1];
        const dz = iz - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz > reachSq) continue;

        const p = cursor * 6;
        target[p] = ix;
        target[p + 1] = iy;
        target[p + 2] = iz;
        target[p + 3] = positions[j * 3];
        target[p + 4] = positions[j * 3 + 1];
        target[p + 5] = positions[j * 3 + 2];
        cursor++;
      }
    }

    linkGeometry.setDrawRange(0, cursor * 2);
    linkGeometry.attributes.position.needsUpdate = true;
  };

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;
    const pointer = pointerRef.current;

    if (materialRef.current) {
      const u = materialRef.current.uniforms;
      u.uTime.value = t;
      u.uScroll.value = scroll;
      u.uPixelRatio.value = state.gl.getPixelRatio();
      u.uPointerX.value = pointer.x;
      u.uPointerY.value = pointer.y;
    }

    if (!mesh || !tuning.animate) return;

    const { positions, velocities, nodeGeometry } = mesh;
    // delta-scaled so motion is frame-rate independent; 60 is the reference.
    const step = Math.min(delta, 0.05) * 60;

    for (let i = 0; i < tuning.nodes; i++) {
      const x = i * 3;
      const y = x + 1;
      const z = x + 2;
      positions[x] += velocities[x] * step;
      positions[y] += velocities[y] * step;
      positions[z] += velocities[z] * step;
      if (positions[x] > BOUNDS.x || positions[x] < -BOUNDS.x) velocities[x] *= -1;
      if (positions[y] > BOUNDS.y || positions[y] < -BOUNDS.y) velocities[y] *= -1;
      if (positions[z] > BOUNDS.z || positions[z] < -BOUNDS.z) velocities[z] *= -1;
    }
    nodeGeometry.attributes.position.needsUpdate = true;

    // Link-finding is O(n^2) and the nodes drift slowly, so recomputing it
    // every third frame is indistinguishable and a third of the cost.
    frameCount.current += 1;
    if (frameCount.current % 3 === 0) rebuildLinks(scroll);

    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      // Network only asserts itself in the final scroll phase.
      mat.opacity = 0.05 + scroll * 0.3 + Math.sin(t * 0.8) * 0.015;
    }
    if (nodePointsRef.current) {
      const mat = nodePointsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.35 + scroll * 0.45;
    }
  });

  // Seed the link geometry once so the first frame is not empty.
  useEffect(() => {
    rebuildLinks(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mesh]);

  useEffect(() => {
    return () => {
      galaxy.dispose();
      mesh?.nodeGeometry.dispose();
      mesh?.linkGeometry.dispose();
    };
  }, [galaxy, mesh]);

  return (
    <group>
      <points geometry={galaxy} frustumCulled={false}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={GALAXY_VERTEX}
          fragmentShader={GALAXY_FRAGMENT}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {mesh && (
        <>
          <points ref={nodePointsRef} geometry={mesh.nodeGeometry}>
            <pointsMaterial
              size={0.09}
              color="#67E8F9"
              transparent
              opacity={0.35}
              sizeAttenuation
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>

          <lineSegments ref={linesRef} geometry={mesh.linkGeometry} frustumCulled={false}>
            <lineBasicMaterial
              color="#38BDF8"
              transparent
              opacity={0.05}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </lineSegments>
        </>
      )}
    </group>
  );
}
