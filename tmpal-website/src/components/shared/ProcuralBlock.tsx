import { Container } from './Container';
import { MotionSection } from '../motion/MotionSection';
import { PROCURAL_BLOCK_TEXT } from '@/content/copy';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/theme';

interface ProcuralBlockProps {
  tone?: Tone;
  emphasis?: 'subtle' | 'prominent';
}

export function ProcuralBlock({ tone = 'light', emphasis = 'subtle' }: ProcuralBlockProps) {
  const isDark = tone === 'dark';
  return (
    <MotionSection
      id="partnership"
      className={cn(
        'py-section-y',
        isDark ? 'bg-navy-700 text-slate-200' : 'bg-editorial text-navy-500',
      )}
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
              'flex items-center justify-center rounded-2xl p-12 font-serif text-fluid-3xl italic tracking-tight',
              isDark ? 'bg-slate-200 text-navy-700' : 'bg-navy-500 text-white',
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
