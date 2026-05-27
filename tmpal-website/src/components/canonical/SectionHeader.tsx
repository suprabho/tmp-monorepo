import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';

interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  eyebrowTone?: 'red' | 'navy' | 'stone';
  inverse?: boolean;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  eyebrowTone = 'red',
  inverse = false,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          'font-sans text-fluid-display-sm font-bold leading-[1.1]',
          inverse ? 'text-white' : 'text-navy-600',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            'mt-3 font-serif text-fluid-2xl leading-tight',
            inverse ? 'text-white/80' : 'text-slate-500',
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
