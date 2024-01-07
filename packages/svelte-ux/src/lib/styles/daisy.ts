import daisyThemes from 'daisyui/src/theming/themes';
// import { themeOrder } from 'daisyui/src/theming/themeDefaults'; // breaks build
import { sortFunc } from '../utils/sort';

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
      .sort(sortFunc(([themeName]) => themeNames.indexOf(themeName)))
  );
}

const themes = mapColorsName(daisyThemes, daisyColorMap);

export { themes };
