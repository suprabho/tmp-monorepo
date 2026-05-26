'use client';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PlusMark } from '@/components/shared/PlusMark';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { HALF_CLIP_BOTTOM_RIGHT, HALF_CLIP_TOP_LEFT } from '@/lib/crossGeometry';
import { MANIFESTO } from '@/content/copy';
import { cn } from '@/lib/cn';

/**
 * V1 — the **assembly** choreography.
 *
 * A 300vh sticky-stage section containing three full-viewport-height
 * coloured slabs (navy, light, red). The brand mark sits pinned at the
 * vertical centre, made of two diagonal halves that:
 *
 *   slab 1 (0   → 0.33) — slide together from upper-left + lower-right corners,
 *                         snap (small overshoot) at 70% of the slab
 *   slab 2 (0.33 → 0.67) — rotate 0° → 45° (assembled cross → X)
 *   slab 3 (0.67 → 1.00) — rotate 45° → 90° (back to +) and scale 1 → 1.35
 *
 * Under reduced motion, the cross is shown in its final rest pose (a + at
 * the centre, scale 1.0) and the slabs paint statically.
 */

// Snap timing: 70% through slab 1.
const SNAP_AT = 0.7 / 3;
// Settle just past the snap (small overshoot zone).
const SNAP_END = SNAP_AT + 0.018;

export function V1Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Fragment positions (% of fragment size). Slide from corners → snap → rest.
  const tlXRaw = useTransform(
    scrollYProgress,
    [0, SNAP_AT, SNAP_END, 1],
    [-90, 8, 0, 0],
  );
  const tlYRaw = useTransform(
    scrollYProgress,
    [0, SNAP_AT, SNAP_END, 1],
    [-90, 8, 0, 0],
  );
  const brXRaw = useTransform(
    scrollYProgress,
    [0, SNAP_AT, SNAP_END, 1],
    [90, -8, 0, 0],
  );
  const brYRaw = useTransform(
    scrollYProgress,
    [0, SNAP_AT, SNAP_END, 1],
    [90, -8, 0, 0],
  );

  // Smooth the snap with a tightly-damped spring so the overshoot feels tactile.
  const spring = { stiffness: 220, damping: 26, mass: 0.6 };
  const tlX = useSpring(tlXRaw, spring);
  const tlY = useSpring(tlYRaw, spring);
  const brX = useSpring(brXRaw, spring);
  const brY = useSpring(brYRaw, spring);

  // Rotation: 0° through slab 1, → 45° across slab 2, → 90° across slab 3.
  const rotate = useTransform(scrollYProgress, [0, 1 / 3, 2 / 3, 1], [0, 0, 45, 90]);
  // Scale up only in slab 3.
  const scale = useTransform(scrollYProgress, [0, 2 / 3, 1], [1, 1, 1.35]);
  // Fade in over slab 1's first 10%, fade out across the last 5%.
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  // Fragment fill colour transitions per slab (over → on contrast bg).
  // We render two separate PlusMarks with the SAME tint and let CSS clip-path
  // hide each one's "other half".
  const fragmentFill = useTransform(
    scrollYProgress,
    [0, 1 / 3, 2 / 3, 1],
    ['#6A7A92', '#6A7A92', '#FFFFFF', 'rgba(255,255,255,0.4)'],
  );

  return (
    <div ref={sectionRef} className="relative">
      {/* Three slabs in normal flow */}
      <Slab background="bg-navy-700" textTone="text-white" line={MANIFESTO.one} />
      <Slab background="bg-navy-50" textTone="text-navy-500" line={MANIFESTO.two} />
      <Slab background="bg-red-intextor" textTone="text-white" line={MANIFESTO.three} />

      {/* Sticky cross stage spanning the whole section */}
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 flex h-dvh items-center justify-center">
          <motion.div
            className="relative h-[clamp(220px,40vw,520px)] w-[clamp(220px,40vw,520px)]"
            style={
              reduced
                ? undefined
                : {
                    rotate,
                    scale,
                    opacity,
                  }
            }
          >
            {/* Top-left fragment */}
            <motion.div
              className={cn('absolute inset-0')}
              style={
                reduced
                  ? { clipPath: HALF_CLIP_TOP_LEFT }
                  : {
                      x: tlX,
                      y: tlY,
                      clipPath: HALF_CLIP_TOP_LEFT,
                    }
              }
            >
              <motion.div className="h-full w-full" style={{ color: fragmentFill }}>
                <PlusMark className="h-full w-full" fill="currentColor" />
              </motion.div>
            </motion.div>

            {/* Bottom-right fragment */}
            <motion.div
              className={cn('absolute inset-0')}
              style={
                reduced
                  ? { clipPath: HALF_CLIP_BOTTOM_RIGHT }
                  : {
                      x: brX,
                      y: brY,
                      clipPath: HALF_CLIP_BOTTOM_RIGHT,
                    }
              }
            >
              <motion.div className="h-full w-full" style={{ color: fragmentFill }}>
                <PlusMark className="h-full w-full" fill="currentColor" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Slab({
  background,
  textTone,
  line,
}: {
  background: string;
  textTone: string;
  line: string;
}) {
  return (
    <div
      className={cn(
        'relative flex h-dvh min-h-[600px] w-full items-center px-6 md:px-16',
        background,
        textTone,
      )}
    >
      <div className="max-w-xl md:max-w-2xl">
        <p className="font-serif text-fluid-display leading-[1.05]">{line}</p>
      </div>
    </div>
  );
}
