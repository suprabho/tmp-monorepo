import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { PartnersStrip } from '@/components/shared/PartnersStrip';
import { SystemFamilies } from '@/components/shared/SystemFamilies';
import { HowWeWork } from '@/components/shared/HowWeWork';
import { ProcuralBlock } from '@/components/shared/ProcuralBlock';
import { V1Hero } from '@/components/v1/V1Hero';
import { V1HeroFeatures } from '@/components/v1/V1HeroFeatures';
import { V1Manifesto } from '@/components/v1/V1Manifesto';
import { V1SelectedWork } from '@/components/v1/V1SelectedWork';

export const metadata = {
  title: 'V1 / Light',
};

export default function V1Page() {
  return (
    <>
      <Navigation tone="light" variant="solid-light" />
      <main id="main">
        <V1Hero />
        <V1HeroFeatures />
        <PartnersStrip tone="light" caption="Partners With" />
        <V1Manifesto />
        <SystemFamilies tone="light" headline="System Families" />
        <V1SelectedWork />
        <HowWeWork tone="light" headline="How We Work" kicker="Process" />
        <ProcuralBlock tone="light" emphasis="subtle" />
      </main>
      <Footer tone="light" />
    </>
  );
}
