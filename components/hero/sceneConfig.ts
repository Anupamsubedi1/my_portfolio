/**
 * One place that decides how heavy the scene is allowed to be.
 *
 * Every component reads its counts from here rather than hardcoding them, so
 * degrading for a phone or for `prefers-reduced-motion` is a single decision
 * instead of five scattered ones.
 */

export interface SceneTuning {
  /** Points in the galaxy. The single biggest lever on GPU cost. */
  particles: number;
  /** CPU-simulated nodes that carry the neural link lines. O(n^2) — keep small. */
  nodes: number;
  /** Instanced wireframe solids drifting through the scene. */
  techObjects: number;
  /** Subdivision level of the core icosahedron. */
  coreDetail: number;
  /** Cap on device pixel ratio. 2 is plenty; 3 is wasted fill rate. */
  maxDpr: number;
  /** Whether to mount the post-processing chain at all. */
  postProcessing: boolean;
  /** Bloom strength; 0 reads as off. */
  bloom: number;
  /** When false, everything holds still and renders a single frame. */
  animate: boolean;
}

export type QualityTier = 'high' | 'mobile' | 'reduced';

const TIERS: Record<QualityTier, SceneTuning> = {
  high: {
    particles: 7600,
    nodes: 64,
    techObjects: 34,
    coreDetail: 24,
    maxDpr: 2,
    postProcessing: true,
    bloom: 0.34,
    animate: true,
  },
  mobile: {
    particles: 2800,
    nodes: 34,
    techObjects: 14,
    coreDetail: 12,
    maxDpr: 1.5,
    // Bloom is a full-screen pass; on a phone GPU it is the first thing to cut.
    postProcessing: false,
    bloom: 0,
    animate: true,
  },
  reduced: {
    particles: 2600,
    nodes: 0,
    techObjects: 10,
    coreDetail: 8,
    maxDpr: 1.5,
    postProcessing: false,
    bloom: 0,
    animate: false,
  },
};

export function resolveTier(): QualityTier {
  if (typeof window === 'undefined') return 'mobile';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'reduced';

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.matchMedia('(max-width: 900px)').matches;
  // navigator.deviceMemory is Chromium-only; absent elsewhere, so treat
  // "unknown" as capable rather than penalising Safari and Firefox.
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = typeof memory === 'number' && memory <= 4;
  const fewCores = typeof navigator.hardwareConcurrency === 'number'
    && navigator.hardwareConcurrency <= 4;

  if (coarse || narrow || lowMemory || fewCores) return 'mobile';
  return 'high';
}

export function getTuning(tier: QualityTier): SceneTuning {
  return TIERS[tier];
}

/** Scene palette, kept next to the tuning so the look is defined in one file. */
export const PALETTE = {
  background: '#030712',
  fog: '#050816',
  deep: '#1E3A8A',
  blue: '#3B82F6',
  cyan: '#22D3EE',
  ice: '#67E8F9',
  violet: '#8B5CF6',
  softPurple: '#A78BFA',
  white: '#E2E8F0',
} as const;

/** Colours the galaxy samples from, weighted toward blue with violet accents. */
export const PARTICLE_COLORS = [
  PALETTE.blue,
  PALETTE.cyan,
  PALETTE.ice,
  PALETTE.violet,
  PALETTE.softPurple,
  PALETTE.white,
] as const;
