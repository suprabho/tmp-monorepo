import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { PartnersStrip } from '@/components/shared/PartnersStrip';
import { SystemFamilies } from '@/components/shared/SystemFamilies';
import { HowWeWork } from '@/components/shared/HowWeWork';
import { ProcuralBlock } from '@/components/shared/ProcuralBlock';
import { V3Hero } from '@/components/v3/V3Hero';
import { V3FeaturedProjects } from '@/components/v3/V3FeaturedProjects';
import { V3EditorialStack } from '@/components/v3/V3EditorialStack';

export const metadata = {
  title: 'V3 / Editorial',
};

export default function V3Page() {
  return (
    <>
      <Navigation tone="editorial" variant="rule-line" />
      <main id="main" className="bg-editorial">
        <V3Hero />
        <PartnersStrip tone="light" caption="Trusted by teams from leading companies" />
        <V3FeaturedProjects />
        <V3EditorialStack />
        <SystemFamilies
          tone="light"
          headline="Three system families. One factory."
          layout="stacked-editorial"
        />
        <HowWeWork tone="light" headline="Four stages, one team." kicker="Process" />
        <ProcuralBlock tone="light" emphasis="prominent" />
      </main>
      <Footer tone="light" />
    </>
  );
}
