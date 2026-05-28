'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * V1 Intersection — pinned, scroll-scrubbed assembly of the brand mark.
 *
 * Choreography:
 *   0 → 70%   Two fragments converge from opposite sides on a dark navy
 *             stage. Slow, eased motion ("engineered" feel).
 *   70 →100%  Fragments lock together, the assembled mark rotates a full
 *             turn, and the stage cross-fades navy → stone → red, with
 *             the headline copy shifting tone in step.
 *
 * The section is pinned for the full timeline so the next section only
 * appears after the rotation settles.
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
      // Initial state — fragments offset to opposite sides of the viewport
      // and slightly above/below centre to suggest two engineered pieces
      // approaching each other from open space.
      gsap.set(frag1Ref.current, { x: '-42vw', y: '-6vh', rotation: -6 });
      gsap.set(frag2Ref.current, { x: '42vw', y: '6vh', rotation: 6 });
      gsap.set(groupRef.current, { rotation: 0 });
      gsap.set(bgRef.current, { backgroundColor: '#142338' }); // navy-700
      gsap.set(eyebrowRef.current, { color: 'rgba(255,255,255,0.55)' });
      gsap.set(headlineRef.current, { color: '#ffffff' });

      if (prefersReducedMotion) {
        // Skip the choreography — land directly on the final assembled state.
        gsap.set([frag1Ref.current, frag2Ref.current], { x: 0, y: 0, rotation: 0 });
        gsap.set(bgRef.current, { backgroundColor: '#FE1116' });
        gsap.set(headlineRef.current, { color: '#ffffff' });
        gsap.set(eyebrowRef.current, { color: 'rgba(255,255,255,0.75)' });
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

      // Phase 1 (0 → 0.7): fragments converge precisely on centre.
      tl.to(
        frag1Ref.current,
        { x: 0, y: 0, rotation: 0, duration: 0.7, ease: 'power2.inOut' },
        0,
      );
      tl.to(
        frag2Ref.current,
        { x: 0, y: 0, rotation: 0, duration: 0.7, ease: 'power2.inOut' },
        0,
      );

      // Phase 2 (0.7 → 1.0): assembled mark rotates a full turn, settling
      // back to 0°. power2.out decelerates the spin so it "snaps" to rest.
      tl.to(
        groupRef.current,
        { rotation: 360, duration: 0.3, ease: 'power2.out' },
        0.7,
      );

      // Background cross-fade — navy holds until 0.7, then steps into
      // stone, then red. Linear ease (`ease: 'none'`) since scrub already
      // governs the perceived curve.
      tl.to(
        bgRef.current,
        { backgroundColor: '#D5D9DF', duration: 0.15, ease: 'none' },
        0.7,
      );
      tl.to(
        bgRef.current,
        { backgroundColor: '#FE1116', duration: 0.15, ease: 'none' },
        0.85,
      );

      // Text colour follows the stage:
      //   white   → navy (on stone)   → white (on red)
      tl.to(
        headlineRef.current,
        { color: '#142338', duration: 0.15, ease: 'none' },
        0.7,
      );
      tl.to(
        headlineRef.current,
        { color: '#ffffff', duration: 0.15, ease: 'none' },
        0.85,
      );

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
      <div
        ref={stageRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Animated background plate */}
        <div ref={bgRef} className="absolute inset-0 bg-navy-700" />

        {/* Centred stage */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
          <div
            ref={eyebrowRef}
            className="mb-6 font-sans text-fluid-xs uppercase tracking-[0.24em]"
          >
            Where intent meets manufacture
          </div>

          {/* The mark — two fragments inside a rotating group */}
          <div
            ref={groupRef}
            className="relative h-[clamp(220px,32vw,420px)] w-[clamp(220px,32vw,420px)]"
            style={{ willChange: 'transform' }}
          >
            <div
              ref={frag1Ref}
              className="absolute inset-0"
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/projects/semi-x-1.png"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 32vw"
                className="object-contain object-center"
              />
            </div>
            <div
              ref={frag2Ref}
              className="absolute inset-0"
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/projects/semi-x-2.png"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 32vw"
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
