export interface Project {
  slug: string;
  title: string;
  location: string;
  collaborator?: string;
  year: number;
  image: string;
  family: 'facades' | 'fenestration' | 'custom-metal';
}

export const projects: Project[] = [
  {
    slug: 'vault-house',
    title: 'Vault House',
    location: 'Alibaug',
    collaborator: 'Studio Lotus',
    year: 2024,
    image: '/projects/vault-house.jpg',
    family: 'facades',
  },
];
