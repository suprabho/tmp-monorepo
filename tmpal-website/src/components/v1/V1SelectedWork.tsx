'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Container } from '@/components/shared/Container';
import { projects } from '@/content/projects';

/**
 * V1 Selected Work — horizontal editorial card sitting on top of a
 * large red architectural plane.
 *
 *   ┌── Section header ──────────────────────────────────────────┐
 *   │  Selected Work                            Explore All →    │
 *   ├────────────────────────────────────────────────────────────┤
 *   │  ◀  ┌──────────────────┬────────────────────┐  ▶           │
 *   │     │ grayscale photo  │  Category          │              │
 *   │     │ (hover: zoom)    │  Project Title     │              │
 *   │     │                  │  Location, with X  │              │
 *   │     │                  │  Description …     │              │
 *   │     │                  │                2024│              │
 *   │     └──────────────────┴────────────────────┘              │
 *   │ ███████████████████████████████████████████████████████████│ ← red plane
 *   │ ███████████████████████████████████████████████████████████│   (full-bleed,
 *   │ ███████████████████████████████████████████████████████████│    behind card,
 *   │ ███████████████████████████████████████████████████████████│    extends below)
 *   └────────────────────────────────────────────────────────────┘
 */
export function V1SelectedWork() {
  const total = projects.length;
  const [index, setIndex] = useState(0);
  const project = projects[index];

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <section id="projects" className="relative overflow-hidden bg-white pt-section-y">
      {/* Section header */}
      <Container>
        <div className="mb-block-y flex items-center justify-between gap-4">
          <h2 className="font-sans text-fluid-3xl font-medium text-navy-700">Selected Work</h2>
          <Link
            href="/v1/projects"
            className="font-sans text-fluid-sm font-bold uppercase tracking-[0.08em] text-navy-700 transition-colors hover:text-red-intextor"
          >
            Explore All
          </Link>
        </div>
      </Container>

      {/* Wrapper for the card + the red background plane.
          pb-* reserves space below the card so the red plane visibly
          extends past the bottom of the card. */}
      <div className="relative pb-16 md:pb-24">
        {/* Large red architectural plane — sits behind the lower portion
            of the card. Full-bleed (no Container) so it extends to the
            viewport edges; the section's overflow-hidden caps it. */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-[200px] bg-red-intextor md:h-[240px]"
        />

        {/* Card row — relative + z to stack above the red plane */}
        <Container className="relative z-10">
          <div className="flex items-stretch gap-4 md:gap-6">
            <NavButton direction="prev" onClick={prev} aria-label="Previous project" />

            <article className="group flex-1 border border-navy-100 bg-white">
              <div className="grid md:grid-cols-[1.15fr_1fr]">
                {/* Image — grayscale by default; only this element zooms on hover. */}
                <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full">
                  <Image
                    key={project.slug}
                    src={project.image}
                    alt={`${project.title} — ${project.location}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover object-center grayscale transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content panel */}
                <div className="relative flex flex-col p-7 md:p-12">
                  <span className="font-sans text-fluid-base font-bold text-navy-700">
                    {project.familyLabel}
                  </span>
                  <h3 className="mt-3 font-sans text-fluid-display-sm font-bold leading-[1.05] text-navy-700">
                    {project.title}
                  </h3>
                  <p className="mt-2 font-serif text-fluid-xl italic text-red-intextor">
                    {project.location}
                    {project.collaborator ? `. with ${project.collaborator}` : ''}
                  </p>
                  <p className="mt-6 max-w-md font-sans text-fluid-base leading-relaxed text-navy-500">
                    {project.description}
                  </p>
                  <span className="mt-auto self-end pt-12 font-sans text-fluid-2xl text-navy-100">
                    {project.year}
                  </span>
                </div>
              </div>
            </article>

            <NavButton direction="next" onClick={next} aria-label="Next project" />
          </div>
        </Container>
      </div>
    </section>
  );
}

interface NavButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  'aria-label': string;
}

function NavButton({ direction, onClick, ...rest }: NavButtonProps) {
  const isPrev = direction === 'prev';
  return (
    <button
      type="button"
      onClick={onClick}
      className="my-auto hidden h-11 w-11 shrink-0 items-center justify-center border border-navy-100 bg-white text-navy-500 transition-colors duration-200 ease-out hover:border-red-intextor hover:text-red-intextor md:inline-flex"
      {...rest}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {isPrev ? <path d="M19 12H5M11 5l-7 7 7 7" /> : <path d="M5 12h14M13 5l7 7-7 7" />}
      </svg>
    </button>
  );
}
