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

  // Light tone — the V1 minimal architectural treatment.
  return (
    <MotionSection
      id="partnership"
      className="py-section-y text-navy-500"
      style={{ backgroundColor: 'rgba(213, 217, 223, 0.4)' }}
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-20">
          {/* Copy */}
          <div className="flex flex-col">
            <h2
              className="font-serif leading-[1.1]"
              style={{ fontSize: '40px', color: '#223A5E' }}
            >
              Partnership
            </h2>
            <p className="mt-6 max-w-xl font-serif text-fluid-xl leading-[1.4] text-navy-500/85">
              {PROCURAL_BLOCK_TEXT}
            </p>
          </div>

          {/* Logo plate — dark navy backdrop so the white-suffix wordmark reads */}
          <div className="flex items-center justify-center bg-navy-700 px-8 py-12 md:px-12 md:py-16">
            <Image
              src="/projects/procural-logo-white.png"
              alt="Procural"
              width={1001}
              height={437}
              className="h-auto w-full max-w-[280px] md:max-w-[320px]"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
