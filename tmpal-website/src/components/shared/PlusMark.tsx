import { CROSS_VIEWBOX, crossPath } from '@/lib/crossGeometry';
import { cn } from '@/lib/cn';

interface PlusMarkProps {
  className?: string;
  fill?: string;
  /** Render style: solid fill, metallic gradient (v2), or outline only (v3 draw step). */
  variant?: 'solid' | 'metallic' | 'outline';
  /** Inline style override for stroke/path metrics (used by v3). */
  style?: React.CSSProperties;
  /** Used by v3 line-draw — caller controls `strokeDasharray` / `strokeDashoffset`. */
  strokeWidth?: number;
  ariaLabel?: string;
}

/**
 * The TMP plus/cross mark — a + with concave inner corners.
 *
 *   - `solid` (default) paints with `fill`
 *   - `metallic` paints with a brushed-aluminium SVG linearGradient
 *   - `outline` renders as a stroked path with no fill (for v3 line draw)
 *
 * The path itself lives in `crossGeometry.ts`.
 */
export function PlusMark({
  className,
  fill = 'currentColor',
  variant = 'solid',
  style,
  strokeWidth = 2,
  ariaLabel,
}: PlusMarkProps) {
  const aria = ariaLabel
    ? { 'aria-label': ariaLabel, role: 'img' as const }
    : { 'aria-hidden': true };

  return (
    <svg
      viewBox={CROSS_VIEWBOX}
      className={cn('block', className)}
      style={style}
      {...aria}
    >
      {variant === 'metallic' && (
        <defs>
          <linearGradient id="plus-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b9bcc4" />
            <stop offset="40%" stopColor="#f5f6f8" />
            <stop offset="70%" stopColor="#8a8e96" />
            <stop offset="100%" stopColor="#d8dadf" />
          </linearGradient>
          <radialGradient id="plus-highlight" cx="30%" cy="25%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
      )}

      {variant === 'outline' ? (
        <path
          d={crossPath}
          fill="none"
          stroke={fill}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ) : variant === 'metallic' ? (
        <>
          <path d={crossPath} fill="url(#plus-metallic)" />
          <path d={crossPath} fill="url(#plus-highlight)" />
        </>
      ) : (
        <path d={crossPath} fill={fill} />
      )}
    </svg>
  );
}
