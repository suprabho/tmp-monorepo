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

export function SystemFamilies({
  tone = 'light',
  headline = 'System Families',
  layout = 'grid',
}: SystemFamiliesProps) {
  return (
    <MotionSection
      id="services"
      className={cn(
        'pt-section-y pb-10',
        tone === 'dark' ? 'bg-navy-700 text-slate-200' : 'bg-white text-navy-500',
      )}
    >
      <Container>
        <SectionHeader
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
      </Container>
    </MotionSection>
  );
}
