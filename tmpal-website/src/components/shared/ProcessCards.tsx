import Image from 'next/image';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { MotionSection } from '../motion/MotionSection';
import { processStages } from '@/content/process';
import { cn } from '@/lib/cn';

interface ProcessCardsProps {
  headline?: string;
  kicker?: string;
}

/**
 * Red icon per stage, ordered to match `processStages`
 * (draw → code → proto → production). The SVGs ship already filled in
 * red-intextor (#FE1116), so they render as-is.
 */
const stepIcons = ['/projects/draw.svg', '/projects/code.svg', '/projects/proto.svg', '/projects/production.svg'];

/**
 * v3 process section — four equal cards in one row. Soft blue-grey card
 * fill (slate-350/30), navy-600 copy, red outline icons. The first card
 * carries a large bottom-left radius and the last a large bottom-right
 * radius so the row reads as one framed band.
 */
export function ProcessCards({ headline = 'Four stages, one team.', kicker = 'Process' }: ProcessCardsProps) {
  return (
    <MotionSection id="process" className="relative bg-white py-section-y text-navy-600">
      <Container>
        <SectionHeader kicker={kicker} title={headline} />

        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processStages.map((stage, i) => (
            <li
              key={stage.index}
              className={cn(
                'flex flex-col bg-slate-350/30 p-10',
                i === 0 && 'rounded-bl-[74px]',
                i === processStages.length - 1 && 'rounded-br-[74px]',
              )}
            >
              {/* Red icon */}
              <Image
                src={stepIcons[i]}
                alt=""
                aria-hidden
                width={48}
                height={48}
                className="h-12 w-12"
              />

              {/* Stage title */}
              <h3 className="mt-8 font-sans text-fluid-xl font-bold leading-[1.15] text-navy-600">
                {stage.title}
              </h3>

              {/* Body paragraph */}
              <p className="mt-4 font-sans text-fluid-base leading-relaxed text-navy-600/80">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </MotionSection>
  );
}
