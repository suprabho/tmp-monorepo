import Image from 'next/image';
import { Container } from '@/components/shared/Container';

const partners = [
  {
    name: 'Procural · Aluminium Systems',
    src: '/projects/partner-procural.png',
    width: 480,
    height: 200,
  },
  {
    name: 'First KMC · Interior Hardware',
    src: '/projects/partner-firstkmc.png',
    width: 280,
    height: 280,
  },
];

/**
 * V1 partners strip — sits directly under the bordered hero.
 *
 *   - 1px #B1B9C5 (navy-100) hairline frame matches the hero border
 *   - Logos rendered as actual images, evenly spaced via `justify-around`
 *   - Vertically centred via `items-center`; min-h sets a comfortable bay
 *   - Caption "Partners with" sits inside the bordered container, top-left
 */
export function V1Partners() {
  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <div className="flex flex-col gap-6 border border-navy-100 p-6 md:gap-8 md:p-10">
          <span className="font-sans text-fluid-xs uppercase tracking-[0.18em] text-navy-400">
            Partners with
          </span>
          <div className="flex min-h-[140px] flex-wrap items-center justify-around gap-x-12 gap-y-8 md:min-h-[180px] md:gap-x-20">
            {partners.map((p) => (
              <div
                key={p.name}
                className="relative flex h-20 w-[180px] items-center justify-center md:h-24 md:w-[260px]"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  width={p.width}
                  height={p.height}
                  className="max-h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
