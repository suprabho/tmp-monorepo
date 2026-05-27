import Image from 'next/image';
import { cn } from '@/lib/cn';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
  decorative?: boolean;
}

/**
 * Official TMPal wordmark. Renders the provided SVG asset under
 * `public/brand/` (logo-dark for light backgrounds, logo-white for dark).
 *
 *   `tone="dark"` (default) — for use over light backgrounds.
 *   `tone="light"` — for dark backgrounds (uses the white SVG variant).
 *
 * Pass `className` to override the default size (e.g. `h-10`).
 */
export function Logo({ tone = 'dark', className, decorative = false }: LogoProps) {
  const src = tone === 'light' ? '/brand/logo-white.svg' : '/brand/logo-dark.svg';
  const alt = decorative ? '' : 'TMPal — design and making, under one roof';

  return (
    <Image
      src={src}
      alt={alt}
      width={115}
      height={70}
      priority
      // Default size; callers can override via `className` (tailwind-merge keeps the last h-*).
      className={cn('h-8 w-auto md:h-9', className)}
      aria-hidden={decorative || undefined}
    />
  );
}
