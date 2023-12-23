import daisyThemes from 'daisyui/src/theming/themes';
import { themeOrder } from 'daisyui/src/theming/themeDefaults';

import { sortFunc } from '../utils/sort';

const daisyColorMap = {
  'base-100': 'surface-100',
  'base-200': 'surface-200',
  'base-300': 'surface-300',
  'base-content': 'surface-content',
};

/**
 *  Map Daisy UI color names to Svelte UX names, and sort themes
 */
function mapColorsName(themes, colorMap) {
  return Object.fromEntries(
    Object.entries(themes)
      .map(([themeName, colors]) => {
        return [
          themeName,
          Object.fromEntries(
            Object.entries(colors).map(([key, value]) => {
              return [colorMap[key] ?? key, value];
            })
          ),
        ];
      })
      .sort(sortFunc(([themeName]) => themeOrder.indexOf(themeName)))
  );
}

export const themes = mapColorsName(daisyThemes, daisyColorMap);

export const lightThemes = [
  'light',
  'acid',
  'autumn',
  'bumblebee',
  'cmyk',
  'corporate',
  'cupcake',
  'cyberpunk',
  'emerald',
  'fantasy',
  'garden',
  'lemonade',
  'lofi',
  'nord',
  'pastel',
  'retro',
  'valentine',
  'winter',
  'wireframe',
];

export const darkThemes = [
  'dark',
  'aqua',
  'black',
  'business',
  'coffee',
  'dim',
  'dracula',
  'forest',
  'halloween',
  'luxury',
  'night',
  'sunset',
  'synthwave',
];
