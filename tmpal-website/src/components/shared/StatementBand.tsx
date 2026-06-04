import { Container } from './Container';
import { MotionSection } from '../motion/MotionSection';

interface StatementBandProps {
  text?: string;
}

/**
 * Full-width statement band — a single large, centred italic-serif line on a
 * light grey field with generous vertical breathing room. No imagery, no CTA;
 * purely a typographic pause between sections.
 */
export function StatementBand({
  text = 'Everything happens at TMP. Design through finish, one facility.',
}: StatementBandProps) {
  return (
    <MotionSection className="bg-stone-50 py-32 text-navy-500 md:py-40">
      <Container>
        <p
          className="mx-auto max-w-4xl text-center font-serif italic leading-[1.2]"
          style={{ fontSize: 'clamp(30px, 3vw + 1rem, 52px)' }}
        >
          {text}
        </p>
      </Container>
    </MotionSection>
  );
}
