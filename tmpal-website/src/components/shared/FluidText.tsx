import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const scaleMap = {
  xs: 'text-fluid-xs',
  sm: 'text-fluid-sm',
  base: 'text-fluid-base',
  lg: 'text-fluid-lg',
  xl: 'text-fluid-xl',
  '2xl': 'text-fluid-2xl',
  '3xl': 'text-fluid-3xl',
  'display-sm': 'text-fluid-display-sm',
  display: 'text-fluid-display',
  'display-lg': 'text-fluid-display-lg',
} as const;

type FluidScale = keyof typeof scaleMap;

type FluidTextProps<T extends ElementType> = {
  as?: T;
  scale?: FluidScale;
  serif?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>;

/**
 * Typography wrapper around the fluid-* Tailwind tokens. Keeps the call
 * sites declarative (`<FluidText scale="display-lg" serif as="h1">`)
 * instead of repeating `text-fluid-display-lg font-serif …` everywhere.
 */
export function FluidText<T extends ElementType = 'p'>({
  as,
  scale = 'base',
  serif = false,
  children,
  className,
  ...rest
}: FluidTextProps<T>) {
  const Tag = (as ?? 'p') as React.ElementType<{ className?: string; children?: React.ReactNode }>;
  return (
    <Tag className={cn(scaleMap[scale], serif && 'font-serif', className)} {...rest}>
      {children}
    </Tag>
  );
}
