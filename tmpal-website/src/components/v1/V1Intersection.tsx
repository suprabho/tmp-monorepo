'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
 * V1 Intersection — pinned, scroll-scrubbed assembly of the brand mark.
 *
 * Implementation pattern: the section has an explicit tall height
 * (`min-h-[400vh]`) and the stage inside uses `position: sticky` to
 * stay fixed in the viewport while the user scrolls through the
 * section. GSAP ScrollTrigger then scrubs a single master timeline
 * against the section's scroll progress (no pin: needed). This is
 * more reliable across React StrictMode + Next.js than ScrollTrigger's
 * own pin feature.
 *
 * Strict phase sequence (normalised 0 → 1):
 *
 *   A · 0    → 0.40   Converge. Fragments translate only — no rotation,
 *                      scale, or morph — onto corner anchors so the
 *                      tiled result matches tmpal-X-mark exactly.
 *   B · 0.40 → 0.50   Hold. Stage cross-fades navy → stone. Assembled
 *                      mark sits perfectly still.
 *   C · 0.50 → 0.95   Single slow rotation (linear). Begins only after
 *                      assembly is complete and the stage is grey.
 *   D · 0.82 → 0.95   Stone → red cross-fade during the last portion
 *                      of the rotation, so the spin completes ON red.
 *   E · 0.95 → 1.0    Settled. No tweens. Assembled mark on red, stable.
 */
export function V1Intersection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const frag1Ref = useRef<HTMLDivElement>(null);
  const frag2Ref = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Initial state (must run before any tweens) ──────────────
    gsap.set(frag1Ref.current, { xPercent: -140, yPercent: -140 });
    gsap.set(frag2Ref.current, { xPercent: 140, yPercent: 140 });
    gsap.set(groupRef.current, { rotation: 0 });
    gsap.set(bgRef.current, { backgroundColor: NAVY });
    gsap.set(eyebrowRef.current, { color: 'rgba(255,255,255,0.55)' });
    gsap.set(headlineRef.current, { color: '#ffffff' });

    if (prefersReducedMotion) {
      // Skip the choreography — land on the final assembled red state.
      gsap.set([frag1Ref.current, frag2Ref.current], { xPercent: 0, yPercent: 0 });
      gsap.set(bgRef.current, { backgroundColor: RED });
      gsap.set(headlineRef.current, { color: '#ffffff' });
      gsap.set(eyebrowRef.current, { color: 'rgba(255,255,255,0.85)' });
      return;
    }

    // ── Master timeline scrubbed by section scroll progress ─────
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

    // ── Phase B · 0.40 → 0.50: hold + navy → stone ──────────────
    tl.to(bgRef.current, { backgroundColor: STONE, duration: 0.10 }, 0.40);
    tl.to(headlineRef.current, { color: NAVY, duration: 0.10 }, 0.40);
    tl.to(eyebrowRef.current, { color: 'rgba(20,35,56,0.7)', duration: 0.10 }, 0.40);

    // ── Phase C · 0.50 → 0.95: slow single rotation ─────────────
    tl.to(groupRef.current, { rotation: 360, duration: 0.45 }, 0.50);

    // ── Phase D · 0.82 → 0.95: stone → red ──────────────────────
    tl.to(bgRef.current, { backgroundColor: RED, duration: 0.13 }, 0.82);
    tl.to(headlineRef.current, { color: '#ffffff', duration: 0.13 }, 0.82);
    tl.to(eyebrowRef.current, { color: 'rgba(255,255,255,0.85)', duration: 0.13 }, 0.82);

    // ── Phase E · 0.95 → 1.0: settled (no tweens) ───────────────

    // Recalculate positions once the page/images have settled. Without
    // this the trigger can latch onto pre-layout coordinates and the
    // scrub will appear stuck.
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      window.clearTimeout(refreshTimer);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ minHeight: '400vh' }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <div ref={bgRef} className="absolute inset-0 bg-navy-700" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
          <div
            ref={eyebrowRef}
            className="mb-6 font-sans text-fluid-xs uppercase tracking-[0.24em]"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Where intent meets manufacture
          </div>

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
                className="object-contain object-center select-none"
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
                className="object-contain object-center select-none"
                draggable={false}
              />
            </div>
          </div>

          <h2
            ref={headlineRef}
            className="mt-12 max-w-2xl text-center font-serif text-fluid-display-sm leading-[1.05]"
            style={{ color: '#ffffff' }}
          >
            Two halves. <span className="italic">One mark.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
