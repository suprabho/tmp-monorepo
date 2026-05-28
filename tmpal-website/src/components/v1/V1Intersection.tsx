'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Geometry (px) ─────────────────────────────────────────────
 * The two semi-* fragments tile precisely into tmpal-x-mark.png:
 *
 *   ┌────────────┐
 *   │  semi-x-1  │ … top-left anchor
 *   │            │
 *   │       ╲    │
 *   │        ╲   │
 *   │  semi-x-2  │ … bottom-right anchor
 *   └────────────┘
 *
 * Sizes are taken from the source PNGs so the proportions are exact —
 * no scaling, no stretching, no morphing on assembly.
 */
const X_MARK = { w: 917, h: 912 };
const FRAG_1 = { w: 420, h: 424 }; // anchors top-left of X_MARK
const FRAG_2 = { w: 408, h: 412 }; // anchors bottom-right of X_MARK

/**
 * V1 Intersection — pinned, scroll-scrubbed assembly of the brand mark.
 *
 * Choreography:
 *   0 → 70%   semi-x-1 glides down-right from off-stage; semi-x-2 glides
 *             up-left. Both translate only — no rotation, scale or
 *             shape morph — and land at their corner anchors so the
 *             tiled result reproduces the tmpal-X-mark exactly.
 *   70 →100%  Assembled mark rotates a full turn; stage cross-fades
 *             navy → stone → red; eyebrow + headline follow.
 *
 * The section is pinned for the full timeline so the next section only
 * appears once the rotation settles.
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

    const ctx = gsap.context(() => {
      // Initial offsets: fragments sit at 1.4× their own size away from the
      // anchor, on the diagonal axis. Pure translation — no rotation, no
      // scaling — so the fragments preserve their exact geometry.
      gsap.set(frag1Ref.current, { xPercent: -140, yPercent: -140 });
      gsap.set(frag2Ref.current, { xPercent: 140, yPercent: 140 });
      gsap.set(groupRef.current, { rotation: 0 });
      gsap.set(bgRef.current, { backgroundColor: '#142338' });
      gsap.set(eyebrowRef.current, { color: 'rgba(255,255,255,0.55)' });
      gsap.set(headlineRef.current, { color: '#ffffff' });

      if (prefersReducedMotion) {
        gsap.set([frag1Ref.current, frag2Ref.current], { xPercent: 0, yPercent: 0 });
        gsap.set(bgRef.current, { backgroundColor: '#FE1116' });
        gsap.set(headlineRef.current, { color: '#ffffff' });
        gsap.set(eyebrowRef.current, { color: 'rgba(255,255,255,0.85)' });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2400',
          scrub: 1.2,
          pin: stageRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── Phase 1 (0 → 0.7): pure translation onto corner anchors ──
      // semi-x-1 translates DOWN + RIGHT (xPercent / yPercent → 0)
      // semi-x-2 translates UP + LEFT
      tl.to(
        frag1Ref.current,
        { xPercent: 0, yPercent: 0, duration: 0.7, ease: 'power2.inOut' },
        0,
      );
      tl.to(
        frag2Ref.current,
        { xPercent: 0, yPercent: 0, duration: 0.7, ease: 'power2.inOut' },
        0,
      );

      // ── Phase 2 (0.7 → 1.0): rotate assembled mark + colour cross-fade ──
      tl.to(
        groupRef.current,
        { rotation: 360, duration: 0.3, ease: 'power2.out' },
        0.7,
      );
      tl.to(bgRef.current, { backgroundColor: '#D5D9DF', duration: 0.15, ease: 'none' }, 0.7);
      tl.to(bgRef.current, { backgroundColor: '#FE1116', duration: 0.15, ease: 'none' }, 0.85);
      tl.to(headlineRef.current, { color: '#142338', duration: 0.15, ease: 'none' }, 0.7);
      tl.to(headlineRef.current, { color: '#ffffff', duration: 0.15, ease: 'none' }, 0.85);
      tl.to(
        eyebrowRef.current,
        { color: 'rgba(20,35,56,0.7)', duration: 0.15, ease: 'none' },
        0.7,
      );
      tl.to(
        eyebrowRef.current,
        { color: 'rgba(255,255,255,0.85)', duration: 0.15, ease: 'none' },
        0.85,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div ref={stageRef} className="relative h-screen w-full overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 bg-navy-700" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
          <div
            ref={eyebrowRef}
            className="mb-6 font-sans text-fluid-xs uppercase tracking-[0.24em]"
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
                className="object-contain object-center"
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
                className="object-contain object-center"
              />
            </div>
          </div>

          <h2
            ref={headlineRef}
            className="mt-12 max-w-2xl text-center font-serif text-fluid-display-sm leading-[1.05]"
          >
            Two halves. <span className="italic">One mark.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
