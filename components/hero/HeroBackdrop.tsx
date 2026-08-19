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

  useEffect(() => {
    if (!supportsWebGL()) return;

    // Mount after first paint so the server-rendered copy shows immediately and
    // the WebGL context does not compete with the initial render.
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
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
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ready]);

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
          <HeroScene scrollRef={scrollRef} />
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
