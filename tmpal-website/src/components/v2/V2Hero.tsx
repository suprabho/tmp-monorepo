'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { RevealText } from '@/components/motion/RevealText';
import { HERO_HEADLINE, HERO_SUBHEAD } from '@/content/copy';

/**
 * v2 hero — dark navy, vertically centred.
 *
 * Left: headline, subhead, CTA, trust line.
 * Right: the "V2 hero" architectural photo, layered above a large red
 * intersection-mark that sits behind the image's lower-left corner. ~30–40%
 * of the mark is hidden by the photo; the rest reads as a brand accent
 * spilling out beneath the image.
 */
export function V2Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-navy-700 pt-8 pb-[32vw] text-white md:pt-10 md:pb-[19vw]"
    >
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-[1fr_1.05fr] md:gap-16">
          {/* Left — copy */}
          <div className="flex flex-col gap-6 md:gap-8">
            <RevealText
              words={[...HERO_HEADLINE]}
              as="h1"
              className="font-serif text-fluid-display-lg leading-[1.02]"
            />
            <p className="max-w-md font-serif text-fluid-2xl leading-tight text-slate-200/80">
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

          {/* Right — hero image + red intersection-mark.
              Mobile: the group goes full-bleed (negative margins cancel the
              container padding), so the photo can touch the right screen edge
              and the mark the left edge. Desktop: capped at 80% width and
              right-aligned, the negative right margin pulling the photo past
              the container padding so it sits on the right edge. */}
          <div className="relative -mx-5 sm:-mx-8 md:mx-0 md:w-[80%] md:ml-auto md:-mr-12 xl:-mr-20">
            {/* Red brand mark.
                Mobile: flush to the LEFT screen edge, beside the photo's
                lower-left and horizontally clear of it — fully visible, never
                behind the image, never cropped.
                Desktop: larger, pushed far down-left so only its top-right
                corner tucks under the photo. */}
            <div className="pointer-events-none absolute bottom-[-42%] left-0 z-0 w-[38%] md:bottom-[-46%] md:left-[-44%] md:w-[58%]">
              <Image
                src="/brand/intersection-mark.svg"
                alt=""
                aria-hidden
                width={593}
                height={590}
                className="h-auto w-full"
              />
            </div>

            {/* The V2 hero photo. Mobile: 70% width, pushed to the right edge.
                Desktop: fills the column. The aspect box crops the right ~30%
                of the frame (object-left keeps the left 70%). */}
            <div className="relative z-10 ml-auto w-[70%] aspect-[2775/2678] overflow-hidden md:ml-0 md:w-full">
              <Image
                src="/projects/V2 hero.png"
                alt="Architectural metal-mesh façade wrapping a glazed building"
                width={3964}
                height={2678}
                priority
                className="h-full w-full object-cover object-left"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
