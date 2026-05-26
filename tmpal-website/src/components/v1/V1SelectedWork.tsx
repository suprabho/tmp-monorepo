import { MotionSection } from '@/components/motion/MotionSection';
import { Container } from '@/components/shared/Container';
import { projects } from '@/content/projects';

/**
 * V1's Selected Work. Editorial side-by-side layout: a wide image card
 * on the left and a prominent red "info" card on the right with the
 * project meta. Matches the Figma comp.
 */
export function V1SelectedWork() {
  const featured = projects[0];
  return (
    <MotionSection id="projects" className="bg-white py-section-y">
      <Container>
        <div className="mb-block-y flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <span className="font-sans text-fluid-sm font-medium uppercase tracking-[0.18em] text-red-intextor">
              Selected Work
            </span>
            <h2 className="max-w-2xl font-serif text-fluid-3xl text-navy-500">
              Built where drawing met <em className="italic">steel.</em>
            </h2>
          </div>
          <a
            href="#explore"
            className="font-sans text-fluid-sm font-medium uppercase tracking-[0.18em] text-navy-400 hover:text-red-intextor"
          >
            Explore All →
          </a>
        </div>

        <article className="grid gap-4 md:grid-cols-[1.4fr_1fr] md:gap-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-navy-100 md:aspect-[5/4]">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-100 via-slate-200 to-navy-300/40" />
            <div className="absolute inset-0 grid place-items-center text-navy-400/40">
              <span className="font-sans text-fluid-sm uppercase tracking-[0.25em]">
                {featured.title}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-3xl bg-red-intextor p-7 text-white md:p-10">
            <div>
              <span className="font-sans text-fluid-xs font-medium uppercase tracking-[0.18em] text-white/80">
                {featured.family.replace('-', ' ')}
              </span>
              <h3 className="mt-3 font-serif text-fluid-3xl leading-tight">{featured.title}</h3>
              <p className="mt-2 font-serif italic text-fluid-lg text-white/90">
                {featured.location}
                {featured.collaborator && `, with ${featured.collaborator}`}
              </p>
            </div>
            <div className="mt-10 flex items-center justify-between font-sans text-fluid-sm">
              <span className="text-white/70">{featured.year}</span>
              <span className="font-medium" aria-hidden>
                →
              </span>
            </div>
          </div>
        </article>
      </Container>
    </MotionSection>
  );
}
