import daisyThemes from 'daisyui/src/theming/themes';
import { themeOrder } from 'daisyui/src/theming/themeDefaults';
import { sortFunc } from '../utils/sort';

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

const themes = mapColorsName(daisyThemes, daisyColorMap);

let lightThemes: string[] = [];
let darkThemes: string[] = [];

Object.entries(themes).forEach(([themeName, colors]) => {
  if (colors['color-scheme'] === 'dark') {
    darkThemes.push(themeName);
  } else {
    lightThemes.push(themeName);
  }
});

export { lightThemes, darkThemes };
