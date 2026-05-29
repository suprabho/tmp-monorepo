import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { RedAccentLine } from '@/components/shared/RedAccentLine';

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
    width: 645,
    height: 630,
  },
];

/**
 * V1 partners strip — directly under the bordered hero.
 *
 *   - 1px #B1B9C5 (navy-100) hairline frame matches the hero border.
 *   - Horizontal layout at md+: "Partners with" caption sits on the
 *     left side vertically centred, logos centred in the remaining
 *     space to the right. Stacks on mobile.
 *   - Both logos render at the SAME explicit height (`h-* w-auto`),
 *     so PROCURAL's wide aspect and KMC's square aspect both occupy
 *     the same vertical footprint — they read as equal scale even
 *     though their widths differ.
 */
export function V1Partners() {
  return (
    <section className="relative bg-white py-8 md:py-12">
      <RedAccentLine side="left" />
      <Container>
        <div className="flex flex-col items-start gap-10 border border-navy-100 px-8 py-10 md:flex-row md:items-center md:gap-16 md:px-16 md:py-14 lg:px-20 lg:py-16 lg:gap-20">
          <h2
            className="shrink-0 font-serif leading-[1.1]"
            style={{ fontSize: '40px', color: '#223A5E' }}
          >
            Partners with
          </h2>
          <div className="flex w-full flex-1 items-center justify-center gap-16 md:gap-24 lg:gap-32">
            {partners.map((p) => (
              <Image
                key={p.name}
                src={p.src}
                alt={p.name}
                width={p.width}
                height={p.height}
                className="h-24 w-auto md:h-40 lg:h-48"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
