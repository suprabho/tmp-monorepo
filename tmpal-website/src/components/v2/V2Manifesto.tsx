'use client';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PlusMark } from '@/components/shared/PlusMark';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { HALF_CLIP_BOTTOM_RIGHT, HALF_CLIP_TOP_LEFT } from '@/lib/crossGeometry';
import { MANIFESTO } from '@/content/copy';
import { cn } from '@/lib/cn';

/**
 * V2 manifesto — same skeletal choreography as V1 but with a **metallic**
 * cross and a softer slab palette (no red slab). Fragments enter from the
 * corners (mirroring V2Hero's scroll-out), reassemble in slab 1, rotate
 * through slab 2 and 3, then **scale down + z-index drop** at the very
 * end so the cross can pass behind the Families clip-images that follow.
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

  const rotate = useTransform(scrollYProgress, [0, 1 / 3, 2 / 3, 1], [0, 0, 45, 90]);
  // Slab 3 scales up (1 → 1.3) then immediately scales DOWN at the very end
  // for the "fold behind families" bridge.
  const scale = useTransform(scrollYProgress, [0, 2 / 3, 0.92, 1], [1, 1, 1.3, 0.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 1, 1, 0.85]);
  // Move the cross slightly down-right at the bridge so it ends parked
  // behind the centre family card.
  const bridgeX = useTransform(scrollYProgress, [0.92, 1], [0, 0]);
  const bridgeY = useTransform(scrollYProgress, [0.92, 1], [0, 80]);

  return (
    <div ref={sectionRef} className="relative">
      <Slab background="bg-navy-700" textTone="text-white" line={MANIFESTO.one} />
      <Slab background="bg-navy-50" textTone="text-navy-500" line={MANIFESTO.two} />
      <Slab background="bg-white" textTone="text-navy-500" line={MANIFESTO.three} />

      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 flex h-dvh items-center justify-center">
          <motion.div
            className="relative h-[clamp(220px,40vw,520px)] w-[clamp(220px,40vw,520px)]"
            style={
              reduced
                ? undefined
                : { rotate, scale, opacity, x: bridgeX, y: bridgeY }
            }
          >
            <motion.div
              className="absolute inset-0"
              style={
                reduced
                  ? { clipPath: HALF_CLIP_TOP_LEFT }
                  : { x: tlX, y: tlY, clipPath: HALF_CLIP_TOP_LEFT }
              }
            >
              <PlusMark variant="metallic" className="h-full w-full" />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              style={
                reduced
                  ? { clipPath: HALF_CLIP_BOTTOM_RIGHT }
                  : { x: brX, y: brY, clipPath: HALF_CLIP_BOTTOM_RIGHT }
              }
            >
              <PlusMark variant="metallic" className="h-full w-full" />
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
