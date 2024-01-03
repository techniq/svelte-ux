import { range } from 'd3-array';

export const semanticColors = ['primary', 'secondary', 'accent', 'neutral'] as const;
export const stateColors = ['info', 'success', 'warning', 'danger'] as const;
export const colors = [...semanticColors, ...stateColors];

export const shades = range(100, 1000, 100);

export const colorNames = [
  // Semantic & State colors (ex. `priamry`, 'primary-content`, 'primary-100`, ...)
  ...colors.flatMap((color) => [
    color, // default
    `${color}-content`, // text/content
    ...shades.map((shade) => `${color}-${shade}`),
  ]),

  // Surfaces
  'surface-100',
  'surface-200',
  'surface-300',
  'surface-content',
];
