import { Container } from './Container';
import { MotionSection } from '../motion/MotionSection';
import { processStages } from '@/content/process';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/theme';

interface HowWeWorkProps {
  tone?: Tone;
  headline?: string;
  /** Kept for back-compat with V2/V3 call sites — rendered above the title
   *  as a small uppercase eyebrow if provided. */
  kicker?: string;
}

/**
 * Process section. 2 × 2 grid of four stages with a numbered red
 * square chip, a bold sans heading, and a body paragraph. Editorial,
 * open, no card chrome.
 */
export function HowWeWork({
  tone = 'light',
  headline = 'How We Work',
  kicker,
}: HowWeWorkProps) {
  const isDark = tone === 'dark';
  return (
    <MotionSection
      id="process"
      className={cn(
        'py-section-y',
        isDark ? 'bg-navy-700 text-slate-200' : 'bg-editorial text-navy-700',
      )}
    >
      <Container>
        {/* Section heading */}
        <div className="mb-block-y flex flex-col gap-3">
          {kicker ? (
            <span
              className={cn(
                'font-sans text-fluid-xs font-bold uppercase tracking-[0.18em]',
                isDark ? 'text-red-intextor' : 'text-red-intextor',
              )}
            >
              {kicker}
            </span>
          ) : null}
          <h2
            className={cn(
              'font-sans text-fluid-display-sm font-medium leading-[1.05]',
              isDark ? 'text-white' : 'text-navy-700',
            )}
          >
            {headline}
          </h2>
        </div>

        {/* 2 × 2 grid of process stages */}
        <ol className="grid gap-x-10 gap-y-14 md:grid-cols-2 md:gap-x-20 md:gap-y-20">
          {processStages.map((stage) => (
            <li key={stage.index} className="flex max-w-xl flex-col items-start">
              {/* Small red numbered square */}
              <span
                aria-hidden
                className="mb-6 inline-flex h-10 w-10 items-center justify-center bg-red-intextor font-sans text-fluid-sm font-bold text-white md:mb-8 md:h-12 md:w-12 md:text-fluid-base"
              >
                {String(stage.index).padStart(2, '0')}
              </span>

              {/* Stage title */}
              <h3
                className={cn(
                  'font-sans text-fluid-2xl font-bold leading-[1.15]',
                  isDark ? 'text-white' : 'text-navy-700',
                )}
              >
                {stage.title}
              </h3>

              {/* Body paragraph */}
              <p
                className={cn(
                  'mt-4 font-sans text-fluid-base leading-relaxed',
                  isDark ? 'text-slate-200/80' : 'text-navy-500',
                )}
              >
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </MotionSection>
  );
}
