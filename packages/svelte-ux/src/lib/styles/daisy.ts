import daisyThemes from 'daisyui/src/theming/themes.js';
// import { themeOrder } from 'daisyui/src/theming/themeDefaults'; // breaks build
import { sortFunc } from '../utils/sort.js';
import { entries, fromEntries } from '../types/typeHelpers.js';
import type { Theme } from 'daisyui';

const themeNames = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
];

const daisyColorMap = {
  'base-100': 'surface-100',
  'base-200': 'surface-200',
  'base-300': 'surface-300',
  'base-content': 'surface-content',
  error: 'danger',
  'error-content': 'danger-content',
};

/**
 *  Map Daisy UI color names to Svelte UX names, and sort themes
 */
function mapColorsName(themes: typeof daisyThemes, colorMap: typeof daisyColorMap) {
  let themesGeneric = themes as unknown as Record<Theme, Record<string, string>>;
  let colorMapGeneric: Record<string, string> = colorMap;

  return fromEntries(
    entries(themesGeneric)
      .map(([themeName, colors]): [string | Theme, Record<string, string>] => {
        const mappedColors = fromEntries(
          entries(colors).map(([key, value]): [string, string] => {
            return [colorMapGeneric[key] ?? key, value];
          })
        );
        return [themeName, mappedColors];
      })
      .sort(sortFunc(([themeName]) => themeNames.indexOf(themeName as string)))
  );
}

const themes = mapColorsName(daisyThemes, daisyColorMap);

export { themes };
