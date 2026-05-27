import { cn } from '@/lib/cn';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
  decorative?: boolean;
}

/**
 * TMPal wordmark — the canonical brand mark.
 *
 *   "TMP" in muted slate, then a red square containing a white plus
 *   in place of the "a", then a red "l".
 *
 * Rendered inline so it scales perfectly at any size via font-size on
 * the parent (`text-2xl`, `text-3xl`, etc).
 *
 *   `tone="dark"` (default) — over light backgrounds. TMP renders navy-300.
 *   `tone="light"` — over dark backgrounds. TMP renders slate-200.
 */
export function Logo({ tone = 'dark', className, decorative = false }: LogoProps) {
  const tmpColor = tone === 'light' ? 'text-slate-200' : 'text-navy-300';
  const ariaProps = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img' as const, 'aria-label': 'TMPal — design and making, under one roof' };

  return (
    <span
      {...ariaProps}
      className={cn('inline-flex items-end font-sans font-bold leading-none', className)}
    >
      <span className={cn('tracking-tight', tmpColor)}>TMP</span>
      <span
        aria-hidden
        className="relative inline-block aspect-square bg-red-intextor"
        style={{ height: '0.82em', marginLeft: '0.04em' }}
      >
        {/* White plus inside the red square — the brand motif. */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          style={{ padding: '14%' }}
          aria-hidden
        >
          <path
            d="M 32 0 L 68 0 L 68 24 Q 68 32 76 32 L 100 32 L 100 68 L 76 68 Q 68 68 68 76 L 68 100 L 32 100 L 32 76 Q 32 68 24 68 L 0 68 L 0 32 L 24 32 Q 32 32 32 24 Z"
            fill="#FFFFFF"
          />
        </svg>
      </span>
      <span className="text-red-intextor" style={{ marginLeft: '0.02em' }}>
        l
      </span>
    </span>
  );
}
