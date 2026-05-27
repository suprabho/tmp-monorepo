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
 * V1 partners strip — sits directly under the bordered hero.
 *
 *   - 1px #B1B9C5 (navy-100) hairline frame matches the hero border.
 *   - "Partners with" caption sits flush left at the top of the box.
 *   - Logos render inside fixed-size cells so each occupies the same
 *     visual footprint (PROCURAL fills width-wise, KMC fills
 *     height-wise via `object-contain`) — they read as equal weight.
 *   - Cell dimensions chosen large enough that the row fills the
 *     container without excessive empty space on either side.
 */
export function V1Partners() {
  return (
    <section className="bg-white py-8 md:py-12">
      <Container>
        <div className="flex flex-col gap-6 border border-navy-100 px-8 py-6 md:gap-8 md:px-12 md:py-8">
          <span className="font-sans text-fluid-xs uppercase tracking-[0.18em] text-navy-400">
            Partners with
          </span>
          <div className="flex items-center justify-center gap-16 md:gap-28">
            {partners.map((p) => (
              <div
                key={p.name}
                className="relative flex h-16 w-[200px] items-center justify-center md:h-24 md:w-[320px]"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  width={p.width}
                  height={p.height}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
