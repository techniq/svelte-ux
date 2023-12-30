const { oklch, interpolate, wcagContrast, formatCss } = require('culori/require');

const colorNames = [
  // Semantic
  'primary',
  'primary-content',
  'secondary',
  'secondary-content',
  'accent',
  'accent-content',
  'neutral',
  'neutral-content',

  // State
  'info',
  'info-content',
  'success',
  'success-content',
  'warning',
  'warning-content',
  'danger',
  'danger-content',

  // Surfaces
  'surface-100',
  'surface-content',
  'surface-200',
  'surface-300',
];

/**
 * Generate theme colors (ex. { primary: hsl(var(--color-primary) / <alpha-value>), ... })
 */
function createThemeColors(colorSpace = 'hsl') {
  return Object.fromEntries(
    colorNames.map((color) => [color, `${colorSpace}(var(--color-${color}) / <alpha-value>)`])
  );
}

function injectThemes(addBase, config) {
  const themes = config('ux.themes');
  const themeRoot = config('ux.themeRoot') ?? ':root';

  /**
   * Convert names to CSS variables and color values common color space (hsl, oklch, etc) and space separated
   */
  function processThemeColors(input) {
    const result = {};

    const colors = { ...input };

    // Generate optional surface colors
    if (!('surface-100' in input)) {
      colors['surface-100'] = 'oklch(100 0 0)';
    }

    if (!('surface-200' in input)) {
      colors['surface-200'] = darkenColor(colors['surface-100'], 0.07);
    }

    if (!('surface-300' in input)) {
      if ('surface-200' in input) {
        colors['surface-300'] = darkenColor(colors['surface-200'], 0.07);
      } else {
        colors['surface-300'] = darkenColor(colors['surface-100'], 0.14);
      }
    }

    // Generate optional state colors
    if (!('info' in input)) {
      colors['info'] = 'oklch(0.7206 0.191 231.6)';
    }
    if (!('success' in input)) {
      colors['success'] = 'oklch(64.8% 0.150 160)';
    }
    if (!('warning' in input)) {
      colors['warning'] = 'oklch(0.8471 0.199 83.87)';
    }
    if (!('danger' in input)) {
      colors['danger'] = 'oklch(0.7176 0.221 22.18)';
    }

    // Generate optional content colors
    if (!('surface-content' in input)) {
      colors['surface-content'] = foregroundColor(colors['surface-100'], 0.8);
    }
    if (!('primary-content' in input)) {
      colors['primary-content'] = foregroundColor(colors['primary'], 0.8);
    }
    if (!('secondary-content' in input)) {
      colors['secondary-content'] = foregroundColor(colors['secondary'], 0.8);
    }
    if (!('accent-content' in input)) {
      colors['accent-content'] = foregroundColor(colors['accent'], 0.8);
    }
    if (!('neutral-content' in input)) {
      colors['neutral-content'] = foregroundColor(colors['neutral'], 0.8);
    }
    if (!('info-content' in input)) {
      if ('info' in input) {
        colors['info-content'] = foregroundColor(colors['info'], 0.8);
      } else {
        colors['info-content'] = '0 0 0';
      }
    }
    if (!('success-content' in input)) {
      if ('success' in input) {
        colors['success-content'] = foregroundColor(colors['success'], 0.8);
      } else {
        colors['success-content'] = '0 0 0';
      }
    }
    if (!('warning-content' in input)) {
      if ('warning' in input) {
        colors['warning-content'] = foregroundColor(colors['warning'], 0.8);
      } else {
        colors['warning-content'] = '0 0 0';
      }
    }
    if (!('danger-content' in input)) {
      if ('danger' in input) {
        colors['danger-content'] = foregroundColor(colors['danger'], 0.8);
      } else {
        colors['danger-content'] = '0 0 0';
      }
    }

    Object.entries(colors).forEach(([name, value]) => {
      if (colorNames.includes(name)) {
        result[`--color-${name}`] = colorObjToString(value);
      } else {
        // Additional properties such as `color-scheme` or CSS variable
        result[name] = value;
      }
    });

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
function foregroundColor(input, percentage = 0.8) {
  try {
    return isDark(input) ? lightenColor(input, percentage) : darkenColor(input, percentage);
  } catch (e) {
    // console.error('Unable to generate foreground color', input);
  }
}

function lightenColor(input, percentage = 0.8) {
  try {
    return formatCss(interpolate([input, 'white'], 'oklch')(percentage));
  } catch (e) {
    // console.error('Unable to generate lighten color', input);
  }
}

function darkenColor(input, percentage = 0.8) {
  try {
    return formatCss(interpolate([input, 'black'], 'oklch')(percentage));
  } catch (e) {
    // console.error('Unable to generate darken color', input);
  }
}

function colorObjToString(input) {
  try {
    const { l, c, h } = oklch(input);
    return `${round(l, 6)} ${round(c, 6)} ${round(h, 6)}`;
  } catch (e) {
    // console.error('Unable to convert color object to string', input);
  }
}

module.exports = { createThemeColors, injectThemes };
