'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Animated "neural constellation" behind the hero: drifting nodes joined by
 * links that fade in as nodes approach each other.
 *
 * Node motion is integrated on the CPU rather than displaced in the vertex
 * shader, so the link geometry and the points always agree - doing the drift
 * in the shader would leave the lines anchored to stale positions.
 *
 * Bails out cleanly when WebGL is unavailable, renders a single static frame
 * under `prefers-reduced-motion`, and parks the render loop while the hero is
 * scrolled out of view.
 */

const VERTEX_SHADER = /* glsl */ `
  attribute float aScale;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Each node breathes on its own offset so the field never pulses in unison.
    float twinkle = 0.78 + 0.22 * sin(uTime * 1.6 + aScale * 47.0);

    gl_PointSize = aScale * uPixelRatio * twinkle * (260.0 / max(-mvPosition.z, 0.001));

    vColor = aColor;
    // Fade nodes as they recede so the field reads as having depth.
    vAlpha = smoothstep(-26.0, -6.0, mvPosition.z);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 offset = gl_PointCoord - vec2(0.5);
    float dist = length(offset);
    if (dist > 0.5) discard;

    float glow = pow(smoothstep(0.5, 0.0, dist), 1.7);
    gl_FragColor = vec4(vColor, glow * vAlpha);
  }
`;

/** Palette per theme: [nodeA, nodeB, nodeC] and the link colour. */
const PALETTE = {
  light: {
    nodes: [0x2563eb, 0x4f46e5, 0xc026d3],
    link: new THREE.Color(0x4f46e5),
    linkOpacity: 0.5,
  },
  dark: {
    nodes: [0x60a5fa, 0x818cf8, 0xe879f9],
    link: new THREE.Color(0x818cf8),
    linkOpacity: 0.62,
  },
} as const;

const LINK_DISTANCE = 3.1;
const BOUNDS = { x: 13, y: 8, z: 6 };

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

export default function HeroCanvas({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !supportsWebGL()) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCompact = window.matchMedia('(max-width: 768px)').matches;
    const nodeCount = isCompact ? 58 : 108;
    // Worst case every pair links; sized once so the loop never reallocates.
    const maxLinks = (nodeCount * (nodeCount - 1)) / 2;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isCompact,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ---- nodes -------------------------------------------------------------
    const positions = new Float32Array(nodeCount * 3);
    const velocities = new Float32Array(nodeCount * 3);
    const scales = new Float32Array(nodeCount);
    const colors = new Float32Array(nodeCount * 3);

    const isDark = () => document.documentElement.classList.contains('dark');

    const paintNodes = () => {
      const palette = PALETTE[isDark() ? 'dark' : 'light'];
      const color = new THREE.Color();
      for (let i = 0; i < nodeCount; i++) {
        color.setHex(palette.nodes[i % palette.nodes.length]);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
    };

    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * BOUNDS.x;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * BOUNDS.y;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * BOUNDS.z;

      velocities[i * 3] = (Math.random() * 2 - 1) * 0.0075;
      velocities[i * 3 + 1] = (Math.random() * 2 - 1) * 0.0075;
      velocities[i * 3 + 2] = (Math.random() * 2 - 1) * 0.005;

      scales[i] = 5 + Math.random() * 9;
    }
    paintNodes();

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    nodeGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    nodeGeometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const nodeMaterial = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodes);

    // ---- links -------------------------------------------------------------
    const linkPositions = new Float32Array(maxLinks * 6);
    const linkColors = new Float32Array(maxLinks * 6);

    const linkGeometry = new THREE.BufferGeometry();
    linkGeometry.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3));
    linkGeometry.setAttribute('color', new THREE.BufferAttribute(linkColors, 3));

    const linkMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: PALETTE.light.linkOpacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const links = new THREE.LineSegments(linkGeometry, linkMaterial);
    scene.add(links);

    let linkColor = PALETTE.light.link.clone();

    const applyTheme = () => {
      const palette = PALETTE[isDark() ? 'dark' : 'light'];
      linkColor = palette.link.clone();
      linkMaterial.opacity = palette.linkOpacity;
      paintNodes();
      nodeGeometry.attributes.aColor.needsUpdate = true;
    };
    applyTheme();

    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    /** Rebuild link geometry from current node positions. */
    const buildLinks = () => {
      let cursor = 0;
      for (let i = 0; i < nodeCount; i++) {
        const ix = positions[i * 3];
        const iy = positions[i * 3 + 1];
        const iz = positions[i * 3 + 2];

        for (let j = i + 1; j < nodeCount; j++) {
          const dx = ix - positions[j * 3];
          const dy = iy - positions[j * 3 + 1];
          const dz = iz - positions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq > LINK_DISTANCE * LINK_DISTANCE) continue;

          // Nearer pairs draw brighter, so links bloom in rather than pop.
          const strength = 1 - Math.sqrt(distSq) / LINK_DISTANCE;
          const p = cursor * 6;

          linkPositions[p] = ix;
          linkPositions[p + 1] = iy;
          linkPositions[p + 2] = iz;
          linkPositions[p + 3] = positions[j * 3];
          linkPositions[p + 4] = positions[j * 3 + 1];
          linkPositions[p + 5] = positions[j * 3 + 2];

          const r = linkColor.r * strength;
          const g = linkColor.g * strength;
          const b = linkColor.b * strength;
          linkColors[p] = r;
          linkColors[p + 1] = g;
          linkColors[p + 2] = b;
          linkColors[p + 3] = r;
          linkColors[p + 4] = g;
          linkColors[p + 5] = b;

          cursor++;
        }
      }

      linkGeometry.setDrawRange(0, cursor * 2);
      linkGeometry.attributes.position.needsUpdate = true;
      linkGeometry.attributes.color.needsUpdate = true;
    };

    // ---- interaction -------------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // Stop burning frames once the hero has scrolled away.
    let visible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduceMotion && frameId === null) loop();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    // ---- render ------------------------------------------------------------
    const clock = new THREE.Clock();
    let frameId: number | null = null;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      nodeMaterial.uniforms.uTime.value = elapsed;

      for (let i = 0; i < nodeCount; i++) {
        const x = i * 3;
        const y = x + 1;
        const z = x + 2;

        positions[x] += velocities[x];
        positions[y] += velocities[y];
        positions[z] += velocities[z];

        // Reverse at the walls so the field stays evenly populated.
        if (positions[x] > BOUNDS.x || positions[x] < -BOUNDS.x) velocities[x] *= -1;
        if (positions[y] > BOUNDS.y || positions[y] < -BOUNDS.y) velocities[y] *= -1;
        if (positions[z] > BOUNDS.z || positions[z] < -BOUNDS.z) velocities[z] *= -1;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      buildLinks();

      // Ease the whole field opposite the cursor for a parallax feel.
      pointer.x += (target.x - pointer.x) * 0.04;
      pointer.y += (target.y - pointer.y) * 0.04;
      nodes.rotation.y = pointer.x * 0.16;
      nodes.rotation.x = pointer.y * 0.1;
      links.rotation.copy(nodes.rotation);

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!visible) {
        frameId = null;
        return;
      }
      renderFrame();
      frameId = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
      buildLinks();
      renderer.render(scene, camera);
    } else {
      loop();
    }

    // ---- teardown ----------------------------------------------------------
    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      linkGeometry.dispose();
      linkMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className={className} />;
}
