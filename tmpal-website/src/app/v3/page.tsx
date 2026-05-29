import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { PartnersStrip, type PartnerLogo } from '@/components/shared/PartnersStrip';
import { SystemFamilies } from '@/components/shared/SystemFamilies';
import { HowWeWork } from '@/components/shared/HowWeWork';
import { ProcuralBlock } from '@/components/shared/ProcuralBlock';
import { V3Hero } from '@/components/v3/V3Hero';
import { V3FeaturedProjects } from '@/components/v3/V3FeaturedProjects';
import { V3EditorialStack } from '@/components/v3/V3EditorialStack';

export const metadata = {
  title: 'V3 / Editorial',
};

// Logos that sit directly under the "Trusted by…" heading on V3.
// Same source files V1 uses, rendered desaturated by PartnersStrip.
const v3Logos: PartnerLogo[] = [
  {
    name: 'Procural · Aluminium Systems',
    src: '/projects/partner-procural.png',
    width: 1410,
    height: 580,
  },
  {
    name: 'First KMC · Interior Hardware',
    src: '/projects/partner-firstkmc.png',
    width: 645,
    height: 630,
  },
];

export default function V3Page() {
  return (
    <>
      <Navigation tone="editorial" variant="rule-line" />
      <main id="main" className="bg-editorial">
        <V3Hero />
        {/* Compact partners row, lifted up into the white/fade area at the
            bottom of the hero so the caption + logos sit immediately under
            the building image instead of a section-y gap below it. */}
        <PartnersStrip
          tone="light"
          caption="Trusted by teams from leading companies"
          logos={v3Logos}
          compact
          className="relative z-10 -mt-[240px] md:-mt-[300px] lg:-mt-[340px]"
        />
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
