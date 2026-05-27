import { Container } from '@/components/shared/Container';
import { RevealText } from '@/components/motion/RevealText';
import { HERO_HEADLINE, HERO_SUBHEAD } from '@/content/copy';

/**
 * v3 hero — intentionally simple. The motion showpiece for v3 lives in
 * the editorial stack below; the hero is a quiet entrance.
 */
export function V3Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-editorial pt-16 md:pt-24">
      <Container>
        <div className="grid items-end gap-10 pb-section-y md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div className="flex flex-col gap-6 md:gap-8">
            <RevealText
              words={[...HERO_HEADLINE]}
              as="h1"
              className="font-serif text-fluid-display-lg leading-[1.02] text-navy-500"
            />
            <p className="max-w-md font-serif text-fluid-2xl leading-tight text-navy-400">
              {HERO_SUBHEAD}
            </p>
            <button
              type="button"
              className="self-start font-sans text-fluid-base font-medium uppercase tracking-[0.18em] text-red-intextor"
            >
              Selected Work →
            </button>
          </div>

          <div className="image-settle relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-navy-100 via-slate-200 to-navy-300/40">
            <div className="absolute inset-0 grid place-items-center text-navy-400/40">
              <span className="font-sans text-fluid-sm uppercase tracking-[0.25em]">
                Curved building hero
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
