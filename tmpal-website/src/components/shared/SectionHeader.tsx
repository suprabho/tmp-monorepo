import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  kicker?: string;
  title: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

export function SectionHeader({ kicker, title, align = 'start', className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-block-y flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {kicker ? (
        <span className="font-sans text-fluid-sm font-medium uppercase tracking-[0.18em] text-red-intextor">
          {kicker}
        </span>
      ) : null}
      <h2 className="font-serif text-fluid-3xl text-navy-500">{title}</h2>
    </div>
  );
}
