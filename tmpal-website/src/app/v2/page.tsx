import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { PartnersStrip } from '@/components/shared/PartnersStrip';
import { SystemFamilies } from '@/components/shared/SystemFamilies';
import { ProcuralBlock } from '@/components/shared/ProcuralBlock';
import { V2Hero } from '@/components/v2/V2Hero';
import { V2Manifesto } from '@/components/v2/V2Manifesto';
import { V2RecentWork } from '@/components/v2/V2RecentWork';
import { V2Process } from '@/components/v2/V2Process';
import { V2BuildCTA } from '@/components/v2/V2BuildCTA';

export const metadata = {
  title: 'V2 / Dark',
};

export default function V2Page() {
  return (
    <div className="bg-navy-700">
      <Navigation tone="dark" variant="transparent-dark" />
      <main id="main" className="bg-navy-700">
        <V2Hero />
        <PartnersStrip
          tone="dark"
          caption="Trusted by teams from leading companies"
          logos={[
            { name: 'First KMC', src: '/projects/partner-firstkmc.png', width: 645, height: 630 },
            { name: 'Procural', src: '/projects/partner-procural.png', width: 1408, height: 615 },
          ]}
        />
        <V2Manifesto />
        <SystemFamilies
          tone="light"
          headline="Three system families. One factory."
          layout="grid"
        />
        <V2RecentWork />
        <V2Process />
        <ProcuralBlock tone="light" emphasis="prominent" />
        <V2BuildCTA />
      </main>
      <Footer tone="dark" />
    </div>
  );
}
