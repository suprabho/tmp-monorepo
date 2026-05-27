import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CanonicalFeatureBandProps {
  tone?: 'dark' | 'light' | 'red';
  quote: ReactNode;
  image?: string;
  imageOnRight?: boolean;
  imageAlt?: string;
}

const toneCls = {
  dark: 'bg-navy-700 text-white',
  light: 'bg-stone-50 text-slate-500',
  red: 'bg-red-intextor text-white',
} as const;

export function CanonicalFeatureBand({
  tone = 'dark',
  quote,
  image = '/projects/intersection-mark.png',
  imageOnRight = false,
  imageAlt = 'TMPal intersection mark',
}: CanonicalFeatureBandProps) {
  const imageBlock = (
    <div className="relative h-[280px] w-full md:h-[480px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain object-center"
      />
    </div>
  );

  return (
    <section className={cn(toneCls[tone])}>
      <div className="mx-auto grid w-full max-w-shell items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_1fr] md:gap-16 md:px-20 md:py-24">
        {!imageOnRight && imageBlock}
        <div>
          <p className="font-serif text-fluid-display italic leading-[1.15]">{quote}</p>
        </div>
        {imageOnRight && imageBlock}
      </div>
    </section>
  );
}
