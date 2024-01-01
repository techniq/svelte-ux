const { rgb, hsl, oklch, interpolate, wcagContrast, formatCss } = require('culori/require');

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

    // Generate optional state colors
    if (!('info' in themeColors)) {
      colors['info'] = 'oklch(0.7206 0.191 231.6)';
    }
    if (!('success' in themeColors)) {
      colors['success'] = 'oklch(64.8% 0.150 160)';
    }
    if (!('warning' in themeColors)) {
      colors['warning'] = 'oklch(0.8471 0.199 83.87)';
    }
    if (!('danger' in themeColors)) {
      colors['danger'] = 'oklch(0.7176 0.221 22.18)';
    }

    // Generate optional content colors
    for (const color of [...semanticColors, ...stateColors]) {
      if (!(`${color}-content` in themeColors)) {
        colors[`${color}-content`] = foregroundColor(colors[color]);
      }

      for (const shade of shades) {
        const newColor =
          shade < 500
            ? lightenColor(colors[color], (500 - shade) / 1000) // 100 == 0.1
            : shade > 500
              ? darkenColor(colors[color], (shade - 500) / 1000) // 100 == 0.1
              : colors[color];
        colors[`${color}-${shade}`] = newColor;
      }
    }

    // Generate optional surface colors
    if (!('surface-100' in themeColors)) {
      colors['surface-100'] = 'oklch(100 0 0)';
    }

    if (!('surface-200' in themeColors)) {
      colors['surface-200'] = darkenColor(colors['surface-100'], 0.07);
    }

    if (!('surface-300' in themeColors)) {
      if ('surface-200' in themeColors) {
        colors['surface-300'] = darkenColor(colors['surface-200'], 0.07);
      } else {
        colors['surface-300'] = darkenColor(colors['surface-100'], 0.14);
      }
    }

    if (!('surface-content' in themeColors)) {
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
      const { h, s, l } = hsl(color);
      return `${round(h, 6)} ${round(s * 100, 6)}% ${round(l * 100, 6)}%`;
    } else if (colorSpace === 'oklch') {
      const { l, c, h } = oklch(color);
      return `${round(l, 6)} ${round(c, 6)} ${round(h, 6)}`;
    }
  } catch (e) {
    // console.error('Unable to convert color object to string', color);
  }
}

module.exports = { createThemeColors, injectThemes };
