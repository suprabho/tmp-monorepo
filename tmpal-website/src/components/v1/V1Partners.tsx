import Image from 'next/image';
import { Container } from '@/components/shared/Container';

const partners = [
  {
    name: 'Procural · Aluminium Systems',
    src: '/projects/partner-procural.png',
    width: 1410,
    height: 580,
  },
  {
    name: 'First KMC · Interior Hardware',
    src: '/projects/partner-firstkmc.png',
    width: 580,
    height: 580,
  },
];

/**
 * V1 partners strip — directly beneath the bordered hero.
 *
 *   - 1px #B1B9C5 (navy-100) hairline frame matches the hero border.
 *   - Compact vertical rhythm (py-5 / md:py-7) so the section reads as
 *     a quiet ribbon, not a heavy block.
 *   - Caption sits centred above the logos; logos themselves render in a
 *     single centred row at a uniform `h-10 md:h-12`. With identical
 *     heights and `w-auto`, both marks scale proportionally to their
 *     native aspect — PROCURAL reads wider, KMC reads square, but they
 *     share visual weight.
 */
export function V1Partners() {
  return (
    <section className="bg-white py-8 md:py-12">
      <Container>
        <div className="flex flex-col items-center gap-5 border border-navy-100 px-6 py-5 md:gap-6 md:px-10 md:py-7">
          <span className="font-sans text-fluid-xs uppercase tracking-[0.18em] text-navy-400">
            Partners with
          </span>
          <div className="flex items-center justify-center gap-12 md:gap-20">
            {partners.map((p) => (
              <Image
                key={p.name}
                src={p.src}
                alt={p.name}
                width={p.width}
                height={p.height}
                className="h-10 w-auto md:h-12"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
