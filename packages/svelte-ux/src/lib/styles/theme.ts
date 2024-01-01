import { range } from 'd3-array';

export const semanticColors = ['primary', 'secondary', 'accent', 'neutral'];

export const stateColors = ['info', 'success', 'warning', 'danger'];

export const shades = range(100, 1000, 100);

export const colorNames = [
  // Semantic & State colors (ex. `priamry`, 'primary-content`, 'primary-100`, ...)
  ...[...semanticColors, ...stateColors].flatMap((color) => {
    return [color, `${color}-content`, ...shades.map((shade) => `${color}-${shade}`)];
  }),

  // Surfaces
  'surface-100',
  'surface-content',
  'surface-200',
  'surface-300',
];
