'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

interface RedAccentLineProps {
  /** Which edge of the parent section the line anchors to. Default `right`. */
  side?: 'left' | 'right';
  /** Extra utilities on the outer positioning wrapper — e.g. `top-1/3`,
   *  `top-[60%]`, or vertical offset overrides. */
  className?: string;
}

/**
 * Vertical red architectural accent that "draws in" from the top as the
 * section scrolls into view. Position absolutely inside a relative
 * parent; defaults to flush against the right edge, vertically centred.
 *
 *   color  : #FE1116
 *   width  : 12 px (Tailwind `w-3`)
 *   height : 144 px (Tailwind `h-36`)
 *   motion : scaleY 0 → 1, origin-top, 1.0 s, cubic-bezier(.22, 1, .36, 1)
 *
 * The line is positioned absolutely inside its section, so it scrolls
 * naturally with the section rather than being pinned to the viewport.
 * Animation fires once per session via framer-motion's whileInView.
 * Under prefers-reduced-motion, the line paints statically at full
 * height.
 */
export function RedAccentLine({ side = 'right', className }: RedAccentLineProps) {
  const reduced = useReducedMotionSafe();
  const sideCls = side === 'left' ? 'left-0' : 'right-0';

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute top-1/2 z-10 h-36 w-3 -translate-y-1/2',
        sideCls,
        className,
      )}
    >
      {reduced ? (
        <span className="block h-full w-full bg-red-intextor" />
      ) : (
        <motion.span
          className="block h-full w-full origin-top bg-red-intextor"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </div>
  );
}
