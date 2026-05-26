import Image from 'next/image';
import { SectionHeader } from './SectionHeader';

const items = [
  {
    name: 'Steel & aluminium façades',
    desc: 'Unitised and stick-built systems, engineered for performance and detailed to drawing-board intent.',
    img: '/projects/facades.png',
    radius: '126px 20px 20px 20px',
  },
  {
    name: 'Doors, windows & partitions',
    desc: 'Slim-profile steel windows, pivot doors, framed and frameless partitions. Glazing options across the performance spectrum.',
    img: '/projects/fenestration.png',
    radius: '20px',
  },
  {
    name: 'Custom architectural metal',
    desc: 'Bespoke fabrication for staircases, railings, screens, and one-off architectural elements.',
    img: '/projects/custom-metal.png',
    radius: '20px 126px 20px 20px',
  },
];

export function CanonicalSystems() {
  return (
    <section id="services" className="bg-stone-100/30">
      <div className="mx-auto w-full max-w-shell px-5 py-section-y sm:px-8 md:px-20">
        <SectionHeader eyebrow="What we make" title="Three system families. One factory." />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.name}
              className="group flex h-[480px] cursor-pointer flex-col overflow-hidden bg-slate-700 text-white transition-transform duration-base ease-out-quart hover:-translate-y-1"
              style={{ borderRadius: it.radius }}
            >
              <div className="relative h-[280px] w-full overflow-hidden">
                <Image
                  src={it.img}
                  alt={it.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 p-8">
                <h3 className="font-sans text-fluid-xl font-bold leading-none">{it.name}</h3>
                <p className="font-sans text-fluid-sm leading-[1.5] text-stone-100">{it.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
