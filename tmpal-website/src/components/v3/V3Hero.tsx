import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { HERO_SUBHEAD, TAGLINE_TRUSTED } from '@/content/copy';

/**
 * v3 hero — curved building with a text overlay.
 *
 * Layout is intentionally NOT driven by the image's aspect ratio, which is
 * what previously crushed the section height (clipping all copy on phones)
 * and let the building's left swoosh ride up into "meets making." on
 * tablets. Two distinct modes instead:
 *
 *   • Mobile (default): a simple vertical stack. Copy first in normal flow
 *     (so it can never be clipped), then the building as a full-width band
 *     below it. Text and image occupy separate vertical zones → zero
 *     overlap at any narrow width.
 *   • Desktop (md+): the editorial overlay. Copy sits z-10 in the upper-left
 *     within a max-width column; the building is pinned to the right ~58%
 *     of a min-height section and bottom-aligned, so its left edge stays
 *     clear of the text column.
 *
 * `mt-20` keeps the 80px gap below the sticky nav. The bottom gradient
 * fades the section (white — matching the image's white base) into the
 * editorial page background so the building dissolves into the next
 * section instead of ending on a hard edge.
 */
export function V3Hero() {
  return (
    <section
      id="top"
      className="flex max-w-full flex-col overflow-hidden bg-white md:min-h-[720px]"
    >
      {/* Foreground text block — upper-left. Per-element max-widths replace
          the column-level max-w so the heading can breathe wider than the
          body/CTA row. On md+ the column is capped so the building has room
          on the right. */}
      <Container className="flex z-10">
        <div className="flex flex-col gap-7 md:gap-8 md:max-w-[640px] md:pt-16 lg:max-w-[720px]">
          {/* Heading. The `whitespace-nowrap` span groups "meets making."
              so the wrap is always either single-line or breaks before
              "meets" — never separating "meets" and "making." onto
              different lines. */}
          <h1 className="max-w-[600px] overflow-visible font-serif text-fluid-display-lg leading-[1.05] text-navy-500 md:max-w-[680px] md:leading-[90px]">
            Where design{' '}
            <span className="whitespace-nowrap">
              meets <span className="italic text-red-intextor">making.</span>
            </span>
          </h1>

          <p className="max-w-[520px] font-sans text-fluid-display-2xl font-normal leading-snug text-navy-600 md:max-w-[560px]">
            {HERO_SUBHEAD}
          </p>

          {/* CTA + tagline on a single row, both desktop and mobile.
              gap-6 (24px) mobile, gap-8 (32px) md+, items-center aligns
              the smaller tagline text to the button's vertical center.
              flex-wrap is a safety net for very narrow viewports. */}
          <div className="flex flex-col md:flex-row flex-wrap items-start gap-6 md:gap-8">
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

      {/* Building image.
          Mobile: in-flow full-width band beneath the copy (its own aspect
          box, no overlap). Desktop: absolutely pinned to the right ~58% of
          the section and bottom-aligned, clearing the text column. */}
      <div className="flex pointer-events-none -mt-[14vw] md:-mt-[18rem] lg:-mt-[24rem] relative w-full ">
        <Image
          src="/projects/hero-banner-building.png"
          alt="Sweeping curved architectural façade — a fluid metal envelope wrapping a glazed structure"
          width={2400}
          height={1350}
          priority
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
}
