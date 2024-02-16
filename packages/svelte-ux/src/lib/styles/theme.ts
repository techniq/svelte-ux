import { range } from 'd3-array';

import {
  rgb,
  hsl,
  oklch,
  clampRgb,
  interpolate,
  wcagContrast,
  formatCss,
  type Color,
} from 'culori';

export type SupportedColorSpace = 'rgb' | 'hsl' | 'oklch';

export const semanticColors = ['primary', 'secondary', 'accent', 'neutral'] as const;
export const stateColors = ['info', 'success', 'warning', 'danger'] as const;
export const colors = [...semanticColors, ...stateColors];

export const shades = [50, ...range(100, 1000, 100)];

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

/**
 * Generate theme colors (ex. { primary: hsl(var(--color-primary) / <alpha-value>), ... })
 */
export function createThemeColors(colorSpace: SupportedColorSpace) {
  return Object.fromEntries(
    colorNames.map((color) => [color, `${colorSpace}(var(--color-${color}) / <alpha-value>)`])
  );
}

/**
 * Get themes names split into light and dark collections determined by `color-scheme` property
 */
export function getThemeNames(themes: Record<string, any>) {
  const light: string[] = [];
  const dark: string[] = [];

  Object.entries(themes).map(([themeName, props]) => {
    if (props['color-scheme'] === 'dark') {
      dark.push(themeName);
    } else {
      light.push(themeName);
    }
  });

  return { light, dark };
}

/**
 * Convert names to CSS variables and color values common color space (hsl, oklch, etc) and space separated
 */
export function processThemeColors(
  themeColors: Record<string, string>,
  colorSpace: SupportedColorSpace
) {
  const colors = { ...themeColors };

  // TODO: make all semanatic colors optional as well

  // Generate optional semanatic colors
  if (!('neutral' in colors) && !('neutral-500' in colors)) {
    colors['neutral'] = 'oklch(.355192 .032071 262.988584)';
  }

  // Generate optional state colors
  if (!('info' in colors) && !('info-500' in colors)) {
    colors['info'] = 'oklch(0.7206 0.191 231.6)';
  }
  if (!('success' in colors) && !('success-500' in colors)) {
    colors['success'] = 'oklch(64.8% 0.150 160)';
  }
  if (!('warning' in colors) && !('warning-500' in colors)) {
    colors['warning'] = 'oklch(0.8471 0.199 83.87)';
  }
  if (!('danger' in colors) && !('danger-500' in colors)) {
    colors['danger'] = 'oklch(0.7176 0.221 22.18)';
  }

  // Generate optional content colors
  for (const color of [...semanticColors, ...stateColors]) {
    // Add `primary` from `primary-500` if not defined in theme (ex. Skeleton)
    if (!(color in colors) && `${color}-500` in themeColors) {
      colors[color] = themeColors[`${color}-500`];
    }

    if (!(`${color}-content` in colors)) {
      colors[`${color}-content`] = foregroundColor(colors[color]);
    }

    // Generate color shades (ex. `primary-500`) if not defined.  Useful for Daisy but not Skeleton themes, for example
    for (const shade of shades) {
      const shadeColorName = `${color}-${shade}`;
      if (!(shadeColorName in colors)) {
        // Find the next shade above (shade < 500) or below (shade > 500) and use as reference, if available
        const referenceShade =
          Object.keys(colors)
            .map((str) => {
              const [c, s] = str.split('-');
              return [c, Number(s)] as [string, number];
            })
            .find(([c, s]) => c === color && (s < 500 ? s > shade : s < shade))?.[1] ?? 500;
        const referenceColor = colors[`${color}-${referenceShade}`] ?? colors[color];

        if (shade < 500) {
          colors[shadeColorName] = lightenColor(referenceColor, (referenceShade - shade) / 1000); // 100 == 0.1
        } else if (shade > 500) {
          colors[shadeColorName] = darkenColor(colors[color], (shade - referenceShade) / 1000); // 100 == 0.1
        } else {
          colors[shadeColorName] = colors[color];
        }
      }
    }
  }

  // Generate optional surface colors
  if (!('surface-100' in colors)) {
    colors['surface-100'] = 'oklch(100 0 0)';
  }

  if (!('surface-200' in colors)) {
    colors['surface-200'] = darkenColor(colors['surface-100'], 0.07);
  }

  if (!('surface-300' in colors)) {
    if ('surface-200' in themeColors) {
      colors['surface-300'] = darkenColor(colors['surface-200'], 0.07);
    } else {
      colors['surface-300'] = darkenColor(colors['surface-100'], 0.14);
    }
  }

  if (!('surface-content' in colors)) {
    colors['surface-content'] = foregroundColor(colors['surface-100']);
  }

  // Add `color-scheme: "dark"` for `dark` theme (if not set)
  if (!('color-scheme' in colors)) {
    colors['color-scheme'] = isDark(colors['surface-content']) ? 'light' : 'dark';
  }

  const result = Object.fromEntries(
    Object.entries(colors).map(([name, value]) => {
      if (colorNames.includes(name)) {
        // Add space separated color variables for each color
        return [`--color-${name}`, colorVariableValue(value, colorSpace)];
      } else {
        // Additional properties such as `color-scheme` or CSS variable
        return [name, value];
      }
    })
  );

  return result;
}

