'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { PlusMark } from '@/components/shared/PlusMark';
import { RevealText } from '@/components/motion/RevealText';
import { HERO_HEADLINE, HERO_SUBHEAD } from '@/content/copy';
import { CROSS_VIEWBOX, HALF_CLIP_BOTTOM_RIGHT, HALF_CLIP_TOP_LEFT, crossPath } from '@/lib/crossGeometry';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

/**
 * v2 hero — dark navy with the metallic cross at rest on the right.
 *
 * A faux architectural-photo gradient is **clipped inside the cross
 * silhouette** behind the metallic plate so the cross reads as a window
 * into the building. As the user scrolls out of the hero, the two halves
 * of the metallic cross slide apart to opposite corners — by the time
 * the manifesto section enters, fragments are at max separation.
 */
export function V2Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Fragments start centred (0) and exit toward their corners on scroll.
  const tlX = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const tlY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const brX = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const brY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden bg-navy-700 pt-16 text-white md:pt-24"
    >
      <Container>
        <div className="grid items-center gap-10 pb-section-y md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div className="flex flex-col gap-6 md:gap-8">
            <RevealText
              words={[...HERO_HEADLINE]}
              as="h1"
              className="font-serif text-fluid-display-lg leading-[1.02]"
            />
            <p className="max-w-md text-fluid-lg leading-relaxed text-slate-200/80">
              {HERO_SUBHEAD}
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="#contact"
                className="inline-flex items-center rounded-full bg-red-intextor px-6 py-3 font-sans text-fluid-base font-medium text-white hover:bg-red-intextor/90"
              >
                Tell us what you&apos;re building
              </Link>
              <span className="font-sans text-fluid-sm text-slate-200/60">
                Manufacturing partner to{' '}
                <span className="font-medium uppercase tracking-wider">Procural</span>
              </span>
            </div>
          </div>

          {/* The cross visual — photo clipped inside cross silhouette,
              with the metallic plate layered above. */}
          <div className="relative h-[clamp(280px,50vw,640px)] w-full">
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative h-[clamp(240px,42vw,540px)] w-[clamp(240px,42vw,540px)]">
                {/* Photo clipped inside the cross silhouette */}
                <CrossClipPhoto className="absolute inset-0 h-full w-full" />

                {/* Metallic cross plate on top, in two halves that slide on scroll */}
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
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * An architectural-photo stand-in clipped to the brand cross silhouette.
 * Uses an SVG `<clipPath>` keyed to `crossPath`, then paints a layered
 * gradient that suggests glass-facade reflections.
 *
 * Once real photography is in `/public/hero/`, replace the gradient
 * with `<image href="/hero/v2-dark-facade.jpg" />` inside the clip.
 */
function CrossClipPhoto({ className }: { className?: string }) {
  return (
    <svg viewBox={CROSS_VIEWBOX} className={className} aria-hidden>
      <defs>
        <clipPath id="v2-cross-clip">
          <path d={crossPath} />
        </clipPath>
        <linearGradient id="v2-facade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d3050" />
          <stop offset="35%" stopColor="#2c4368" />
          <stop offset="70%" stopColor="#1a2940" />
          <stop offset="100%" stopColor="#142338" />
        </linearGradient>
        <pattern id="v2-grid" patternUnits="userSpaceOnUse" width="6" height="9">
          <path d="M0 0 H6" stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" />
          <path d="M3 0 V9" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
        </pattern>
      </defs>
      <g clipPath="url(#v2-cross-clip)">
        <rect x="0" y="0" width="100" height="100" fill="url(#v2-facade)" />
        <rect x="0" y="0" width="100" height="100" fill="url(#v2-grid)" />
        {/* Highlight band suggesting a glazing reflection */}
        <path
          d="M -10 60 L 110 20 L 110 30 L -10 70 Z"
          fill="rgba(255,255,255,0.06)"
        />
      </g>
    </svg>
  );
}
