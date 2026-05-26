'use client';
import { MotionConfig as FramerMotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Root motion wrapper. We keep this thin — just the global config for
 * `reducedMotion="user"` so Framer respects the OS-level setting
 * everywhere.
 *
 * We previously used LazyMotion + the `m` component for a smaller bundle,
 * but it interfered with `whileInView` / `useScroll` triggering reliably
 * in production. The bundle delta isn't worth the breakage on a marketing
 * site whose entire story is scroll-driven motion.
 */
export function MotionConfig({ children }: { children: ReactNode }) {
  return <FramerMotionConfig reducedMotion="never">{children}</FramerMotionConfig>;
}
