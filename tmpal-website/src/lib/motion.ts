/**
 * Shared motion primitives — easings, durations, variants. Everything that
 * could be reused across components lives here so the feel stays cohesive.
 */

import type { Variants, Transition } from 'framer-motion';

export const EASE = {
  /** Snappy, decelerating. Default for reveals. */
  outExpo: [0.22, 1, 0.36, 1] as const,
  /** Symmetric ease, for transforms that should feel "engineered". */
  inOutQuart: [0.76, 0, 0.24, 1] as const,
};

export const DURATION = {
  fast: 0.35,
  med: 0.55,
  slow: 0.75,
  hero: 0.95,
};

/** Snap spring used when fragments lock into the assembled cross. */
export const SNAP_SPRING: Transition = {
  type: 'spring',
  stiffness: 360,
  damping: 18,
  mass: 0.6,
};

/** Section reveal — opacity + lift, with stagger for children. */
export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.outExpo,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const childVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.med, ease: EASE.outExpo },
  },
};

/** Per-word reveal: word rises from below its own clipping mask. */
export const wordVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE.outExpo },
  },
};

/** Emphasis word — same lift, plus subtle scale grow. */
export const wordEmphasisVariants: Variants = {
  hidden: { y: '110%', opacity: 0, scale: 0.92 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.hero, ease: EASE.outExpo, delay: 0.05 },
  },
};

/** Stagger container for word reveals. */
export const headlineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};
