import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { MotionSection } from '../motion/MotionSection';
import { families } from '@/content/families';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/theme';

interface SystemFamiliesProps {
  tone?: Tone;
  headline?: string;
  /** v2 uses a tighter grid; v3 stacks editorial-style. */
  layout?: 'grid' | 'stacked-editorial';
}

export function SystemFamilies({
  tone = 'light',
  headline = 'System Families',
  layout = 'grid',
}: SystemFamiliesProps) {
  return (
    <MotionSection
      id="services"
      className={cn(
        'py-section-y',
        tone === 'dark' ? 'bg-navy-700 text-slate-200' : 'bg-white text-navy-500',
      )}
    >
      <Container>
        <SectionHeader
          kicker="What we make"
          title={
            headline === 'System Families' ? (
              headline
            ) : (
              <>
                Three system <em className="not-italic font-serif italic">families.</em>
                <br />
                One factory.
              </>
            )
          }
        />
        <div
          className={cn(
            'grid gap-6',
            layout === 'grid' ? 'md:grid-cols-3' : 'md:grid-cols-3 md:gap-10',
          )}
        >
          {families.map((f, i) => (
            <article
              key={f.slug}
              className={cn(
                'group flex flex-col overflow-hidden rounded-2xl',
                tone === 'dark' ? 'bg-navy-500/30' : 'bg-navy-50',
              )}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-100">
                {/* Architectural-tone gradient backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy-100 via-navy-50 to-navy-300/40" />
                {/* Geometric ornament — subtle Islamic-tile-style pattern, only on facades+fenestration to feel intentional */}
                {i < 2 ? <GeometricOrnament className="absolute inset-0 text-navy-300/35" /> : null}
                <div className="absolute inset-0 grid place-items-center text-navy-400/40">
                  <span className="font-sans text-fluid-sm uppercase tracking-widest">
                    {f.title}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-6">
                <h3 className="font-serif text-fluid-2xl">{f.title}</h3>
                <p className="text-fluid-base opacity-80">{f.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

/**
 * A simple geometric pattern reminiscent of Islamic tilework — the same
 * vocabulary used in the v2 Families bridge transition. Rendered as a
 * tiled SVG so it stays crisp at any size.
 */
function GeometricOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern id="geo-tile" patternUnits="userSpaceOnUse" width="60" height="60">
          {/* Eight-pointed star centered in tile */}
          <g transform="translate(30 30)" stroke="currentColor" fill="none" strokeWidth="1">
            <path d="M-18 0 L0 -18 L18 0 L0 18 Z" />
            <path d="M-18 0 L0 -18 L18 0 L0 18 Z" transform="rotate(45)" />
            <circle r="4" />
          </g>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#geo-tile)" />
    </svg>
  );
}
