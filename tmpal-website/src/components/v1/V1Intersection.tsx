'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MANIFESTO } from '@/content/copy';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Geometry (px, from source PNGs) ─────────────────────────
 * The two semi-* fragments tile precisely into tmpal-x-mark.png
 * when anchored to opposing corners of the X-mark bounding box.
 * No scaling, no morphing — the assembled result is identical
 * to the X-mark.
 */
const X_MARK = { w: 917, h: 912 };
const FRAG_1 = { w: 420, h: 424 }; // anchors top-left of X_MARK
const FRAG_2 = { w: 408, h: 412 }; // anchors bottom-right of X_MARK

/* ─── Stage colours (semantic) ─── */
const NAVY = '#142338';
const STONE = '#D5D9DF';
const RED = '#FE1116';

/**
 * V1 Intersection — pinned, scroll-scrubbed assembly of the brand mark
 * with three sequential manifesto lines that swap in sync with the stage.
 *
 * Strict phase sequence (normalised 0 → 1):
 *
 *   A · 0    → 0.40   Converge. Fragments translate only — no rotation,
 *                      scale, or morph — onto corner anchors so the
 *                      tiled result matches tmpal-X-mark exactly.
 *                      Line 1 ("More than a symbol — a structural form.")
 *                      visible in white on navy.
 *   B · 0.40 → 0.50   Hold + stage navy → stone. Line 1 fades up out;
 *                      Line 2 fades up in (navy on stone) once the bg
 *                      has settled.
 *   C · 0.50 → 0.95   Single slow rotation. Line 2 ("Inspired by
 *                      engineered intersections.") stays in navy.
 *   D · 0.82 → 0.95   Stone → red. Line 2 fades up out; Line 3 fades
 *                      up in (white on red) as the rotation completes.
 *   E · 0.95 → 1.0    Settled. Line 3 ("Built with precision at every
 *                      edge.") locked, stage solid red.
 */
export function V1Intersection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const frag1Ref = useRef<HTMLDivElement>(null);
  const frag2Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Initial state ───────────────────────────────────────────
    gsap.set(frag1Ref.current, { xPercent: -140, yPercent: -140 });
    gsap.set(frag2Ref.current, { xPercent: 140, yPercent: 140 });
    gsap.set(groupRef.current, { rotation: 0 });
    gsap.set(bgRef.current, { backgroundColor: NAVY });
    // Line 1 starts visible; lines 2 and 3 wait below their final position.
    gsap.set(line1Ref.current, { opacity: 1, y: 0 });
    gsap.set(line2Ref.current, { opacity: 0, y: 40 });
    gsap.set(line3Ref.current, { opacity: 0, y: 40 });

    if (prefersReducedMotion) {
      // Skip the choreography — land on the final assembled red state.
      gsap.set([frag1Ref.current, frag2Ref.current], { xPercent: 0, yPercent: 0 });
      gsap.set(bgRef.current, { backgroundColor: RED });
      gsap.set(line1Ref.current, { opacity: 0 });
      gsap.set(line2Ref.current, { opacity: 0 });
      gsap.set(line3Ref.current, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });

    // ── Phase A · 0 → 0.40: converge ────────────────────────────
    tl.to(
      frag1Ref.current,
      { xPercent: 0, yPercent: 0, duration: 0.40, ease: 'power2.inOut' },
      0,
    );
    tl.to(
      frag2Ref.current,
      { xPercent: 0, yPercent: 0, duration: 0.40, ease: 'power2.inOut' },
      0,
    );

    // Line 1 → exits upward just before the stage starts changing.
    tl.to(
      line1Ref.current,
      { opacity: 0, y: -40, duration: 0.06, ease: 'power2.in' },
      0.34,
    );

    // ── Phase B · 0.40 → 0.50: hold + navy → stone ──────────────
    tl.to(bgRef.current, { backgroundColor: STONE, duration: 0.10 }, 0.40);

    // Line 2 → enters from below with fade once the stone bg has settled.
    tl.fromTo(
      line2Ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.10, ease: 'power3.out' },
      0.50,
    );

    // ── Phase C · 0.50 → 0.95: slow single rotation ─────────────
    tl.to(groupRef.current, { rotation: 360, duration: 0.45 }, 0.50);

    // Line 2 → exits upward before stone → red begins.
    tl.to(
      line2Ref.current,
      { opacity: 0, y: -40, duration: 0.06, ease: 'power2.in' },
      0.76,
    );

    // ── Phase D · 0.82 → 0.95: stone → red ──────────────────────
    tl.to(bgRef.current, { backgroundColor: RED, duration: 0.13 }, 0.82);

    // Line 3 → enters from below as the red stage establishes.
    tl.fromTo(
      line3Ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.10, ease: 'power3.out' },
      0.88,
    );

    // ── Phase E · 0.95 → 1.0: settled (no tweens) ───────────────

    // Recalculate positions after Next/Image lazy layout settles.
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      window.clearTimeout(refreshTimer);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // Shared classes for the three swapping lines. They live in the same
  // CSS-grid cell so they overlay precisely; opacity + y are the only
  // properties the timeline touches.
  const lineCls =
    'col-start-1 row-start-1 mx-auto max-w-[28ch] text-center ' +
    'font-serif text-fluid-display-sm leading-[1.1]';

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ minHeight: '400vh' }}
    >
      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 bg-navy-700" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-12 px-6">
          {/* Mark container — sized to the X-mark's exact aspect so the two
              fragments tile correctly when anchored to opposing corners. */}
          <div
            ref={groupRef}
            className="relative"
            style={{
              width: 'clamp(280px, 48vw, 560px)',
              aspectRatio: `${X_MARK.w} / ${X_MARK.h}`,
              willChange: 'transform',
            }}
          >
            {/* semi-x-1 → anchored top-left */}
            <div
              ref={frag1Ref}
              className="absolute left-0 top-0"
              style={{
                width: `${(FRAG_1.w / X_MARK.w) * 100}%`,
                aspectRatio: `${FRAG_1.w} / ${FRAG_1.h}`,
                willChange: 'transform',
              }}
            >
              <Image
                src="/projects/semi-x-1.png"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 24vw, 14vw"
                className="select-none object-contain object-center"
                draggable={false}
              />
            </div>

            {/* semi-x-2 → anchored bottom-right */}
            <div
              ref={frag2Ref}
              className="absolute bottom-0 right-0"
              style={{
                width: `${(FRAG_2.w / X_MARK.w) * 100}%`,
                aspectRatio: `${FRAG_2.w} / ${FRAG_2.h}`,
                willChange: 'transform',
              }}
            >
              <Image
                src="/projects/semi-x-2.png"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 24vw, 14vw"
                className="select-none object-contain object-center"
                draggable={false}
              />
            </div>
          </div>

          {/* Three swappable manifesto lines — overlaid via CSS grid so they
              occupy the same cell, and timeline-controlled opacity / y. */}
          <div className="grid w-full max-w-3xl">
            <h2
              ref={line1Ref}
              className={lineCls}
              style={{ color: '#ffffff', willChange: 'transform, opacity' }}
            >
              {MANIFESTO.one}
            </h2>
            <h2
              ref={line2Ref}
              className={lineCls}
              style={{ color: NAVY, willChange: 'transform, opacity' }}
            >
              {MANIFESTO.two}
            </h2>
            <h2
              ref={line3Ref}
              className={lineCls}
              style={{ color: '#ffffff', willChange: 'transform, opacity' }}
            >
              {MANIFESTO.three}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
