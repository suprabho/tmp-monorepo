import { CanonicalHeader } from '@/components/canonical/CanonicalHeader';
import { CanonicalHero } from '@/components/canonical/CanonicalHero';
import { CanonicalPartners } from '@/components/canonical/CanonicalPartners';
import { CanonicalFeatureBand } from '@/components/canonical/CanonicalFeatureBand';
import { CanonicalSystems } from '@/components/canonical/CanonicalSystems';
import { CanonicalSelectedWork } from '@/components/canonical/CanonicalSelectedWork';
import { CanonicalProcess } from '@/components/canonical/CanonicalProcess';
import { CanonicalPartnership } from '@/components/canonical/CanonicalPartnership';
import { CanonicalContact } from '@/components/canonical/CanonicalContact';
import { CanonicalFooter } from '@/components/canonical/CanonicalFooter';

export const metadata = {
  title: 'Canonical landing',
};

export default function CanonicalLandingPage() {
  return (
    <>
      <CanonicalHeader />
      <main id="main">
        <section id="home">
          <CanonicalHero />
        </section>
        <CanonicalPartners />
        <CanonicalFeatureBand
          tone="dark"
          quote={<>More than a symbol — a structural form.</>}
          image="/projects/intersection-mark.png"
        />
        <CanonicalSystems />
        <CanonicalFeatureBand
          tone="light"
          quote="Inspired by engineered intersections."
          image="/projects/x-mark.png"
          imageOnRight
        />
        <CanonicalSelectedWork />
        <CanonicalProcess />
        <CanonicalFeatureBand
          tone="red"
          quote={
            <>
              Everything happens at TMP.
              <br />
              Design through finish, one facility.
            </>
          }
          image="/projects/intersection-mark.png"
          imageOnRight
        />
        <CanonicalPartnership />
        <CanonicalContact />
      </main>
      <CanonicalFooter />
    </>
  );
}
