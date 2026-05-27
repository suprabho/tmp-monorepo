import Image from 'next/image';
import { Button } from './Button';

interface CanonicalHeroProps {
  onSeeWork?: () => void;
}

export function CanonicalHero({ onSeeWork }: CanonicalHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-shell items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 md:gap-16 md:px-20 md:py-20">
        <div className="flex flex-col">
          <h1 className="font-serif text-fluid-display-lg leading-[1.05] text-navy-600">
            Where design meets <span className="italic">making.</span>
          </h1>
          <p className="mt-6 font-serif text-fluid-2xl leading-tight text-slate-500">
            Steel and aluminium architectural systems, engineered with intent and made under one
            roof.
          </p>
          <div className="mt-9 flex gap-4">
            <Button variant="outline" size="lg" onClick={onSeeWork} href="#projects">
              See Our Work
            </Button>
          </div>
          <p className="mt-8 font-serif text-fluid-xl text-navy-300">
            Trusted fabricator to Procural
          </p>
        </div>

        <div
          className="relative aspect-[5/6] w-full overflow-hidden md:aspect-auto md:h-[580px]"
          style={{ borderRadius: '280px 4px 4px 4px' }}
        >
          <Image
            src="/projects/hero-spraycoating.png"
            alt="Architectural metal spray-coating in progress"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
