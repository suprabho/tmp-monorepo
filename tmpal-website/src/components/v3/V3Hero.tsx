import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { HERO_SUBHEAD, TAGLINE_TRUSTED } from '@/content/copy';

/**
 * v3 hero — full-bleed building, text overlay.
 *
 * Layout choices:
 *
 *   • `mt-20` opens an explicit 80px gap between the sticky nav and the
 *     hero section so the image never sits behind the nav.
 *   • `aspect-[4337/2854]` on the section pins its height to the PNG's
 *     intrinsic ratio at every viewport width. That means the image
 *     (also `w-full` + same aspect) fills the section exactly edge-to-edge
 *     with no overflow clipping the building, no letterbox white space on
 *     the sides, and no proportion distortion.
 *   • `min-h-[…]` keeps the section usable on small viewports where the
 *     aspect-derived height would shrink too much for the text to breathe;
 *     on those screens the image gets shorter than the section and sits
 *     flush to the bottom, with extra space at the top for copy.
 *   • The text block stays z-10 in the upper-left over the image's
 *     transparent upper portion.
 */
export function V3Hero() {
  return (
    <section
      id="top"
      className="relative mt-20 overflow-hidden bg-white aspect-[4337/2854] min-h-[640px] md:min-h-[720px]"
    >
      {/* Foreground text block — upper-left. Per-element max-widths replace
          the column-level max-w so the heading can breathe wider than the
          body/CTA row. */}
      <Container className="relative z-10">
        <div className="flex flex-col gap-7 pt-12 md:gap-8 md:pt-16">
          {/* Heading. The `whitespace-nowrap` span groups "meets making."
              so the wrap is always either single-line or breaks before
              "meets" — never separating "meets" and "making." onto
              different lines. */}
          <h1 className="max-w-[600px] overflow-visible font-serif text-fluid-display-lg leading-[90px] text-navy-500 md:max-w-[680px]">
            Where design{' '}
            <span className="whitespace-nowrap">
              meets <span className="italic text-red-intextor">making.</span>
            </span>
          </h1>

          <p className="max-w-[520px] font-sans text-[30px] font-normal leading-snug text-navy-600 md:max-w-[560px]">
            {HERO_SUBHEAD}
          </p>

          {/* CTA + tagline on a single row, both desktop and mobile.
              gap-6 (24px) mobile, gap-8 (32px) md+, items-center aligns
              the smaller tagline text to the button's vertical center.
              flex-wrap is a safety net for very narrow viewports. */}
          <div className="flex flex-row flex-wrap items-center gap-6 md:gap-8">
            <Link
              href="#projects"
              className="inline-flex w-fit shrink-0 items-center justify-center rounded-none bg-red-intextor px-7 py-3 font-sans text-[20px] font-normal leading-none text-white transition-colors hover:bg-red-intextor/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-intextor focus-visible:ring-offset-2"
            >
              See Our Work
            </Link>
            <p className="m-0 font-serif text-fluid-base italic text-navy-400">
              {TAGLINE_TRUSTED}
            </p>
          </div>
        </div>
      </Container>

      {/* Building image — fills the section edge-to-edge. width=100% with
          the same aspect-ratio as the section means image dimensions match
          section dimensions exactly: building untouched, left/right flush. */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-full aspect-[4337/2854]">
        <Image
          src="/projects/hero-banner-building.png"
          alt="Sweeping curved architectural façade — a fluid metal envelope wrapping a glazed structure"
          fill
          priority
          sizes="100vw"
          className="object-contain object-right-bottom"
        />
      </div>
    </section>
  );
}
