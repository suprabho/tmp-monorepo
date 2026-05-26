import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  /** `shell` is the widest design width (1728px). `wide` adds breathing room. `narrow` for editorial copy. */
  width?: 'shell' | 'wide' | 'narrow';
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>;

const widths = {
  shell: 'max-w-shell',
  wide: 'max-w-[1440px]',
  narrow: 'max-w-3xl',
} as const;

export function Container<T extends ElementType = 'div'>({
  as,
  children,
  width = 'shell',
  className,
  ...rest
}: ContainerProps<T>) {
  // Cast through any — `as` is polymorphic and TS can't narrow children.
  const Tag = (as ?? 'div') as React.ElementType<{ className?: string; children?: React.ReactNode }>;
  return (
    <Tag
      className={cn('mx-auto w-full px-5 sm:px-8 md:px-12 xl:px-16', widths[width], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
