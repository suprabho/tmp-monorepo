import { cn } from '@/lib/cn';

interface PatternBackdropProps {
  className?: string;
  opacity?: number;
  stroke?: string;
}

/**
 * Tiled 1-px outline intersection-mark — the "drawing board" backdrop.
 * Rendered as a single SVG with a <pattern> fill so it remains a flat
 * vector background regardless of section size.
 */
export function PatternBackdrop({
  className,
  opacity = 0.35,
  stroke = '#8E9AAC',
}: PatternBackdropProps) {
  return (
    <svg
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      style={{ opacity }}
    >
      <defs>
        <symbol id="ix-bg" viewBox="0 0 60 60">
          <path
            d="M 35.5 0 L 35.5 24 L 60 24 L 60 36 L 55.6 37.4 C 44.6 40 36.8 49.6 36.2 60 L 24.7 60 L 24.7 35.5 L 0 35.5 L 0 23.7 L 5.2 22.3 C 16.1 19.7 23.9 10.1 24.5 0 L 35.5 0 Z"
            fill="none"
            stroke={stroke}
            strokeWidth="1"
          />
        </symbol>
        <pattern id="ix-pattern" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
          <use href="#ix-bg" x="10" y="10" width="70" height="70" />
        </pattern>
      </defs>
      <rect width="1200" height="600" fill="url(#ix-pattern)" />
    </svg>
  );
}
