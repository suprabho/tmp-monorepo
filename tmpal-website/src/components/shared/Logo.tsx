import Image from 'next/image';
import { cn } from '@/lib/cn';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
  decorative?: boolean;
}

/**
 * TMPal + TMP co-branded lockup.
 *
 *   Position 1: `/brand/wordmark-tmpal.png` — the TMPal subsidiary wordmark.
 *   Position 2: `/brand/logo-{dark,white}.svg` — the TMP parent-company logo.
 *
 *   `tone="dark"` (default) — for use over light backgrounds.
 *   `tone="light"` — for dark backgrounds (uses the white SVG variant of TMP).
 *
 * The PNG only ships in one tone; it reads on both light and dark surfaces.
 */
export function Logo({ tone = 'dark', className, decorative = false }: LogoProps) {
  const parentSrc = tone === 'light' ? '/brand/logo-white.svg' : '/brand/logo-dark.svg';
  const ariaProps = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img' as const, 'aria-label': 'TMPal — a subsidiary of TMP' };

  return (
    <span {...ariaProps} className={cn('inline-flex items-center gap-3 md:gap-4', className)}>
      <Image
        src="/brand/wordmark-tmpal.png"
        alt=""
        width={520}
        height={170}
        priority
        className="h-7 w-auto md:h-8"
      />
      <span
        aria-hidden
        className="h-5 w-px self-center bg-current opacity-30 md:h-6"
      />
      <Image
        src={parentSrc}
        alt=""
        width={115}
        height={70}
        priority
        className="h-8 w-auto md:h-9"
      />
    </span>
  );
}
