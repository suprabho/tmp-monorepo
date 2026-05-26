export interface ProcessStage {
  index: number;
  title: string;
  body: string;
}

export const processStages: ProcessStage[] = [
  {
    index: 1,
    title: 'Understanding',
    body: 'We work closely with architects and designers from the initial concept stage to understand the design intent, materiality, and technical requirements.',
  },
  {
    index: 2,
    title: 'Engineering',
    body: 'Every detail is carefully studied — load paths, joinery, finishes — so the drawing can become a system that performs.',
  },
  {
    index: 3,
    title: 'Fabrication',
    body: 'Advanced laser cutting, CNC machining, and hand-finishing inside one facility. The maker reads the same drawing the architect drew.',
  },
  {
    index: 4,
    title: 'Delivery',
    body: 'From production to installation, we support execution on site so the finished work reflects the original intent.',
  },
];
