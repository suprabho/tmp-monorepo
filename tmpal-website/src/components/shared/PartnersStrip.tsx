import Image from 'next/image';
import { Container } from './Container';
import { Marquee } from '../motion/Marquee';
import { partners } from '@/content/partners';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/theme';

export interface PartnerLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

interface PartnersStripProps {
  tone?: Tone;
  /** "Partners With" (v1 default) or "Trusted by teams from leading companies" (v2/v3). */
  caption?: string;
  /**
   * Optional raster logos. When provided, the strip renders these centered
   * horizontally beneath the caption (same visual height, desaturated
   * grey-ish tone) instead of the text-mark list. Used by V3.
   */
  logos?: PartnerLogo[];
  /**
   * Compact layout: 40px top/bottom padding and caption + logos rendered
   * on a single horizontal row (no margin under the caption). Used by V3
   * so the strip nestles directly under the hero image.
   */
  compact?: boolean;
  /** Extra classes for the outer <section> — useful for negative margins. */
  className?: string;
}

/**
 * Logo strip. Static row on desktop; marquee on mobile so all partners
 * remain visible without horizontal scroll. If `logos` is supplied, that
 * raster-logo layout replaces the text-mark row.
 */
export function PartnersStrip({
  tone = 'light',
  caption = 'Partners With',
  logos,
  compact = false,
  className,
}: PartnersStripProps) {
  const isDark = tone === 'dark';

  // Logo mode: caption + logos on a single horizontal row (compact) or
  // caption above logos (default).
  if (logos && logos.length > 0) {
    return (
      <section
        className={cn(
          compact ? 'py-10' : 'py-block-y',
          isDark ? 'bg-navy-700' : 'bg-white',
          className,
        )}
      >
        <Container>
          {compact ? (
            // Single-row layout: caption + logos on one line, centred, with
            // generous gaps so the strip still feels editorial despite being
            // shorter vertically.
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
              {caption ? (
                <p
                  className={cn(
                    'font-sans text-fluid-sm uppercase tracking-[0.18em]',
                    isDark ? 'text-slate-200/60' : 'text-navy-400',
                  )}
                >
                  {caption}
                </p>
              ) : null}
              {logos.map((l) => (
                <Image
                  key={l.name}
                  src={l.src}
                  alt={l.name}
                  width={l.width}
                  height={l.height}
                  className={cn(
                    'h-10 w-auto md:h-12 lg:h-14',
                    'opacity-60 grayscale transition-opacity hover:opacity-100',
                    isDark && 'invert',
                  )}
                />
              ))}
            </div>
          ) : (
            <>
              <p
                className={cn(
                  'mb-block-y text-center font-sans text-fluid-sm uppercase tracking-[0.18em]',
                  isDark ? 'text-slate-200/60' : 'text-navy-400',
                )}
              >
                {caption}
              </p>
              {/* Centered row, same explicit height per logo. */}
              <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 lg:gap-28">
                {logos.map((l) => (
                  <Image
                    key={l.name}
                    src={l.src}
                    alt={l.name}
                    width={l.width}
                    height={l.height}
                    className={cn(
                      'h-[62px] w-auto md:h-[83px] lg:h-[104px]',
                      'opacity-60 grayscale transition-opacity hover:opacity-100',
                      isDark && 'invert',
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    );
  }

  // Text-mark fallback (legacy / V2 default).
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