function round(value: number, decimals: number) {
  if (value) {
    return Number(value.toFixed(decimals));
  } else {
    return 0;
  }
}

function isDark(color: Color | string) {
  try {
    if (wcagContrast(color, 'black') < wcagContrast(color, 'white')) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

/** Lighten or darken color based on contrast of input */
function foregroundColor(color: Color | string, percentage = 0.8) {
  try {
    return isDark(color) ? lightenColor(color, percentage) : darkenColor(color, percentage);
  } catch (e) {
    // console.error('Unable to generate foreground color', color);
  }
}

function lightenColor(color: Color | string, percentage: number) {
  try {
    return formatCss(interpolate([color, 'white'], 'oklch')(percentage));
  } catch (e) {
    // console.error('Unable to generate lighten color', color);
  }
}

function darkenColor(color: Color | string, percentage: number) {
  try {
    return formatCss(interpolate([color, 'black'], 'oklch')(percentage));
  } catch (e) {
    // console.error('Unable to generate darken color', color);
  }
}

/**
 * Convert color to space separated components string
 */
export function colorVariableValue(
  color: Color | string,
  colorSpace: SupportedColorSpace,
  decimals = 4
) {
  try {
    if (colorSpace === 'rgb') {
      const { r, g, b } = rgb(color);
      return `${round(r * 255, decimals)} ${round(g * 255, decimals)} ${round(b * 255, decimals)}`;
    } else if (colorSpace === 'hsl') {
      const { h, s, l } = hsl(clampRgb(color));
      return `${round(h, decimals)} ${round(s * 100, decimals)}% ${round(l * 100, decimals)}%`;
    } else if (colorSpace === 'oklch') {
      const { l, c, h } = oklch(color);
      return `${round(l, decimals)} ${round(c, decimals)} ${round(h, decimals)}`;
    }
  } catch (e) {
    // console.error('Unable to convert color object to string', color);
  }
}

/**
 * Process theme to style variables
 */
export function themeStylesString(theme: any, colorSpace: SupportedColorSpace) {
  const styleProperties = processThemeColors(theme, colorSpace);
  return Object.entries(styleProperties)
    .map(([key, value]) => {
      return `${key}: ${value};`;
    })
    .join('\n');
}

/** Return a script tag that will set the initial theme from localStorage. This allows setting
 * the theme before anything starts rendering, even when SSR is in use.
 *
 * This feels a bit weird compared to just placing the function directly in svelte:head,
 * but it's the only way to inject the `darkThemes` array into the function.
 **/
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
