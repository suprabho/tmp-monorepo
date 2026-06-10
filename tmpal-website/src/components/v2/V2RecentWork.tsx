import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';

/**
 * Recent Work — a clean, equal-size project grid (three per row, two rows).
 * Image-forward and minimal: each card holds one project photo with a subtle
 * zoom and a title reveal on hover, plus the red brand rule.
 */

interface Project {
  key: string;
  title: string;
  meta: string;
  image: string;
}

const projects: Project[] = [
  { key: 'vault-house', title: 'Vault House', meta: 'Alibaug', image: '/projects/vault-house.png' },
  { key: 'continental-hq', title: 'Continental HQ', meta: 'Hyderabad', image: '/projects/facades.png' },
  { key: 'riverside', title: 'Riverside Pavilion', meta: 'Bangalore', image: '/projects/fenestration.png' },
  { key: 'metalworks', title: 'Metalworks Screen', meta: 'Mumbai', image: '/projects/custom-metal.png' },
  { key: 'curved', title: 'Curved Envelope', meta: 'Mumbai', image: '/projects/home2.png' },
  { key: 'spraycoat', title: 'Spray-Coat Atelier', meta: 'Pune', image: '/projects/hero-spraycoating.png' },
];

export function V2RecentWork() {
  return (
    <section id="work" className="bg-white py-section-y text-navy-500">
      <Container>
        <SectionHeader kicker="Recent Work" align="center" title="Projects that shape spaces." />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {projects.map((p) => (
            <article
              key={p.key}
              className="group/tile relative aspect-[4/3] overflow-hidden bg-navy-500"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover/tile:scale-105"
              />
              {/* Title reveal over a soft scrim. */}
              <div className="absolute inset-0 flex flex-col justify-end gap-1 bg-gradient-to-t from-navy-700/70 via-navy-700/10 to-transparent p-4 opacity-0 transition-opacity duration-500 ease-out group-hover/tile:opacity-100 md:p-5">
                <p className="font-serif text-fluid-xl leading-tight text-white">{p.title}</p>
                <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/70">
                  {p.meta}
                </p>
              </div>
              {/* Red brand rule — scales in from the left on hover. */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[4px] origin-left scale-x-0 bg-red-intextor transition-transform duration-300 ease-out group-hover/tile:scale-x-100"
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
