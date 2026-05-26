import Image from 'next/image';
import { Eyebrow } from './Eyebrow';

export function CanonicalPartnership() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto w-full max-w-shell px-5 py-section-y sm:px-8 md:px-20">
        <div
          className="grid items-center gap-10 border border-slate-600 px-8 py-12 md:grid-cols-[1.7fr_1fr] md:gap-10 md:px-16 md:py-16"
          style={{ borderRadius: '160px 20px 160px 20px' }}
        >
          <div className="flex flex-col gap-4">
            <Eyebrow tone="red">Partnership</Eyebrow>
            <h3 className="font-sans text-fluid-3xl font-bold leading-[1.05] text-navy-600">
              Manufacturing partner to Procural,
              <br className="hidden md:block" /> a global building systems brand.
            </h3>
            <p className="font-sans text-fluid-lg leading-[1.5] text-navy-600">
              We produce precision aluminium components for Procural&apos;s international portfolio.
              The standards we meet for them are the standards we apply to every project we take
              on.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/projects/procural-logo.png"
              alt="Procural"
              width={320}
              height={120}
              className="h-auto max-w-[240px] md:max-w-[320px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
