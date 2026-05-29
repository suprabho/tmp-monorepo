import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Footer } from '@/components/shared/Footer';
import { V1Navigation } from '@/components/v1/V1Navigation';
import { projects } from '@/content/projects';

export const metadata = {
  title: 'Selected Work — TMPal',
};

export default function V1ProjectsPage() {
  return (
    <>
      <V1Navigation />
      <main id="main" className="bg-white py-section-y">
        <Container>
          {/* Header */}
          <div className="mb-block-y flex items-end justify-between gap-4">
            <div className="flex max-w-2xl flex-col gap-4">
              <span className="font-sans text-fluid-xs font-bold uppercase tracking-[0.18em] text-red-intextor">
                Portfolio
              </span>
              <h1 className="font-sans text-fluid-display-sm font-medium leading-[1.05] text-navy-700">
                Selected Work.
              </h1>
              <p className="font-serif text-fluid-xl text-navy-400">
                A cross-section of facades, fenestration, and custom metal projects we&apos;ve
                produced for architects and developers.
              </p>
            </div>
            <Link
              href="/v1"
              className="font-sans text-fluid-sm font-bold uppercase tracking-[0.08em] text-navy-700 transition-colors hover:text-red-intextor"
            >
              ← Back
            </Link>
          </div>

          {/* Project grid */}
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <li key={p.slug}>
                <article className="group relative flex h-full flex-col border border-navy-100 bg-white">
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={`${p.title} — ${p.location}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <span className="font-sans text-fluid-xs font-bold uppercase tracking-[0.08em] text-navy-700">
                      {p.familyLabel}
                    </span>
                    <h2 className="mt-2 font-sans text-fluid-2xl font-bold leading-[1.1] text-navy-700">
                      {p.title}
                    </h2>
                    <p className="mt-2 font-serif text-fluid-base italic text-red-intextor">
                      {p.location}
                      {p.collaborator ? `. with ${p.collaborator}` : ''}
                    </p>
                    <p className="mt-4 font-sans text-fluid-sm leading-relaxed text-navy-500">
                      {p.description}
                    </p>
                    <span className="mt-auto self-end pt-6 font-sans text-fluid-base text-navy-100">
                      {p.year}
                    </span>
                  </div>

                  {/* Red bottom accent — always visible, anchored
                      bottom-left at ~1/3 of the card width. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-0 h-5 w-1/3 bg-red-intextor"
                  />
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <Footer tone="light" />
    </>
  );
}
