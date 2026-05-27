import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { RevealText } from '@/components/motion/RevealText';
import { HERO_HEADLINE, HERO_SUBHEAD } from '@/content/copy';

/**
 * v1 hero — calm. Word-staggered headline (italic emphasis on "making."
 * with a 1px red underline), subhead, primary CTA. Architectural image
 * scale-settles on first view. No plus motif here — the cross story
 * begins in V1Manifesto below.
 */
export function V1Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-16 md:pt-24">
      <Container>
        <div className="grid items-center gap-10 border border-navy-100 p-6 md:grid-cols-[1fr_1.1fr] md:gap-16 md:p-10 lg:p-14">
          <div className="flex flex-col gap-6 md:gap-8">
            <RevealText
              words={[...HERO_HEADLINE]}
              as="h1"
              emphasisUnderline
              className="font-serif text-fluid-display-lg leading-[1.02] text-navy-500"
            />
            <p className="max-w-md font-serif text-fluid-2xl leading-tight text-navy-400">
              {HERO_SUBHEAD}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#projects"
                className="inline-flex items-center border border-red-intextor bg-transparent px-6 py-3 font-sans text-fluid-base font-medium text-red-intextor transition-colors hover:bg-red-intextor/5"
              >
                See Our Work
              </Link>
              <span className="font-sans text-fluid-sm text-navy-400">
                Trusted fabricator to{' '}
                <span className="font-medium uppercase tracking-wider">Procural</span>
              </span>
            </div>
          </div>

          <div className="image-settle relative aspect-[5/4] w-full">
            <Image
              src="/projects/v1-hero.png"
              alt="Architectural metalwork — engineered façades, slim 42.9 MM sightlines and crafted metal detailing on a contemporary villa"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
