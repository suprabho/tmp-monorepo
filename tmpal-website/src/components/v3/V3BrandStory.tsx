'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

/**
 * v3 Brand Story — the connector line draws the icon, then scroll fills it.
 *
 * The section is pinned (sticky) so the page "stays in place" while the user's
 * scroll drives the whole sequence — robust, no scroll-lock hacks:
 *
 *   [0.00 → 0.10]  the #465A78 connector extends downward
 *   [0.12 → 0.45]  the SAME line draws the icon outline in red (#FE1116) as one
 *                  continuous stroke, re-rooted to start at the connection point
 *                  so nothing appears from the sides
 *   [0.45 → 0.50]  outline complete, holds
 *   [0.50 → 0.92]  the user's scroll directly fills the icon red, top → bottom
 *   [0.92 → 1.00]  fully filled, then the pin releases into the next section
 *
 * 2px stroke throughout. Reduced motion → finished red icon, no pin.
 */

const CX = 571.5;

// TMP icon, re-rooted so the single continuous stroke STARTS at the top-centre
// connection point and traces the whole closed outline from there.
const ICON_PATH =
  'M571.5 5H671.75V459.656H1137.88V683.927L1039.25 708.47C842.372 757.458 700.955 929.813 691.362 1132.47H471.133V677.812H5V453.541L103.633 428.999C300.511 380.011 441.927 207.655 451.521 5H571.5Z';

const CONN_TOP = -320;
const VB_H = 1138 - CONN_TOP; // 1458
const STROKE = 2;

export function V3BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const connLen = useTransform(scrollYProgress, [0.0, 0.07], [0, 1]);
  const outlineLen = useTransform(scrollYProgress, [0.08, 0.3], [0, 1]);
  // Scroll directly drives the fill from outline-complete to filled.
  const fillH = useTransform(scrollYProgress, [0.34, 0.58], [0, 1150]);
  // Content emerges once the fill is ~60% in, fully visible at 100%.
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.58], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.58], [16, 0]);
  // The blue connector fades out at ~60% fill so focus shifts to the logo.
  const connOpacity = useTransform(scrollYProgress, [0.5, 0.57], [1, 0]);
  // Then scroll scales the filled logo + messaging up ~40%.
  const groupScale = useTransform(scrollYProgress, [0.6, 0.84], [1, 1.4]);
  // Finally a soft fade + slide-up hands off to the next section.
  const stageOpacity = useTransform(scrollYProgress, [0.88, 1.0], [1, 0]);
  const stageY = useTransform(scrollYProgress, [0.88, 1.0], [0, -60]);

  if (reduced) {
    return (
      <section id="brand-story" className="relative bg-white py-section-y">
        <div className="flex justify-center px-6">
          <svg viewBox="0 0 1143 1138" fill="none" aria-hidden className="h-auto w-full max-w-[600px]">
            <path d={ICON_PATH} fill="#FE1116" stroke="#FE1116" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          </svg>
        </div>
      </section>
    );
  }

  return (
    // Tall track → the sticky stage stays pinned while scroll runs the draw,
    // the fill, then the scale-up, before handing off to the next section.
    <section ref={ref} id="brand-story" className="relative h-[340vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        {/* Logo + messaging scale together, then fade/slide into the next section. */}
        <motion.div style={{ scale: groupScale, opacity: stageOpacity, y: stageY }} className="relative">
          <svg
            viewBox={`0 ${CONN_TOP} 1143 ${VB_H}`}
            fill="none"
            aria-hidden
            className="block h-[82vh] w-auto"
          >
          <defs>
            {/* Red fill wipes top → bottom through a growing rectangle. */}
            <clipPath id="brand-fill" clipPathUnits="userSpaceOnUse">
              <motion.rect x={-60} y={5} width={1263} style={{ height: fillH }} />
            </clipPath>
          </defs>

          {/* 1 — connector (#465A78), continues the Selected Work line. */}
          <motion.path
            d={`M${CX} ${CONN_TOP} L${CX} 5`}
            stroke="#465A78"
            strokeWidth={STROKE}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: connLen, opacity: connOpacity }}
          />

          {/* 2 — the same line draws the icon outline in red, one stroke. */}
          <motion.path
            d={ICON_PATH}
            stroke="#FE1116"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: outlineLen }}
          />

          {/* 3 — red fill, scroll-driven, top → bottom. */}
          <path
            d={ICON_PATH}
            fill="#FE1116"
            stroke="#FE1116"
            strokeWidth={STROKE}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            clipPath="url(#brand-fill)"
          />
          </svg>

          {/* Content inside the icon — emerges as the fill nears completion;
              scales together with the logo. */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white"
          >
            <div className="max-w-[40vh] translate-y-[4vh]">
              <p className="-translate-x-[5vh] font-serif text-xl italic leading-tight md:text-3xl">
                Designed through
                <br />
                connection.
              </p>
              <p className="mx-auto mt-4 max-w-[38vh] font-sans text-lg leading-relaxed text-white/85 md:text-xl">
                Connecting design, engineering, and manufacturing into one system.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
