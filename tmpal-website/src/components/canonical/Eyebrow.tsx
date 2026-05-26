import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface EyebrowProps {
  tone?: 'red' | 'navy' | 'stone';
  children: ReactNode;
  className?: string;
}

const toneCls = {
  red: 'text-red-intextor',
  navy: 'text-navy-500',
  stone: 'text-stone-100',
} as const;

export function Eyebrow({ tone = 'red', children, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        'font-sans text-fluid-base font-bold leading-none tracking-[0.08em]',
        toneCls[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
