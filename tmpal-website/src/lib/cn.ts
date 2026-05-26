import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * twMerge is configured with our custom fluid font-size scale so it knows
 * `text-fluid-display-lg` is a font-size (not a colour) and doesn't drop
 * it when merged alongside `text-navy-500`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-fluid-xs',
        'text-fluid-sm',
        'text-fluid-base',
        'text-fluid-lg',
        'text-fluid-xl',
        'text-fluid-2xl',
        'text-fluid-3xl',
        'text-fluid-display-sm',
        'text-fluid-display',
        'text-fluid-display-lg',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
