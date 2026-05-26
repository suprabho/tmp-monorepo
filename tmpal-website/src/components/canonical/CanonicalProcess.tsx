import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';
import { SectionHeader } from './SectionHeader';

interface Step {
  step: string;
  icon: IconName;
  body: string;
}

const steps: Step[] = [
  {
    step: 'Drawing board',
    icon: 'drawing',
    body: 'We engage at concept. Reviewing intent before committing to system selection.',
  },
  {
    step: 'Engineering review',
    icon: 'gears',
    body: 'Performance, code, buildability. We resolve tolerance and connection logic.',
  },
  {
    step: 'Prototype',
    icon: 'cube',
    body: 'Full-scale mock-ups. Tested in the same facility that will produce at scale.',
  },
  {
    step: 'Production',
    icon: 'truck',
    body: 'CNC-led manufacture, consistent across run. Coordinated delivery to site.',
  },
];

export function CanonicalProcess() {
  return (
    <section className="bg-stone-50">
      <div className="mx-auto w-full max-w-shell px-5 py-section-y sm:px-8 md:px-20">
        <SectionHeader eyebrow="Process" title="Four stages, one team." />

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => {
            const isFirst = i === 0;
            const isLast = i === steps.length - 1;
            return (
              <article
                key={s.step}
                className={cn(
                  'flex min-h-[234px] flex-col gap-4 p-8 text-white',
                  isLast ? 'bg-red-intextor' : 'bg-slate-350/30',
                )}
                style={{
                  borderRadius: isFirst
                    ? '0 0 0 80px'
                    : isLast
                      ? '0 0 80px 0'
                      : '0',
                }}
              >
                <div className="flex items-center gap-4">
                  <Icon name={s.icon} size={28} strokeWidth={1.6} />
                  <div className="font-sans text-fluid-base font-bold leading-none">{s.step}</div>
                </div>
                <p className="font-sans text-fluid-base leading-[1.55] text-stone-100">{s.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
