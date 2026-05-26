import type { ElementType } from 'react';
import { cn } from '@/lib/cn';

export interface RevealWord {
  text: string;
  /** Italic serif + slight scale; slightly slower duration. */
  emphasis?: boolean;
  /** Extra Tailwind classes — e.g. accent colours. */
  className?: string;
}

interface RevealTextProps {
  words: RevealWord[];
  /** Semantic tag for the headline. Defaults to h1. */
  as?: ElementType;
  className?: string;
  /** v1 only — draw a red underline beneath the emphasised word after it lands. */
  emphasisUnderline?: boolean;
  /** Stagger between words, in seconds. */
  staggerStep?: number;
  /** Delay before the first word starts, in seconds. */
  startDelay?: number;
}

/**
 * Per-word headline reveal. Each word sits inside an `overflow:hidden`
 * span and rises from `y: 110%` via a CSS keyframe animation.
 *
 * We use CSS animations instead of Framer Motion for this primitive —
 * Framer's `whileInView` proved unreliable in our preview environment
 * (and SSR + JS-driven entry animations are flicker-prone anyway).
 * Reduced motion is honoured globally via a `@media` rule in globals.css.
 */
export function RevealText({
  words,
  as = 'h1',
  className,
  emphasisUnderline = false,
  staggerStep = 0.06,
  startDelay = 0.15,
}: RevealTextProps) {
  const Tag = as as React.ElementType<{ className?: string; children?: React.ReactNode }>;
  return (
    <Tag className={cn('relative', className)}>
      <span className="inline-block">
        {words.map((word, i) => {
          const delay = startDelay + i * staggerStep;
          return (
            <span
              key={`${word.text}-${i}`}
              className="relative mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0"
            >
              <span
                className={cn(
                  'inline-block',
                  word.emphasis ? 'reveal-word-emphasis italic font-serif' : 'reveal-word',
                  word.className,
                )}
                style={{ animationDelay: `${word.emphasis ? delay + 0.05 : delay}s` }}
              >
                {word.text}
              </span>
              {emphasisUnderline && word.emphasis ? (
                <span
                  aria-hidden
                  className="reveal-underline absolute bottom-[0.04em] left-0 right-[0.25em] block h-[2px] origin-left bg-red-intextor"
                  style={{ animationDelay: `${delay + 0.55}s` }}
                />
              ) : null}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
