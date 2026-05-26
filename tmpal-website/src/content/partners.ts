export interface Partner {
  name: string;
  /** Plain text mark — kept as type so we don't ship raster logos. */
  mark: string;
}

export const partners: Partner[] = [
  { name: 'Continental Coffee', mark: 'CONTINENTAL COFFEE' },
  { name: 'J2S', mark: 'J2S' },
  { name: 'Raptascan', mark: 'Raptascan' },
  { name: 'HBL', mark: 'HBL' },
];
