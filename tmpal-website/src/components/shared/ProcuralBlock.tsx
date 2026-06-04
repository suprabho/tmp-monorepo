import Image from 'next/image';
import { Container } from './Container';
import { MotionSection } from '../motion/MotionSection';
import { PROCURAL_BLOCK_TEXT } from '@/content/copy';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/theme';

interface ProcuralBlockProps {
  tone?: Tone;
  emphasis?: 'subtle' | 'prominent';
}

/**
 * Partnership / Procural block. Light tone (default) renders a minimal
 * architectural panel: stone-tinted background, navy "Partnership" heading
 * in Instrument Serif, supporting copy below, and a dark logo plate
 * containing the supplied white PROCURAL wordmark.
 *
 * The dark tone variant (used in V2) keeps its original treatment.
 */
export function ProcuralBlock({ tone = 'light', emphasis = 'subtle' }: ProcuralBlockProps) {
  const isDark = tone === 'dark';

  if (isDark) {
    return (
      <MotionSection
        id="partnership"
        className="bg-navy-700 py-section-y text-slate-200"
      >
        <Container>
          <div
            className={cn(
              'grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-16',
              emphasis === 'prominent' && 'md:gap-24',
            )}
          >
            <div>
              <span className="font-sans text-fluid-sm font-medium uppercase tracking-[0.18em] text-red-intextor">
                Partnership
              </span>
              <p className="mt-4 font-serif text-fluid-2xl leading-snug md:text-fluid-3xl">
                {PROCURAL_BLOCK_TEXT}
              </p>
            </div>
            <div
              className={cn(
                'flex items-center justify-center rounded-2xl bg-slate-200 p-12 font-serif text-fluid-3xl italic tracking-tight text-navy-700',
                emphasis === 'prominent' && 'md:p-16 md:text-fluid-display-sm',
              )}
            >
              PROCURAL
            </div>
          </div>
        </Container>
      </MotionSection>
    );
  }

  // Light tone — premium architectural panel. "a global building systems
  // brand" is lifted into the TMPal italic serif; the closing sentence drops
  // to a 20px supporting line beneath the headline.
  const ITALIC_PHRASE = 'a global building systems brand';
  const [beforePhrase, afterPhrase] = PROCURAL_BLOCK_TEXT.split(ITALIC_PHRASE);
  const bodyText = afterPhrase.replace(/^\.\s*/, '');

  return (
    <MotionSection id="partnership" className="bg-white py-section-y text-navy-500">
      <Container>
        {/* Large rounded panel — thin blue-grey border, asymmetric large
            top-left / bottom-right radii in the TMPal corner language. */}
        <div className="rounded-tl-[96px] rounded-br-[96px] border border-slate-350/60 bg-white p-10 md:p-[80px]">
          <div className="grid gap-14 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-24">
            {/* Copy */}
            <div className="flex flex-col">
              <span className="font-sans text-fluid-sm font-medium uppercase tracking-[0.18em] text-red-intextor">
                Partnership
              </span>
              <h2
                className="mt-5 font-serif leading-[1.1] text-navy-500"
                style={{ fontSize: 'clamp(56px, 1.2vw + 3rem, 64px)' }}
              >
                {beforePhrase}
                {/* Italic phrase held at its prior size, not scaled with the
                    larger headline. */}
                <em
                  className="italic text-navy-500"
                  style={{ fontSize: 'clamp(30px, 2.2vw + 0.5rem, 46px)' }}
                >
                  {ITALIC_PHRASE}.
                </em>
              </h2>
              <p className="mt-6 max-w-xl font-sans text-[20px] leading-relaxed text-navy-500/75">
                {bodyText}
              </p>
            </div>

            {/* Logo — large, vertically centred on the panel. */}
            <div className="flex items-center justify-center md:justify-end">
              <Image
                src="/projects/procural-logo.png"
                alt="Procural"
                width={383}
                height={131}
                className="h-auto w-full max-w-[420px] md:max-w-[490px]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
