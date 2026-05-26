import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { MotionSection } from '../motion/MotionSection';
import { processStages } from '@/content/process';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/theme';

interface HowWeWorkProps {
  tone?: Tone;
  headline?: string;
  kicker?: string;
}

export function HowWeWork({
  tone = 'light',
  headline = 'How We Work',
  kicker = 'Process',
}: HowWeWorkProps) {
  const isDark = tone === 'dark';
  return (
    <MotionSection
      id="process"
      className={cn('py-section-y', isDark ? 'bg-navy-700 text-slate-200' : 'bg-white text-navy-500')}
    >
      <Container>
        <SectionHeader kicker={kicker} title={headline} />
        <ol className="grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          {processStages.map((stage) => (
            <li key={stage.index} className="relative">
              <span
                className={cn(
                  'mb-4 inline-block font-serif text-fluid-3xl',
                  isDark ? 'text-red-intextor' : 'text-red-intextor',
                )}
              >
                {String(stage.index).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-fluid-xl">{stage.title}</h3>
              <p className="mt-3 text-fluid-base opacity-80">{stage.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </MotionSection>
  );
}
