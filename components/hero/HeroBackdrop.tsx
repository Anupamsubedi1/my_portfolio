'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

/**
 * The ONLY part of the hero that opts out of server rendering.
 *
 * WebGL cannot run on a server - there is no `document` and no GPU context - so
 * the scene must be `ssr: false`. That is safe here precisely because this
 * component renders no text: the headline, tagline and buttons live in
 * Hero.tsx, which is a server component. Crawlers get the copy from the HTML
 * and never need the canvas, which is why it is `aria-hidden`.
 *
 * It also keeps the three.js bundle off the critical path - it is by far the
 * largest chunk on the site and must never be statically imported.
 */
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

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

export default function HeroBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  /** Scroll progress 0..1 through the hero. A ref, so scrolling never re-renders. */
  const scrollRef = useRef(0);
  const [ready, setReady] = useState(false);
  /** Whether the hero is on screen at all. Drives the render loop. */
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    if (!supportsWebGL()) return;

    // Under reduced-motion the scene renders a single frozen frame - not worth
    // downloading ~250KB gzipped of three.js for. The gradient below is the
    // whole visual in that case.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Wait for an idle moment rather than the next frame. three.js is by far the
    // largest chunk on the site, and fetching + parsing it while the browser is
    // still laying out and painting the page is what makes first load feel slow.
    // The gradient backdrop is already on screen, so nothing looks unfinished.
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const w = window as IdleWindow;

    if (typeof w.requestIdleCallback === 'function') {
      // Cap the wait so a permanently busy main thread still gets the scene.
      const handle = w.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(handle);
    }

    const timer = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  // Freeze the scene the moment the hero leaves the viewport. Without this the
  // GPU keeps drawing the galaxy while the user reads the rest of the page,
  // which is felt as scroll jank in every other section.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;

    const element = containerRef.current;
    if (!element) return;

    // Read scroll straight into a ref on rAF rather than through React state.
    // A state update per scroll event would re-render the tree ~60x a second.
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const travelled = window.innerHeight - rect.top;
      scrollRef.current = Math.min(1, Math.max(0, travelled / total));
    };
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    // Only track scroll while the scene can actually react to it.
    if (!onScreen) return;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ready, onScreen]);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 z-0">
      {/* Painted immediately and never removed: it is the backdrop the canvas
          composites over, and the complete visual if WebGL is unavailable. */}
      <div className="absolute inset-0 bg-[#030712]" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(59,130,246,0.10), transparent 62%),' +
            'radial-gradient(ellipse 50% 45% at 78% 28%, rgba(139,92,246,0.08), transparent 64%),' +
            'radial-gradient(ellipse 55% 40% at 20% 72%, rgba(34,211,238,0.06), transparent 62%)',
        }}
      />

      {ready && (
        <div className="absolute inset-0">
          <HeroScene scrollRef={scrollRef} active={onScreen} />
        </div>
      )}

      {/* Readability scrim. The scene is brightest dead centre, which is exactly
          where the headline sits - this buys contrast without dimming the edges. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(3,7,18,0.72),transparent_75%)]" />

      {/* Fades the scene into the section below so the seam is invisible. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#030712]" />
    </div>
  );
}
