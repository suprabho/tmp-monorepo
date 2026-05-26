import { Container } from '@/components/shared/Container';
import { MotionSection } from '@/components/motion/MotionSection';

interface Feature {
  label: string;
  icon: React.ReactNode;
}

const stroke = 1.6;

const features: Feature[] = [
  {
    label: 'Engineered Facades',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={stroke}>
        <rect x="6" y="4" width="20" height="24" />
        <line x1="6" y1="12" x2="26" y2="12" />
        <line x1="6" y1="20" x2="26" y2="20" />
        <line x1="13" y1="4" x2="13" y2="28" />
        <line x1="19" y1="4" x2="19" y2="28" />
      </svg>
    ),
  },
  {
    label: 'Slim sightline 42.9 MM',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={stroke}>
        <rect x="5" y="4" width="22" height="24" />
        <rect x="9" y="8" width="14" height="16" />
        <line x1="5" y1="16" x2="9" y2="16" />
        <line x1="23" y1="16" x2="27" y2="16" />
      </svg>
    ),
  },
  {
    label: 'German Engineered',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={stroke}>
        <circle cx="16" cy="16" r="10" />
        <circle cx="16" cy="16" r="3" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="16" y1="26" x2="16" y2="30" />
        <line x1="2" y1="16" x2="6" y2="16" />
        <line x1="26" y1="16" x2="30" y2="16" />
      </svg>
    ),
  },
  {
    label: 'Crafted metal detailing',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={stroke}>
        <path d="M4 24 L16 6 L28 24 Z" />
        <line x1="11" y1="14" x2="21" y2="14" />
        <line x1="8" y1="19" x2="24" y2="19" />
      </svg>
    ),
  },
];

/**
 * v1's hero feature strip — sits between the hero block and the partners
 * strip. Four short labels with line-style icons.
 */
export function V1HeroFeatures() {
  return (
    <MotionSection className="bg-white pb-block-y">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-navy-100/60 pt-block-y md:grid-cols-4 md:gap-x-10">
          {features.map((f) => (
            <div key={f.label} className="flex items-start gap-3 text-navy-500">
              <span className="block h-7 w-7 shrink-0 text-red-intextor md:h-8 md:w-8">
                {f.icon}
              </span>
              <span className="font-sans text-fluid-base font-medium leading-snug">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
