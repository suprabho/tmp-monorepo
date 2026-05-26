import { MotionSection } from '@/components/motion/MotionSection';
import { Container } from '@/components/shared/Container';

interface FeaturedProject {
  title: string;
  location: string;
  collaborator: string;
  family: string;
  year: number;
}

const featured: FeaturedProject[] = [
  {
    title: 'Vault House',
    location: 'Alibaug',
    collaborator: 'Studio Lotus',
    family: 'Facades',
    year: 2024,
  },
  {
    title: 'Bridge Tower',
    location: 'Mumbai',
    collaborator: 'Studio Mumbai',
    family: 'Facades',
    year: 2023,
  },
];

/**
 * V3's featured-work section. Sits BEFORE the editorial line-draw stack.
 *
 * Layout matches the Figma comp: kicker "SELECTED WORK", a serif lede
 * line, then two horizontally-laid project cards. Each card has a red
 * info block on one side and a wide image on the other.
 */
export function V3FeaturedProjects() {
  return (
    <MotionSection id="projects" className="bg-editorial pb-section-y pt-section-y text-navy-500">
      <Container>
        <div className="mb-block-y flex flex-col gap-4">
          <span className="font-sans text-fluid-sm font-medium uppercase tracking-[0.2em] text-red-intextor">
            Selected Work
          </span>
          <p className="max-w-3xl font-serif text-fluid-3xl leading-snug text-navy-500">
            Projects where <em className="italic">drawing</em> and{' '}
            <em className="italic">steel</em> met without compromise.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {featured.map((p) => (
            <article
              key={p.title}
              className="group relative grid overflow-hidden rounded-3xl bg-white grid-cols-[1.2fr_1fr]"
            >
              <div className="relative aspect-[5/6] w-full overflow-hidden bg-navy-100">
                <div className="absolute inset-0 grid place-items-center text-navy-400/40">
                  <span className="font-sans text-fluid-sm uppercase tracking-[0.2em]">
                    {p.title}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between bg-red-intextor p-5 text-white md:p-7">
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-fluid-xs font-medium uppercase tracking-[0.18em] text-white/80">
                    {p.family}
                  </span>
                  <h3 className="mt-2 font-serif text-fluid-2xl leading-tight">{p.title}</h3>
                  <p className="font-serif italic text-fluid-base text-white/90">
                    {p.location}, with {p.collaborator}
                  </p>
                </div>
                <div className="flex items-center justify-between text-fluid-sm">
                  <span className="text-white/70">{p.year}</span>
                  <span className="font-sans font-medium" aria-hidden>
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination dots / Prev-Next affordance matching the comp */}
        <div className="mt-8 flex items-center justify-end gap-6 text-fluid-sm text-navy-400">
          <button
            type="button"
            className="font-sans font-medium hover:text-red-intextor"
          >
            ← Prev
          </button>
          <button
            type="button"
            className="font-sans font-medium hover:text-red-intextor"
          >
            Next →
          </button>
        </div>
      </Container>
    </MotionSection>
  );
}
