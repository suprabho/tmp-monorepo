import Image from 'next/image';
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

/**
 * Line-icon per v3 card, ordered to match `families` (facades, fenestration,
 * custom metal). Intrinsic w/h drive each icon's aspect ratio so the CSS mask
 * scales without distortion. Spaces in the filenames are %20-encoded for url().
 */
const editorialIcons = [
  // Facade icon is the widest/shortest, so to be as large as possible while
  // staying fully on-card it goes full-bleed (w-full, no side padding) — the
  // max non-clipping size for a wide-aspect mark.
  { src: '/projects/facade%20icon.svg', w: 520, h: 297, widthClass: 'w-full', padClass: 'px-0' },
  { src: '/projects/window%20icon.svg', w: 283, h: 299, widthClass: 'w-[80%]', padClass: 'px-6' },
  { src: '/projects/custom%20icon.svg', w: 370, h: 274, widthClass: 'w-[96%]', padClass: 'px-6' },
];

export function SystemFamilies({
  tone = 'light',
  headline = 'System Families',
  layout = 'grid',
}: SystemFamiliesProps) {
  const editorial = layout === 'stacked-editorial';
  const titleNode =
    headline === 'System Families' ? (
      headline
    ) : (
      <>
        Three system <em className="font-serif italic text-red-intextor">families.</em>
        <br />
        One factory.
      </>
    );

  return (
    <MotionSection
      id="services"
      className={cn(
        'pt-section-y pb-10',
        editorial && 'md:pb-24',
        tone === 'dark' ? 'bg-navy-700 text-slate-200' : 'bg-white text-navy-500',
      )}
    >
      <Container>
        <SectionHeader
          kicker={editorial ? 'What we make' : undefined}
          align={editorial ? 'center' : 'start'}
          title={titleNode}
        />

        {editorial ? (
          // v3 — three dark-navy cards with integrated architectural line-work
          // and the copy seated bottom-left. One rounded outer top corner on
          // the first and third card frames the trio.
          <div className="grid gap-6 md:grid-cols-3">
            {families.map((f, i) => {
              const icon = editorialIcons[i];
              return (
              <article
                key={f.slug}
                className={cn(
                  'group relative flex min-h-[460px] flex-col overflow-hidden bg-navy-500 text-slate-200 md:min-h-[560px]',
                  i === 0 && 'rounded-tl-[74px]',
                  i === families.length - 1 && 'rounded-tr-[74px]',
                )}
              >
                {/* Illustration area — large line-icon centred on plain
                    navy, painted in the existing blue-grey stroke via a CSS
                    mask so the single colour holds regardless of the icon's
                    own fills. Sized to fill ~80% of the area. */}
                <div
                  className={cn(
                    'relative flex flex-1 items-center justify-center pb-2 pt-8',
                    icon?.padClass ?? 'px-6',
                  )}
                >
                  {icon ? (
                    <span
                      aria-hidden
                      className={cn(
                        'block bg-slate-250 transition-transform duration-500 ease-out group-hover:scale-110',
                        icon.widthClass,
                      )}
                      style={{
                        aspectRatio: `${icon.w} / ${icon.h}`,
                        WebkitMaskImage: `url('${icon.src}')`,
                        maskImage: `url('${icon.src}')`,
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                      }}
                    />
                  ) : null}
                </div>

                {/* Title + description — bottom-left, 28–32px padding. */}
                <div className="relative flex flex-col gap-3 p-7 md:p-8">
                  <h3 className="font-serif text-fluid-2xl text-white">{f.title}</h3>
                  <p className="max-w-[34ch] text-fluid-base text-slate-200/80">
                    {f.description}
                  </p>
                </div>

                {/* Red full-width bottom line — scales in from the left on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[5px] origin-left scale-x-0 bg-red-intextor transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </article>
              );
            })}
          </div>
        ) : (
          // v1 / v2 — original photo-led grid.
          <div className={cn('grid gap-6', layout === 'grid' && 'md:grid-cols-3')}>
            {families.map((f) => (
              <article
                key={f.slug}
                className={cn(
                  'group relative flex flex-col overflow-hidden border border-navy-100',
                  tone === 'dark' ? 'bg-navy-500/30' : 'bg-white',
                )}
              >
                {/* Photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-500 bg-[url('/projects/tessellation.svg')] bg-[length:200px] bg-repeat">
                  {/* TMP stroke-icon overlay — fades in on hover, centred. */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                  >
                    <Image
                      src="/brand/tmp-stroke-icon.svg"
                      alt=""
                      width={490}
                      height={488}
                      className="w-[55%] max-w-[280px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
                    />
                  </div>
                </div>

                {/* Title + description */}
                <div className="flex flex-col gap-3 p-6">
                  <h3 className="font-serif text-fluid-2xl">{f.title}</h3>
                  <p className="text-fluid-base opacity-80">{f.description}</p>
                </div>

                {/* Red full-width bottom line — scales in from the left on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[5px] origin-left scale-x-0 bg-red-intextor transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </article>
            ))}
          </div>
        )}
      </Container>
    </MotionSection>
  );
}
