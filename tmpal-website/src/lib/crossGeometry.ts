/**
 * The TMP red plus/cross mark — the brand's central motif.
 *
 * A + shape with concave (notched) inner corners. Used three ways:
 *
 *   1. As a solid SVG path filled with a color   → v1 & v2 manifesto slabs
 *   2. As a stroked path with animated pathLength → v3 line-draw reveal
 *   3. Extruded in 3D via THREE.Shape            → v3 materialised aluminium
 *
 * ViewBox is 0..100 in both axes — square. The path traces clockwise from
 * the top-left of the top arm so a clockwise pathLength sweep feels like
 * "drawing" the mark in one stroke.
 */

export const CROSS_VIEWBOX = '0 0 100 100';
export const CROSS_SIZE = 100;

/** Geometry constants (in viewBox units). */
export const CROSS = {
  /** Half-width of each arm. Arms span `50 ± ARM_HALF`. */
  ARM_HALF: 18,
  /** Radius of the concave inner-corner notch. */
  CORNER_R: 8,
} as const;

/**
 * The full plus path — a closed shape with rounded concave inner corners.
 * Use with `fill` for solid renders; use with `fill="none"` + `stroke` for
 * the line-draw reveal in v3 (pathLength 0 → 1 traces this perimeter).
 */
export const crossPath = [
  'M 32 0',
  'L 68 0',
  'L 68 24',
  'Q 68 32 76 32',
  'L 100 32',
  'L 100 68',
  'L 76 68',
  'Q 68 68 68 76',
  'L 68 100',
  'L 32 100',
  'L 32 76',
  'Q 32 68 24 68',
  'L 0 68',
  'L 0 32',
  'L 24 32',
  'Q 32 32 32 24',
  'Z',
].join(' ');

/**
 * Clip-paths for the two diagonal halves of the cross — used by v1 & v2 to
 * show "fragments" sliding apart and back together. When both halves are
 * stacked on the same centre they form the full cross with an invisible
 * diagonal seam.
 *
 *   ▟ top-left half  → keep upper-left triangle
 *   ▜ bottom-right   → keep lower-right triangle
 */
export const HALF_CLIP_TOP_LEFT = 'polygon(0% 0%, 100% 0%, 0% 100%)';
export const HALF_CLIP_BOTTOM_RIGHT = 'polygon(100% 0%, 100% 100%, 0% 100%)';

/**
 * Approximate visual height of the assembled cross in viewBox units —
 * useful for callers that need to clamp the cross's on-page size based on
 * surrounding type.
 */
export const CROSS_ASPECT = 1;
