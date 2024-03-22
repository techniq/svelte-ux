const colors = require('tailwindcss/colors');
const { createThemeColors, processThemeColors } = require('../../styles/theme');
const { entries } = require('../../types/typeHelpers');

const defaultThemes = {
  light: {
    primary: colors['blue']['500'],
    'primary-content': 'white',
    secondary: colors['blue']['500'],
    'surface-100': 'white',
    'surface-200': colors['gray']['100'],
    'surface-300': colors['gray']['300'],
    'surface-content': colors['gray']['900'],
  },
  dark: {
    primary: colors['blue']['500'],
    'primary-content': 'white',
    secondary: colors['blue']['500'],
    'surface-100': colors['zinc']['800'],
    'surface-200': colors['zinc']['900'],
    'surface-300': colors['zinc']['950'],
    'surface-content': colors['zinc']['100'],
  },
};

/**
 * Inject all Tailwind config themes (`{ ux: { themes: [] }}`) into base CSS
 * @param {'rgb' | 'hsl' | 'oklch'} colorSpace
 */
function injectThemes(colorSpace, addBase, config) {
  const themes = config('ux.themes') ?? defaultThemes;
  const themeRoot = config('ux.themeRoot') ?? ':root';

  const cssThemes = {};
  let rootThemeName = null;
  entries(themes).map(([themeName, themeColors], index) => {
    if (index === 0) {
      // Root / default theme
      cssThemes[themeRoot] = processThemeColors(themeColors, colorSpace);
      rootThemeName = themeName;
    } else if (index === 1) {
      // Dark theme
      cssThemes['@media (prefers-color-scheme: dark)'] = {
        [themeRoot]: processThemeColors(themeColors, colorSpace),
      };

      // Also register first and second theme by name AFTER @media for precedence
      cssThemes[`[data-theme=${rootThemeName}]`] = processThemeColors(
        themes[rootThemeName],
        colorSpace
      );
      cssThemes[`[data-theme=${themeName}]`] = processThemeColors(themeColors, colorSpace);
    } else {
      cssThemes[`[data-theme=${themeName}]`] = processThemeColors(themeColors, colorSpace);
    }
  });

  addBase(cssThemes);
}

module.exports = { createThemeColors, injectThemes };
