import { Navigation } from '@/components/shared/Navigation';
import { V3Footer } from '@/components/v3/V3Footer';
import { PartnersStrip, type PartnerLogo } from '@/components/shared/PartnersStrip';
import { SystemFamilies } from '@/components/shared/SystemFamilies';
import { ProcessCards } from '@/components/shared/ProcessCards';
import { ProcuralBlock } from '@/components/shared/ProcuralBlock';
import { StatementBand } from '@/components/shared/StatementBand';
import { V3Hero } from '@/components/v3/V3Hero';
import { V3FeaturedProjects } from '@/components/v3/V3FeaturedProjects';
import { V3BrandStory } from '@/components/v3/V3BrandStory';

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
        {/* Compact partners row. On desktop it tucks gently into the white
            space at the bottom-left of the hero (the building occupies the
            right ~58%); on mobile it simply follows the stacked hero in
            normal flow so it never rides up over the image band. */}
        <PartnersStrip
          tone="light"
          caption="Trusted by teams from leading companies"
          logos={v3Logos}
          compact
          className="relative z-10 md:-mt-[140px] lg:-mt-[180px]"
        />
        <V3FeaturedProjects />
        <V3BrandStory />
        <SystemFamilies
          tone="light"
          headline="Three system families. One factory."
          layout="stacked-editorial"
        />
        <ProcessCards headline="Four stages, one team." kicker="Process" />
        <ProcuralBlock tone="light" emphasis="prominent" />
        <StatementBand />
      </main>
      <V3Footer />
    </>
  );
}
