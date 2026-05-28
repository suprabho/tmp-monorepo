export interface Project {
  slug: string;
  title: string;
  location: string;
  collaborator?: string;
  year: number;
  image: string;
  family: 'facades' | 'fenestration' | 'custom-metal';
  familyLabel: 'Facades' | 'Fenestration' | 'Custom Metal';
  description: string;
}

export const projects: Project[] = [
  {
    slug: 'vault-house',
    title: 'Vault House',
    location: 'Alibaug',
    collaborator: 'Studio Lotus',
    year: 2024,
    image: '/projects/vault-house.png',
    family: 'facades',
    familyLabel: 'Facades',
    description:
      'Unitised & stick-built curtain wall systems engineered for performance, finished to architectural intent.',
  },
  {
    slug: 'continental-hq',
    title: 'Continental HQ',
    location: 'Hyderabad',
    collaborator: 'Architect Hafeez',
    year: 2023,
    image: '/projects/facades.png',
    family: 'facades',
    familyLabel: 'Facades',
    description:
      'A 32-storey aluminium façade with slim sightlines and a custom shadow-box detail, fabricated and dispatched from a single facility.',
  },
  {
    slug: 'riverside-pavilion',
    title: 'Riverside Pavilion',
    location: 'Bangalore',
    collaborator: 'Studio Lotus',
    year: 2023,
    image: '/projects/fenestration.png',
    family: 'fenestration',
    familyLabel: 'Fenestration',
    description:
      'Slim-profile steel windows with pivot doors and frameless partitions, glazed to the architect’s exact specification.',
  },
  {
    slug: 'metalworks-screen',
    title: 'Metalworks Screen',
    location: 'Mumbai',
    collaborator: 'JES Architects',
    year: 2022,
    image: '/projects/custom-metal.png',
    family: 'custom-metal',
    familyLabel: 'Custom Metal',
    description:
      'A bespoke laser-cut screen and balustrade system in patinated steel, drawing on the building’s industrial heritage.',
  },
];
