'use client';
import { useReducedMotion } from 'framer-motion';

/**
 * Wraps Framer's `useReducedMotion` so we have a single import point and
 * can later add a manual override (e.g. footer toggle) without touching
 * every call site.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
