import Link from 'next/link';
import type { Tone } from '@/lib/theme';
import { cn } from '@/lib/cn';

interface ContactCTAProps {
  tone?: Tone;
  label?: string;
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'px-4 py-2 text-fluid-sm',
  md: 'px-5 py-2.5 text-fluid-base',
  lg: 'px-7 py-3.5 text-fluid-lg',
} as const;

/**
 * Pill CTA. Default label "Contact Us"; v2 hero uses "Tell us what you're
 * building." Tone matches the surrounding palette.
 */
export function ContactCTA({
  tone = 'light',
  label = 'Contact Us',
  href = '#contact',
  className,
  size = 'md',
}: ContactCTAProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-sans font-medium tracking-tight transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-intextor focus-visible:ring-offset-2',
        sizes[size],
        tone === 'dark'
          ? 'bg-red-intextor text-white hover:bg-red-intextor/90 focus-visible:ring-offset-navy-700'
          : tone === 'editorial'
            ? 'bg-navy-500 text-white hover:bg-navy-700 focus-visible:ring-offset-editorial'
            : 'bg-red-intextor text-white hover:bg-red-intextor/90',
        className,
      )}
    >
      {label}
    </Link>
  );
}
