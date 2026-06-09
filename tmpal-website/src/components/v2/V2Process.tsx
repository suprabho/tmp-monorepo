import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';

/**
 * V2 Process — five stacked horizontal cards. Each card: a red numbered step
 * box (white text) on the left, the step title in the centre, and the
 * description on the right. Clean, minimal card chrome with a subtle hover
 * lift + red border accent.
 */

interface Step {
  index: number;
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    index: 1,
    title: 'Drawing board',
    body: 'We engage at concept — reviewing intent before committing to system selection.',
  },
  {
    index: 2,
    title: 'Engineering review',
    body: 'Performance, code, buildability. We resolve tolerance and connection logic.',
  },
  {
    index: 3,
    title: 'Prototype',
    body: 'Full-scale mock-ups, tested in the same facility that will produce at scale.',
  },
  {
    index: 4,
    title: 'Production',
    body: 'CNC-led manufacture, consistent across the run, with coordinated delivery to site.',
  },
  {
    index: 5,
    title: 'Installation & handover',
    body: 'Site-coordinated install and handover, backed by the team that built it.',
  },
];

export function V2Process() {
  return (
    <section id="process" className="bg-white py-section-y text-navy-500">
      <Container>
        <SectionHeader kicker="Process" align="start" title="Five steps, one team." />

        <ol className="flex flex-col gap-4">
          {steps.map((s) => (
            <li
              key={s.index}
              className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 rounded-tl-[40px] rounded-br-[40px] border border-navy-100 bg-white p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-red-intextor/40 hover:shadow-[0_14px_36px_-18px_rgba(20,35,56,0.3)] md:grid-cols-[auto_minmax(200px,1fr)_2fr] md:gap-x-10 md:gap-y-0 md:p-6"
            >
              {/* Red numbered step box. */}
              <span
                aria-hidden
                className="row-span-2 inline-flex h-12 w-12 items-center justify-center bg-red-intextor font-sans text-fluid-base font-bold text-white transition-transform duration-300 ease-out group-hover:scale-105 md:row-span-1 md:h-16 md:w-16 md:text-fluid-xl"
              >
                {String(s.index).padStart(2, '0')}
              </span>

              {/* Step title — centred on desktop. */}
              <h3 className="font-serif text-fluid-2xl leading-tight text-navy-500 md:text-center">
                {s.title}
              </h3>

              {/* Description — on the right. */}
              <p className="col-start-2 font-sans text-fluid-base leading-relaxed text-navy-400/80 md:col-start-3 md:row-start-1">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
