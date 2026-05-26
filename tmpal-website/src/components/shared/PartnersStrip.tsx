import { Container } from './Container';
import { Marquee } from '../motion/Marquee';
import { partners } from '@/content/partners';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/theme';

interface PartnersStripProps {
  tone?: Tone;
  /** "Partners With" (v1 default) or "Trusted by teams from leading companies" (v2/v3). */
  caption?: string;
}

/**
 * Logo strip. Static row on desktop; marquee on mobile so all partners
 * remain visible without horizontal scroll.
 */
export function PartnersStrip({ tone = 'light', caption = 'Partners With' }: PartnersStripProps) {
  const isDark = tone === 'dark';
  const items = partners.map((p) => (
    <span
      key={p.name}
      className={cn(
        'font-sans text-fluid-base font-medium uppercase tracking-wider',
        isDark ? 'text-slate-200/80' : 'text-navy-400',
      )}
    >
      {p.mark}
    </span>
  ));

  return (
    <section className={cn('py-block-y', isDark ? 'bg-navy-700' : 'bg-white')}>
      <Container>
        <p
          className={cn(
            'mb-block-y text-center font-sans text-fluid-sm uppercase tracking-[0.18em]',
            isDark ? 'text-slate-200/60' : 'text-navy-400',
          )}
        >
          {caption}
        </p>

        {/* Desktop: static row */}
        <div className="hidden items-center justify-between gap-8 md:flex">{items}</div>

        {/* Mobile: marquee */}
        <div className="md:hidden">
          <Marquee items={items} speed={32} />
        </div>
      </Container>
    </section>
  );
}
