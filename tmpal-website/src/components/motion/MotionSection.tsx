'use client';
import { m } from 'framer-motion';
import type { ReactNode, HTMLAttributes } from 'react';
import { sectionVariants } from '@/lib/motion';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

// Strip native drag/animation event handlers that conflict with Framer Motion's.
type CleanSectionAttrs = Omit<
  HTMLAttributes<HTMLElement>,
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragExit'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDrop'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
>;

type MotionSectionProps = {
  children: ReactNode;
  /** Render-as is fixed to <section> for semantics. */
  amount?: number;
  once?: boolean;
} & CleanSectionAttrs;

/**
 * Drop-in scroll-reveal wrapper. Children appear with the shared section
 * variants the first time they cross `amount` into the viewport (default
 * 20%). Under reduced motion the variants collapse to identity.
 */
export function MotionSection({
  children,
  amount = 0.2,
  once = true,
  className,
  ...rest
}: MotionSectionProps) {
  const reduced = useReducedMotionSafe();

  if (reduced) {
    return (
      <section className={className} {...rest}>
        {children}
      </section>
    );
  }

  return (
    <m.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={sectionVariants}
      {...rest}
    >
      {children}
    </m.section>
  );
}
