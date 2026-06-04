'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/cn';

interface FeaturedProject {
  family: string;
  title: string;
  subtitle: string;
  image: string;
}

const projects: FeaturedProject[] = [
  {
    family: 'Facades',
    title: 'Vault House',
    subtitle: 'Alibaug, with Studio Lotus',
    image: '/projects/home1.png',
  },
  {
    family: 'Facades',
    title: 'Curved Envelope',
    subtitle: 'Mumbai · 2023',
    image: '/projects/home2.png',
  },
  {
    family: 'Custom Metal',
    title: 'Spray-Coat Atelier',
    subtitle: 'Pune · 2022',
    image: '/projects/hero-spraycoating.png',
  },
  {
    family: 'Fenestration',
    title: 'Villa Aragost',
    subtitle: 'Bengaluru · 2021',
    image: '/projects/v1-hero.png',
  },
];

/**
 * v3 Selected Work — spacious paired-row carousel.
 *
 * Spacing spec
 *   • 120px L/R section padding.
 *   • 100px gap between header and the first row.
 *   • 120px gap between Row 1 and Row 2.
 *   • 80px horizontal gap between card and image inside each row.
 *
 * Layout grid
 *   [ prev ] [ project rows ] [ next ]
 *   Arrows live in their own auto columns and are vertically centred on
 *   Row 1's height. The middle 1fr column hosts the stacked rows.
 *
 * Both arrows are entirely neutral grey — no border, no red stroke at
 * any state. They cycle through pairs in either direction (wrap on
 * boundaries).
 */
