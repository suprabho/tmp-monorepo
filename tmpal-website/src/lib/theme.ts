/**
 * Variant → tone mapping. Each route sets its `tone` and shared components
 * branch on it. Concrete colour classes stay inside the components.
 */

export type Variant = 'v1' | 'v2' | 'v3';
export type Tone = 'light' | 'dark' | 'editorial';

export interface VariantTheme {
  tone: Tone;
  /** Page surface */
  bg: string;
  /** Default text colour */
  text: string;
  /** Nav style at the top of the page */
  heroNavStyle: 'solid-light' | 'transparent-dark' | 'rule-line';
  /** Headline phrase used on the picker card */
  headline: string;
  /** Short descriptor used in the picker chip */
  descriptor: string;
}

export const themeByVariant: Record<Variant, VariantTheme> = {
  v1: {
    tone: 'light',
    bg: 'bg-white',
    text: 'text-navy-500',
    heroNavStyle: 'solid-light',
    headline: 'Where design meets making.',
    descriptor: 'V1 / Light',
  },
  v2: {
    tone: 'dark',
    bg: 'bg-navy-700',
    text: 'text-slate-200',
    heroNavStyle: 'transparent-dark',
    headline: 'Where design meets making.',
    descriptor: 'V2 / Dark · Product-led',
  },
  v3: {
    tone: 'editorial',
    bg: 'bg-editorial',
    text: 'text-navy-500',
    heroNavStyle: 'rule-line',
    headline: 'Where design meets making.',
    descriptor: 'V3 / Editorial',
  },
};
