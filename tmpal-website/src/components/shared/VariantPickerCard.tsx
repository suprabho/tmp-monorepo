'use client';
import Link from 'next/link';
import { m } from 'framer-motion';
import { cn } from '@/lib/cn';
import { PlusMark } from './PlusMark';
import type { Variant, VariantTheme } from '@/lib/theme';
import { themeByVariant } from '@/lib/theme';

interface VariantPickerCardProps {
  variant: Variant;
  /** Optional summary one-liner shown beneath the headline. */
  summary?: string;
}

const cardPalette: Record<Variant, { bg: string; text: string; mark: string }> = {
  v1: { bg: 'bg-white', text: 'text-navy-500', mark: 'text-red-intextor' },
  v2: { bg: 'bg-navy-700', text: 'text-slate-200', mark: 'text-red-intextor' },
  v3: { bg: 'bg-editorial', text: 'text-navy-500', mark: 'text-red-intextor' },
};

const summaryByVariant: Record<Variant, string> = {
  v1: 'Light first. Two fragments slide together and rotate through three colored slabs.',
  v2: 'Dark and product-led. The cross deconstructs from a whole, reassembles, and folds behind the family work.',
  v3: 'Editorial. The mark is drawn line by line, completes, fills red, and materialises as 3D aluminium.',
};

/**
 * Card used on the picker page (`/`). Each one is a portal into a variant.
 * Hover lifts and rotates the brand mark slightly so the cards feel alive.
 */
export function VariantPickerCard({
  variant,
  summary = summaryByVariant[variant],
}: VariantPickerCardProps) {
  const theme: VariantTheme = themeByVariant[variant];
  const palette = cardPalette[variant];
  return (
    <Link
      href={`/${variant}`}
      className={cn(
        'group relative flex flex-col gap-8 overflow-hidden rounded-3xl p-8 md:p-10',
        'transition-transform duration-500 hover:-translate-y-1',
        palette.bg,
        palette.text,
      )}
      aria-label={`Open ${theme.descriptor}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-sans text-fluid-xs font-medium uppercase tracking-[0.18em] opacity-70">
          {theme.descriptor}
        </span>
        <span className="font-sans text-fluid-xs opacity-50">Open →</span>
      </div>

      <div className="relative h-32 md:h-44">
        <m.div
          className="absolute inset-0 grid place-items-center"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 45, scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <PlusMark className={cn('h-full w-auto', palette.mark)} />
        </m.div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-fluid-2xl leading-tight">
          {theme.headline.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="italic">{theme.headline.split(' ').slice(-1)}</span>
        </h2>
        <p className="text-fluid-sm leading-relaxed opacity-80">{summary}</p>
      </div>
    </Link>
  );
}