export function V3FeaturedProjects() {
  const PAIR = 2;
  const pageCount = Math.ceil(projects.length / PAIR);
  const [page, setPage] = useState(0);

  const next = useCallback(
    () => setPage((p) => (p + 1) % pageCount),
    [pageCount],
  );
  const prev = useCallback(
    () => setPage((p) => (p - 1 + pageCount) % pageCount),
    [pageCount],
  );

  const a = projects[(page * PAIR) % projects.length];
  const b = projects[(page * PAIR + 1) % projects.length];

  return (
    <section
      id="projects"
      // Full-bleed section (no max-w-shell Container) so the layout grows
      // with the viewport. 120px L/R padding per spec.
      //
      // `relative z-10`: the partners strip above us is lifted -340px into
      // the hero, which means the hero's own positioned box overlaps the
      // top of this section. Without our own stacking context the hero
      // would paint on top of the lede heading and hide line 1.
      //
      // pt-20 = 80px top padding, replacing the larger py-section-y on top
      // only — gives ~80px between the partners section's last logo and
      // the Selected Work heading per the compact-spacing spec. Bottom
      // stays pb-section-y so the gap to the next section is unchanged.
      className="relative z-10 bg-white pb-section-y pt-20 text-navy-500 px-6 sm:px-10 md:px-16 lg:px-[120px]"
    >
      {/* Header — 100px below the intro */}
      <div className="mb-16 flex flex-col gap-5 lg:mb-[100px]">
        <p className="max-w-3xl font-serif text-fluid-3xl leading-snug text-navy-500">
          Projects where <em className="italic text-red-intextor/90">drawing</em>{' '}
          and <em className="italic text-red-intextor/90">steel</em> met
          <br />
          without compromise.
        </p>
        <span className="font-sans text-fluid-sm font-medium uppercase tracking-[0.22em] text-red-intextor">
          Selected Work
        </span>
      </div>

      {/* Carousel body: [prev] [rows] [next] */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[auto_1fr_auto] md:gap-10 lg:gap-14">
        {/* Prev — stretches to the cell grid's height and centres its button. */}
        <div className="hidden md:flex md:items-center">
          <CarouselNav direction="prev" onClick={prev} />
        </div>

        {/* Project cells — keyed on page for the soft fade-in on swap.
            The container is locked to Cossicon2.svg's aspect ratio, which is
            now square (1160 × 1160). Each of the four cells is absolutely
            positioned to the SVG's own edge percentages, so the SVG (inset-0)
            overlays the gaps precisely at every viewport. A square container
            means 1 viewBox unit is the same px on both axes, so all four gap
            arms render at an equal width.

            The SVG is a symmetric cross centred at x=y=580 in the 1160 box
            (i.e. 50%), with 200-unit rounded corners. So every cell is exactly
            half the box — 50% × 50% — touching the strokes at the centre line.
            The two cards (top-left, bottom-right) own the rounded scoops; the
            two images sit in the opposite corners.

            Then every cell is pulled back from the centre by a single `--gap`
            (subtracted from each inner-facing edge) and the card scoop radius
            is reduced by the same `--gap`, so the navy line floats with an
            equal visual gap to every red div and image. Because the container
            is square, a single px `--gap` reads as uniform all the way around. */}
        <div
          key={page}
          // `container-type: inline-size` makes this box a query container so
          // children can size against ITS width with `cqw` units. That lets
          // the card scoop radius (`--cut`) be an exact fraction of the same
          // width the cell percentages use — keeping the card arc concentric
          // with the SVG arc, so the gap is identical on flats and curve.
          className="relative aspect-square w-full v3-fade-in [--gap:clamp(10px,1.1vw,22px)] [container-type:inline-size]"
        >
          {/* Top-left — project A card, br scoop opening toward the centre. */}
          <div className="absolute left-0 top-0 h-[calc(50%_-_var(--gap))] w-[calc(50%_-_var(--gap))]">
            <ProjectCard
              family={a.family}
              title={a.title}
              subtitle={a.subtitle}
              cutoutCorner="br"
            />
          </div>

          {/* Top-right — project A image. */}
          <div className="absolute right-0 top-0 h-[calc(50%_-_var(--gap))] w-[calc(50%_-_var(--gap))]">
            <ProjectImage title={a.title} src={a.image} />
          </div>

          {/* Bottom-left — project B image. */}
          <div className="absolute bottom-0 left-0 h-[calc(50%_-_var(--gap))] w-[calc(50%_-_var(--gap))]">
            <ProjectImage title={b.title} src={b.image} />
          </div>

          {/* Bottom-right — project B card, tl scoop opening toward the centre. */}
          <div className="absolute bottom-0 right-0 h-[calc(50%_-_var(--gap))] w-[calc(50%_-_var(--gap))]">
            <ProjectCard
              family={b.family}
              title={b.title}
              subtitle={b.subtitle}
              cutoutCorner="tl"
            />
          </div>

          {/* Cross-line overlay. Filling the square container exactly, its
              two opposing rounded corners (radius 200 / 1160 ≈ 17.24% of
              width) land on the card scoops, and its strokes fall in the gaps.
              `vector-effect: non-scaling-stroke` in the source keeps the
              hairline a crisp, constant 2px at any width. Decorative. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            aria-hidden
            alt=""
            src="/projects/Cossicon2.svg"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          />
        </div>

        {/* Next — mirrored on the right. */}
        <div className="hidden md:flex md:items-center">
          <CarouselNav direction="next" onClick={next} />
        </div>

        {/* Mobile: both controls below the rows, spread apart. */}
        <div className="flex justify-between gap-4 md:hidden">
          <CarouselNav direction="prev" onClick={prev} />
          <CarouselNav direction="next" onClick={next} />
        </div>
      </div>

      {/* Connector — continues the Cossicon2 cross-line (#465A78) down from
          the carousel to this section's bottom edge, where it meets the Brand
          Story line for one continuous flow. Centred on the carousel axis. */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-[200px] w-[2px] -translate-x-1/2 rounded-full bg-[#465A78] md:block"
      />
    </section>
  );
}

/* ----------------------------- subcomponents ---------------------------- */

interface ProjectCardProps {
  family: string;
  title: string;
  subtitle: string;
  /** Which corner gets the large quarter-circle scoop. */
  cutoutCorner: 'br' | 'bl' | 'tl' | 'tr';
}

// The scoop radius must equal the rounded corners drawn into Cossicon2.svg so
// the red card's curve reads as one continuous line with the navy stroke. In
// that SVG each corner is a circular quarter-arc of radius 200 units inside a
// 1160-wide square viewBox — i.e. 200 / 1160 = 17.2414% of the SVG's rendered
// width. The SVG fills the square rows container, so the card radius must be
// that same 17.2414% of the container width. We get it exactly with
// `--cut: 17.2414cqw` (set on the card; see ProjectCard), which resolves
// against the container's inline size thanks to its `container-type:
// inline-size`. The rendered radius is `--cut - --gap` so the card arc sits
// one gap inside the SVG arc while remaining concentric with it — that
// concentricity is what keeps the gap uniform around the curve, not just
// along the straight edges.
const cutoutClasses: Record<ProjectCardProps['cutoutCorner'], string> = {
  br: 'rounded-br-[calc(var(--cut)_-_var(--gap))]',
  bl: 'rounded-bl-[calc(var(--cut)_-_var(--gap))]',
  tl: 'rounded-tl-[calc(var(--cut)_-_var(--gap))]',
  tr: 'rounded-tr-[calc(var(--cut)_-_var(--gap))]',
};

function ProjectCard({
  family,
  title,
  subtitle,
  cutoutCorner,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        'relative flex h-full items-center justify-center bg-red-intextor px-8 py-10 text-white md:px-12 lg:px-16',
        // --cut = the SVG's corner radius as an exact fraction of the rows
        // container's width: 200 / 1160 = 17.2414%, expressed in `cqw`
        // (1cqw = 1% of the container's inline size). Exactness matters — the
        // card arc and the SVG arc are concentric only when this equals the
        // SVG radius precisely, which is what makes the curve gap match the
        // straight gap. The actual rounded radius is `--cut - --gap` (below),
        // pulling the card arc inward by one gap while staying concentric.
        '[--cut:17.2414cqw]',
        cutoutClasses[cutoutCorner],
      )}
    >
      <div className="flex max-w-md flex-col items-center gap-2 text-center">
        <h3 className="font-sans text-fluid-xl font-bold leading-tight tracking-tight">
          {family}, {title}
        </h3>
        <p className="font-serif text-fluid-base italic leading-snug text-white/80">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

interface ProjectImageProps {
  title: string;
  src: string;
}

function ProjectImage({ title, src }: ProjectImageProps) {
  return (
    <div className="group relative h-full w-full overflow-hidden">
      <Image
        src={src}
        alt={`${title} — architectural project`}
        fill
        sizes="45vw"
        // saturate-[.75] = 25% reduction; keeps contrast/lighting intact.
        className="object-cover saturate-[.75] transition-transform duration-500 ease-out-quart group-hover:scale-[1.05]"
      />
    </div>
  );
}

interface CarouselNavProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

function CarouselNav({ direction, onClick }: CarouselNavProps) {
  const isPrev = direction === 'prev';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Previous projects' : 'Next projects'}
      // Neutral grey square — no border, no red ring at any state.
      // Hover/focus darken slightly to confirm interactivity.
      className="grid h-16 w-16 shrink-0 place-items-center border-0 bg-stone-50 text-navy-700 transition-colors duration-fast ease-out-quart hover:bg-stone-100 focus:outline-none focus-visible:bg-stone-100 md:h-20 md:w-20 lg:h-24 lg:w-24"
    >
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
        className={isPrev ? 'rotate-180' : ''}
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
