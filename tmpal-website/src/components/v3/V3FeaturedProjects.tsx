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
        {/* Prev — vertically centred on Row 1 via a fixed-height flex column. */}
        <div className="hidden md:flex md:h-[480px] md:items-center lg:h-[560px]">
          <CarouselNav direction="prev" onClick={prev} />
        </div>

        {/* Project rows — keyed on page for the soft fade-in on swap. */}
        <div
          key={page}
          className="relative flex flex-col gap-16 v3-fade-in md:gap-24 lg:gap-[120px]"
        >
          <ProjectRow project={a} variant="card-portrait" />
          <ProjectRow project={b} variant="landscape-card" />

          {/* Single cross-icon at the central intersection where all four
              cards meet. Horizontally it sits on the column gap (x = 50%);
              vertically it sits at the midpoint of the inter-row gap — i.e.
              Row 1's height plus half the gap below it (base 400+32, md
              480+48, lg 560+60). Sized to stay inside the gap cross so its
              arms never reach into the cards.

              Loaded from Cossicon2.svg (1237×1102, two opposing rounded
              corners). The source SVG carries `vector-effect:
              non-scaling-stroke`, so its hairline stays a crisp, constant
              width even at this small display size (a plain stroked PNG/SVG
              would go sub-pixel and vanish here). Decorative. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            aria-hidden
            alt=""
            src="/projects/Cossicon2.svg"
            className="pointer-events-none absolute left-1/2 top-[432px] z-10 w-9 -translate-x-1/2 -translate-y-1/2 md:top-[528px] md:w-14 lg:top-[620px] lg:w-20"
          />
        </div>

        {/* Next — mirrored on the right. */}
        <div className="hidden md:flex md:h-[480px] md:items-center lg:h-[560px]">
          <CarouselNav direction="next" onClick={next} />
        </div>

        {/* Mobile: both controls below the rows, spread apart. */}
        <div className="flex justify-between gap-4 md:hidden">
          <CarouselNav direction="prev" onClick={prev} />
          <CarouselNav direction="next" onClick={next} />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- subcomponents ---------------------------- */

interface ProjectRowProps {
  project: FeaturedProject;
  variant: 'card-portrait' | 'landscape-card';
}

function ProjectRow({ project, variant }: ProjectRowProps) {
  const cardOnLeft = variant === 'card-portrait';
  const card = (
    <ProjectCard
      family={project.family}
      title={project.title}
      subtitle={project.subtitle}
      // Row 1 (card-portrait): scoop opens DOWN toward the image on the right.
      // Row 2 (landscape-card): scoop opens UP toward the image's top-right.
      cutoutCorner={cardOnLeft ? 'br' : 'tl'}
    />
  );
  const image = (
    <ProjectImage title={project.title} src={project.image} />
  );
  // Row 1 (card + portrait): tall, square-ish.
  // Row 2 (landscape + card): shorter, wide.
  const rowHeight =
    variant === 'card-portrait'
      ? 'min-h-[400px] md:h-[480px] lg:h-[560px]'
      : 'min-h-[320px] md:h-[340px] lg:h-[400px]';
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-10 md:gap-x-16 lg:gap-x-[96px]',
        rowHeight,
      )}
    >
      {cardOnLeft ? (
        <>
          {card}
          {image}
        </>
      ) : (
        <>
          {image}
          {card}
        </>
      )}
    </div>
  );
}

interface ProjectCardProps {
  family: string;
  title: string;
  subtitle: string;
  /** Which corner gets the large quarter-circle scoop. */
  cutoutCorner: 'br' | 'bl' | 'tl' | 'tr';
}

const cutoutClasses: Record<ProjectCardProps['cutoutCorner'], string> = {
  br: 'rounded-br-[140px] lg:rounded-br-[180px]',
  bl: 'rounded-bl-[140px] lg:rounded-bl-[180px]',
  tl: 'rounded-tl-[140px] lg:rounded-tl-[180px]',
  tr: 'rounded-tr-[140px] lg:rounded-tr-[180px]',
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
