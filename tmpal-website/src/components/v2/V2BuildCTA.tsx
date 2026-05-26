import { MotionSection } from '@/components/motion/MotionSection';
import { Container } from '@/components/shared/Container';
import { ContactCTA } from '@/components/shared/ContactCTA';
import { CONTACT_CTA, TAGLINE_LONG } from '@/content/copy';

export function V2BuildCTA() {
  return (
    <MotionSection id="contact" className="bg-navy-700 py-section-y text-white">
      <Container className="flex flex-col items-center gap-block-y text-center">
        <p className="max-w-3xl font-serif text-fluid-3xl leading-snug">{TAGLINE_LONG}</p>
        <div className="flex flex-col items-center gap-4">
          <p className="font-serif italic text-fluid-2xl">{CONTACT_CTA}</p>
          <p className="max-w-xl text-fluid-base text-slate-200/70">
            Send us drawings or a short brief. We respond within one working day.
          </p>
        </div>
        <ContactCTA tone="dark" label="Start a project" size="lg" />
      </Container>
    </MotionSection>
  );
}
