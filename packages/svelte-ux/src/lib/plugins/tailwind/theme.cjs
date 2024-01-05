const {
  rgb,
  hsl,
  oklch,
  clampRgb,
  interpolate,
  wcagContrast,
  formatCss,
} = require('culori/require');

const { semanticColors, stateColors, colorNames, shades } = require('../../styles/theme');

/**
 * Generate theme colors (ex. { primary: hsl(var(--color-primary) / <alpha-value>), ... })
 * @param {'rgb' | 'hsl' | 'oklch'} colorSpace
 */
function createThemeColors(colorSpace) {
  return Object.fromEntries(
    colorNames.map((color) => [color, `${colorSpace}(var(--color-${color}) / <alpha-value>)`])
  );
}

/**
 * Inject all Tailwind config themes (`{ ux: { themes: [] }}`) into base CSS
 * @param {'rgb' | 'hsl' | 'oklch'} colorSpace
 */
function injectThemes(colorSpace, addBase, config) {
  const themes = config('ux.themes');
  const themeRoot = config('ux.themeRoot') ?? ':root';

  /**
   * Convert names to CSS variables and color values common color space (hsl, oklch, etc) and space separated
   */
  function processThemeColors(themeColors) {
    const colors = { ...themeColors };

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
          const newColor =
            shade < 500
              ? lightenColor(colors[color], (500 - shade) / 1000) // 100 == 0.1
              : shade > 500
                ? darkenColor(colors[color], (shade - 500) / 1000) // 100 == 0.1
                : colors[color];
          colors[shadeColorName] = newColor;
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

  const cssThemes = {};
  let rootThemeName = null;
  Object.entries(themes).map(([themeName, themeColors], index) => {
    if (index === 0) {
      // Root / default theme
      cssThemes[themeRoot] = processThemeColors(themeColors);
      rootThemeName = themeName;
    } else if (index === 1) {
      // Dark theme
      cssThemes['@media (prefers-color-scheme: dark)'] = {
        [themeRoot]: processThemeColors(themeColors),
      };

      // Also register first and second them by name AFTER @media for precedence
      cssThemes[`[data-theme=${rootThemeName}]`] = processThemeColors(themes[rootThemeName]);
      cssThemes[`[data-theme=${themeName}]`] = processThemeColors(themeColors);
    } else {
      cssThemes[`[data-theme=${themeName}]`] = processThemeColors(themeColors);
    }
  });

  addBase(cssThemes);
}

function round(value, decimals) {
  if (value) {
    return Number(value.toFixed(decimals));
  } else {
    return 0;
  }
}

function isDark(color) {
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
function foregroundColor(color, percentage = 0.8) {
  try {
    return isDark(color) ? lightenColor(color, percentage) : darkenColor(color, percentage);
  } catch (e) {
    // console.error('Unable to generate foreground color', color);
  }
}

function lightenColor(color, percentage) {
  try {
    return formatCss(interpolate([color, 'white'], 'oklch')(percentage));
  } catch (e) {
    // console.error('Unable to generate lighten color', color);
  }
}

function darkenColor(color, percentage) {
  try {
    return formatCss(interpolate([color, 'black'], 'oklch')(percentage));
  } catch (e) {
    // console.error('Unable to generate darken color', color);
  }
}

/**
 * Convert color to space separated components string
 * @param {'rgb' | 'hsl' | 'oklch'} colorSpace
 */
function colorVariableValue(color, colorSpace) {
  try {
    if (colorSpace === 'rgb') {
      const { r, g, b } = rgb(color);
      return `${round(r * 255, 6)} ${round(g * 255, 6)} ${round(b * 255, 6)}`;
    } else if (colorSpace === 'hsl') {
      const { h, s, l } = hsl(clampRgb(color));
      return `${round(h, 6)} ${round(s * 100, 6)}% ${round(l * 100, 6)}%`;
      // return `${round(h, 6)} ${round(Math.min(s * 100, 100), 6)}% ${round(Math.min(l * 100, 100), 6)}%`;
    } else if (colorSpace === 'oklch') {
      const { l, c, h } = oklch(color);
      return `${round(l, 6)} ${round(c, 6)} ${round(h, 6)}`;
    }
  } catch (e) {
    // console.error('Unable to convert color object to string', color);
  }
}

module.exports = { createThemeColors, injectThemes };
