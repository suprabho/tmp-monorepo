'use client';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { HALF_CLIP_BOTTOM_RIGHT, HALF_CLIP_TOP_LEFT } from '@/lib/crossGeometry';
import { MANIFESTO } from '@/content/copy';
import { cn } from '@/lib/cn';

/**
 * V2 manifesto — scroll-scrubbed assembly of the red **intersection-mark**.
 *
 * The mark is rendered as two diagonal halves (the same asset clipped to
 * opposite triangles). They start pushed apart toward opposite corners and,
 * as the user scrolls, glide together until they align into the complete,
 * exact intersection-mark. Once assembled it rotates (slab 2 → 3), then holds
 * while the existing scale/bridge behaviour folds it behind the Families
 * clip-images that follow.
 *
 *   Split → Move together → Merge → Rotate → Hold.
 */

const SNAP_AT = 0.7 / 3;
const SNAP_END = SNAP_AT + 0.018;

export function V2Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Fragments slide in → snap → rest, mirroring V1.
  const tlXRaw = useTransform(scrollYProgress, [0, SNAP_AT, SNAP_END, 1], [-90, 8, 0, 0]);
  const tlYRaw = useTransform(scrollYProgress, [0, SNAP_AT, SNAP_END, 1], [-90, 8, 0, 0]);
  const brXRaw = useTransform(scrollYProgress, [0, SNAP_AT, SNAP_END, 1], [90, -8, 0, 0]);
  const brYRaw = useTransform(scrollYProgress, [0, SNAP_AT, SNAP_END, 1], [90, -8, 0, 0]);

  const spring = { stiffness: 220, damping: 26, mass: 0.6 };
  const tlX = useSpring(tlXRaw, spring);
  const tlY = useSpring(tlYRaw, spring);
  const brX = useSpring(brXRaw, spring);
  const brY = useSpring(brYRaw, spring);

  // Once assembled, spin a full turn so it lands back in its ORIGINAL
  // orientation (not stuck at 90°/flipped).
  const rotate = useTransform(scrollYProgress, [0, 1 / 3, 2 / 3, 1], [0, 0, 180, 360]);
  // After the rotation the mark simply holds — full size, original position,
  // no shrink/bridge.
  const opacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);

  return (
    <div ref={sectionRef} className="relative">
      <Slab background="bg-navy-700" textTone="text-white" line={MANIFESTO.one} />
      <Slab background="bg-navy-50" textTone="text-navy-500" line={MANIFESTO.two} />
      <Slab background="bg-white" textTone="text-navy-500" line={MANIFESTO.three} />

      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 flex h-dvh items-end justify-center pb-20 md:items-center md:pb-0">
          {/* Static wrapper offsets the whole mark to the right on desktop;
              centred on phones. Doesn't touch the framer-motion transforms on
              the stage below. */}
          <div className="translate-x-0 md:translate-x-[60%]">
          {/* Breathing wrapper — gentle continuous scale pulse, kept separate
              from the framer-motion rotate so the two transforms don't fight. */}
          <div className="manifesto-breath">
          <motion.div
            className="relative h-[clamp(220px,40vw,520px)] w-[clamp(220px,40vw,520px)]"
            style={
              reduced
                ? undefined
                : { rotate, opacity }
            }
          >
            {/* Top-left triangular half of the intersection-mark. */}
            <motion.div
              className="absolute inset-0"
              style={
                reduced
                  ? { clipPath: HALF_CLIP_TOP_LEFT }
                  : { x: tlX, y: tlY, clipPath: HALF_CLIP_TOP_LEFT }
              }
            >
              <MarkHalf />
            </motion.div>
            {/* Bottom-right triangular half — same asset, opposite clip, so the
                two reassemble into the exact original mark. */}
            <motion.div
              className="absolute inset-0"
              style={
                reduced
                  ? { clipPath: HALF_CLIP_BOTTOM_RIGHT }
                  : { x: brX, y: brY, clipPath: HALF_CLIP_BOTTOM_RIGHT }
              }
            >
              <MarkHalf />
            </motion.div>
          </motion.div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * A full copy of the red intersection-mark filling the square stage box.
 * Two of these are stacked under opposite diagonal clips; because they're the
 * identical asset at the identical size/position, overlapping them reproduces
 * the exact original mark with an invisible seam. `object-contain` preserves
 * the asset's true proportions.
 */
function MarkHalf() {
  return (
    <Image
      src="/brand/intersection-mark.svg"
      alt=""
      aria-hidden
      width={593}
      height={590}
      priority
      className="h-full w-full object-contain"
    />
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
