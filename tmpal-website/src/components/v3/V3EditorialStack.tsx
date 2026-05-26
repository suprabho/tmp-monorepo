'use client';
import { m, useInView, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { Container } from '@/components/shared/Container';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { useIsMobile } from '@/hooks/useIsMobile';
import { CROSS_VIEWBOX, crossPath } from '@/lib/crossGeometry';
import { V3_EDITORIAL } from '@/content/copy';
import { cn } from '@/lib/cn';

/**
 * V3 — line-draw → complete → fill → materialise.
 *
 * Three editorial sections, each ~100vh, with a sticky stage hosting the
 * cross. Scroll progress 0..1 drives:
 *
 *   [0.00 → 0.45]  pathLength 0 → 1                 // outline draws
 *                  strokeWidth 0.5 → 2.0           // thickens
 *   [0.45 → 0.55]  (drawn cross sits — no change)
 *   [0.55 → 0.78]  fill mask wipes top → bottom    // colour fills
 *   [0.78 → 0.85]  SVG → WebGL crossfade            // "made real"
 *   [0.85 → 1.00]  3D cross at rest with ambient + mouse parallax
 *
 * Under reduced motion, the cross is shown in its final state (3D mesh,
 * or — on mobile — the posterised version) at the bottom of each section.
 */

const V3AluminiumCross = dynamic(
  () => import('@/components/webgl/V3AluminiumCross').then((m) => m.V3AluminiumCross),
  { ssr: false, loading: () => <CrossPoster /> },
);

function CrossPoster() {
  return (
    <div className="grid h-full w-full place-items-center">
      <svg viewBox={CROSS_VIEWBOX} className="h-full w-auto" aria-hidden>
        <path d={crossPath} fill="#FE1116" />
      </svg>
    </div>
  );
}

export function V3EditorialStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const isMobile = useIsMobile();

  // Only mount the WebGL Canvas when the user is anywhere near this section.
  // Generous margin so it spins up before the crossfade actually starts.
  const inView = useInView(ref, { margin: '50% 0% 50% 0%' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Stroke draw: 0..0.45 of section. Stroke grows from a hairline to a
  // chunky editorial weight.
  const pathLength = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const strokeWidth = useTransform(scrollYProgress, [0, 0.45], [1.5, 3.5]);

  // Fill wipe: 0.55..0.78 of section
  const fillOffset = useTransform(scrollYProgress, [0.55, 0.78], ['100%', '0%']);

  // SVG → WebGL crossfade: 0.78..0.85
  const svgOpacity = useTransform(scrollYProgress, [0.78, 0.85], [1, 0]);
  const webglOpacity = useTransform(scrollYProgress, [0.78, 0.85, 1], [0, 1, 1]);

  // On mobile, skip the WebGL — keep the filled SVG as the rest pose.
  const showWebGL = !isMobile && !reduced;
  // Reference inView so it stays in dep tracking — useful later for gating
  // expensive setup like Environment HDRI without changing mount lifecycle.
  void inView;

  return (
    <div ref={ref} className="relative bg-editorial">
      {/* Three editorial sections */}
      <EditorialSection background="bg-white" textTone="text-navy-500" copy={V3_EDITORIAL.geometry} />
      <EditorialSection background="bg-navy-50" textTone="text-navy-500" copy={V3_EDITORIAL.mark} />
      <EditorialSection background="bg-white" textTone="text-navy-500" copy={V3_EDITORIAL.strength} />

      {/* Sticky cross stage */}
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 flex h-dvh items-center justify-end px-6 md:px-16">
          <div className="relative h-[clamp(220px,42vw,560px)] w-[clamp(220px,42vw,560px)]">
            {/* SVG layer — line-draw + fill */}
            <m.svg
              viewBox={CROSS_VIEWBOX}
              className="absolute inset-0 h-full w-full"
              style={reduced ? undefined : { opacity: svgOpacity }}
              aria-hidden
            >
              <defs>
                <mask id="v3-fill-mask">
                  <m.rect
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    fill="white"
                    style={reduced ? { y: '0%' } : { y: fillOffset }}
                  />
                </mask>
              </defs>

              {/* Outline being drawn */}
              <m.path
                d={crossPath}
                fill="none"
                stroke="#FE1116"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={
                  reduced
                    ? { strokeWidth: 3.5 }
                    : { pathLength, strokeWidth }
                }
              />

              {/* Filled cross masked by the wipe rect */}
              <path d={crossPath} fill="#FE1116" mask="url(#v3-fill-mask)" />
            </m.svg>

            {/* WebGL layer — crossfades in over the filled SVG */}
            {showWebGL ? (
              <m.div
                className="absolute inset-0"
                style={{ opacity: webglOpacity }}
              >
                <V3AluminiumCross className="h-full w-full" />
              </m.div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorialSection({
  background,
  textTone,
  copy,
}: {
  background: string;
  textTone: string;
  copy: string;
}) {
  return (
    <section
      className={cn(
        'relative flex h-dvh min-h-[600px] w-full items-center',
        background,
        textTone,
      )}
    >
      <Container>
        <div className="max-w-xl md:max-w-2xl">
          <p className="font-serif text-fluid-display italic leading-[1.05]">{copy}</p>
        </div>
      </Container>
    </section>
  );
}
