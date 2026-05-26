import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface MarqueeProps {
  items: ReactNode[];
  /** Animation cycle duration in seconds. Default 28s. */
  speed?: number;
  /** Reverse direction. */
  reverse?: boolean;
  /** Pause when hovering the track. */
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * CSS-only logo strip. Items are duplicated inline so the `translateX(-50%)`
 * keyframe wraps seamlessly. `prefers-reduced-motion` halts via globals.css.
 */
export function Marquee({
  items,
  speed = 28,
  reverse = false,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn('group relative overflow-hidden', className)}
      role="region"
      aria-label="Partner logos"
    >
      <div
        className={cn(
          'animate-marquee flex w-max gap-12 will-change-transform',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i >= items.length}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
