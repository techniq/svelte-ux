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

/** Return a script tag that will set the initial theme from localStorage. This allows setting
 * the theme before anything starts rendering, even when SSR is in use. */
export function createHeadSnippet(darkThemes: string[]) {
  function _applyInitialStyle(darkThemes) {
    let theme = localStorage.getItem('theme');
    if (theme) {
      document.documentElement.dataset.theme = theme;
      if (darkThemes.includes(theme)) {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }

  let darkThemeList = darkThemes.map((theme) => `'${theme}'`).join(', ');

  return `<script>(${_applyInitialStyle.toString()})([${darkThemeList}])</script>`;
}
