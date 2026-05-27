'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Icon } from './Icon';
import { SectionHeader } from './SectionHeader';

const works = [
  {
    name: 'Vault House',
    loc: 'Alibaug · with Studio Lotus',
    img: '/projects/vault-house.png',
  },
  {
    name: 'Continental HQ',
    loc: 'Hyderabad · façade system',
    img: '/projects/facades.png',
  },
  {
    name: 'Riverside Pavilion',
    loc: 'Bangalore · steel + glass',
    img: '/projects/fenestration.png',
  },
];

export function CanonicalSelectedWork() {
  const [slide, setSlide] = useState(0);
  const w = works[slide];
  const total = works.length;

  return (
    <section id="projects" className="bg-navy-700 text-white">
      <div className="mx-auto w-full max-w-shell px-5 py-section-y sm:px-8 md:px-20">
        <SectionHeader
          eyebrow="Selected Work"
          eyebrowTone="stone"
          inverse
          title={
            <>
              Projects where drawing and steel met
              <br className="hidden md:block" /> without compromise.
            </>
          }
        />

        <div className="mt-14 grid items-center gap-10 md:grid-cols-2">
          <div
            className="relative h-[360px] w-full overflow-hidden md:h-[500px]"
            style={{ borderRadius: '60px 4px 4px 4px' }}
          >
            <Image
              key={w.img}
              src={w.img}
              alt={w.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-opacity duration-base ease-out-quart"
            />
          </div>
          <div className="text-left">
            <div className="font-sans text-fluid-display-sm font-bold leading-[1.05]">
              {w.name}
            </div>
            <div className="mt-3 font-serif text-fluid-2xl italic text-white/75">{w.loc}</div>
            <p className="mt-6 max-w-[520px] font-sans text-fluid-lg leading-relaxed text-white/85">
              Unitised façade + steel detailing engineered for performance, finished to
              architectural intent. Designed in concert with the studio, produced and dispatched
              from a single facility.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => setSlide((s) => (s - 1 + total) % total)}
                className="inline-flex items-center gap-2.5 bg-white px-6 py-3.5 font-sans text-fluid-lg text-navy-600 shadow-tmp-1 transition-opacity duration-fast ease-out-quart hover:opacity-90"
              >
                <Icon name="arrow-left" size={20} className="text-red-intextor" />
                Prev
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => setSlide((s) => (s + 1) % total)}
                className="inline-flex items-center gap-2.5 bg-white px-6 py-3.5 font-sans text-fluid-lg text-navy-600 shadow-tmp-1 transition-opacity duration-fast ease-out-quart hover:opacity-90"
              >
                Next
                <Icon name="arrow-right" size={20} className="text-red-intextor" />
              </button>
              <span className="ml-2 font-sans text-fluid-sm text-white/60">
                {slide + 1} / {total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
