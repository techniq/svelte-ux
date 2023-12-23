const plugin = require('tailwindcss/plugin');
const { oklch, interpolate, wcagContrast, formatCss } = require('culori/require');

const colorNames = [
  // Semantic
  'primary',
  'primary-content',
  'secondary',
  'secondary-content',
  // TODO: accent?, neutral?

  // State
  'info',
  'info-content',
  'success',
  'success-content',
  'warning',
  'warning-content',
  'error',
  'error-content',

  // Surfaces
  'surface-100',
  'surface-content',
  'surface-200',
  'surface-300',
];

module.exports = plugin(
  function ({ addBase, addUtilities, matchUtilities, config }) {
    injectThemes(addBase, config);

    // color-mix (ex. `bg-mix-[indigo/80]`, or `bg-mix-[indigo/-40]`)
    // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
    // https://twitter.com/Saadeghi/status/1727954306140172295
    // https://twitter.com/crswll/status/1724459346489139675
    matchUtilities({
      'text-mix': (value) => {
        const [color, percent] = value.split('/');
        return {
          color: `color-mix(in oklab,color-mix(in oklab,${color},${
            percent?.startsWith('-') ? 'black' : percent?.endsWith('%') ? 'transparent' : 'white'
          } ${
            percent?.replace('-', '') + '%'
          }),transparent calc(100% - 100% * var(--tw-text-opacity,1)))`,
        };
      },
      'bg-mix': (value) => {
        const [color, percent] = value.split('/');
        return {
          backgroundColor: `color-mix(in oklab,color-mix(in oklab,${color},${
            percent?.startsWith('-') ? 'black' : percent?.endsWith('%') ? 'transparent' : 'white'
          } ${
            percent?.replace('-', '') + '%'
          }),transparent calc(100% - 100% * var(--tw-bg-opacity,1)))`,
        };
      },
      'border-mix': (value) => {
        const [color, percent] = value.split('/');
        return {
          borderColor: `color-mix(in oklab,color-mix(in oklab,${color},${
            percent?.startsWith('-') ? 'black' : percent?.endsWith('%') ? 'transparent' : 'white'
          } ${
            percent?.replace('-', '') + '%'
          }),transparent calc(100% - 100% * var(--tw-border-opacity,1)))`,
        };
      },
    });

    // Stack grid children
    addUtilities({
      '.grid-stack': {
        '& > *': {
          'grid-area': '1 / 1',
        },
      },
    });

    // Hide scrollbar
    addUtilities({
      '.scrollbar-none': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    });

    // Add `elevation-#` classes
    addUtilities({
      '.elevation-0': {
        'box-shadow':
          '0px 0px 0px 0px rgba(0,0,0,0.20), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)',
      },

      '.elevation-1': {
        'box-shadow':
          '0px 2px 1px -1px rgba(0,0,0,0.20), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      },

      '.elevation-2': {
        'box-shadow':
          '0px 3px 1px -2px rgba(0,0,0,0.20), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      },

      '.elevation-3': {
        'box-shadow':
          '0px 3px 3px -2px rgba(0,0,0,0.20), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
      },

      '.elevation-4': {
        'box-shadow':
          '0px 2px 4px -1px rgba(0,0,0,0.20), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      },

      '.elevation-5': {
        'box-shadow':
          '0px 3px 5px -1px rgba(0,0,0,0.20), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
      },

      '.elevation-6': {
        'box-shadow':
          '0px 3px 5px -1px rgba(0,0,0,0.20), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
      },

      '.elevation-7': {
        'box-shadow':
          '0px 4px 5px -2px rgba(0,0,0,0.20), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12)',
      },

      '.elevation-8': {
        'box-shadow':
          '0px 5px 5px -3px rgba(0,0,0,0.20), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
      },

      '.elevation-9': {
        'box-shadow':
          '0px 5px 6px -3px rgba(0,0,0,0.20), 0px 9px 12px 1px rgba(0,0,0,0.14), 0px 3px 16px 2px rgba(0,0,0,0.12)',
      },

      '.elevation-10': {
        'box-shadow':
          '0px 6px 6px -3px rgba(0,0,0,0.20), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
      },

      '.elevation-11': {
        'box-shadow':
          '0px 6px 7px -4px rgba(0,0,0,0.20), 0px 11px 15px 1px rgba(0,0,0,0.14), 0px 4px 20px 3px rgba(0,0,0,0.12)',
      },

      '.elevation-12': {
        'box-shadow':
          '0px 7px 8px -4px rgba(0,0,0,0.20), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)',
      },

      '.elevation-13': {
        'box-shadow':
          '0px 7px 8px -4px rgba(0,0,0,0.20), 0px 13px 19px 2px rgba(0,0,0,0.14), 0px 5px 24px 4px rgba(0,0,0,0.12)',
      },

      '.elevation-14': {
        'box-shadow':
          '0px 7px 9px -4px rgba(0,0,0,0.20), 0px 14px 21px 2px rgba(0,0,0,0.14), 0px 5px 26px 4px rgba(0,0,0,0.12)',
      },

      '.elevation-15': {
        'box-shadow':
          '0px 8px 9px -5px rgba(0,0,0,0.20), 0px 15px 22px 2px rgba(0,0,0,0.14), 0px 6px 28px 5px rgba(0,0,0,0.12)',
      },

      '.elevation-16': {
        'box-shadow':
          '0px 8px 10px -5px rgba(0,0,0,0.20), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
      },

      '.elevation-17': {
        'box-shadow':
          '0px 8px 11px -5px rgba(0,0,0,0.20), 0px 17px 26px 2px rgba(0,0,0,0.14), 0px 6px 32px 5px rgba(0,0,0,0.12)',
      },

      '.elevation-18': {
        'box-shadow':
          '0px 9px 11px -5px rgba(0,0,0,0.20), 0px 18px 28px 2px rgba(0,0,0,0.14), 0px 7px 34px 6px rgba(0,0,0,0.12)',
      },

      '.elevation-19': {
        'box-shadow':
          '0px 9px 12px -6px rgba(0,0,0,0.20), 0px 19px 29px 2px rgba(0,0,0,0.14), 0px 7px 36px 6px rgba(0,0,0,0.12)',
      },

      '.elevation-20': {
        'box-shadow':
          '0px 10px 13px -6px rgba(0,0,0,0.20), 0px 20px 31px 3px rgba(0,0,0,0.14), 0px 8px 38px 7px rgba(0,0,0,0.12)',
      },

      '.elevation-21': {
        'box-shadow':
          '0px 10px 13px -6px rgba(0,0,0,0.20), 0px 21px 33px 3px rgba(0,0,0,0.14), 0px 8px 40px 7px rgba(0,0,0,0.12)',
      },

      '.elevation-22': {
        'box-shadow':
          '0px 10px 14px -6px rgba(0,0,0,0.20), 0px 22px 35px 3px rgba(0,0,0,0.14), 0px 8px 42px 7px rgba(0,0,0,0.12)',
      },

      '.elevation-23': {
        'box-shadow':
          '0px 11px 14px -7px rgba(0,0,0,0.20), 0px 23px 36px 3px rgba(0,0,0,0.14), 0px 9px 44px 8px rgba(0,0,0,0.12)',
      },

      '.elevation-24': {
        'box-shadow':
          '0px 11px 15px -7px rgba(0,0,0,0.20), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
      },
    });
  },
  {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          ...createTheme(
            colorNames,
            'oklch'
            // 'hsl'
          ),
        },
        borderColor: (theme) => ({
          DEFAULT: theme('colors.surface-300'),
        }),
        outlineColor: (theme) => ({
          DEFAULT: theme('colors.surface-300'),
        }),
        ringOffsetColor: (theme) => ({
          DEFAULT: theme('colors.surface-100/100%'),
        }),
        typography: ({ theme }) => ({
          DEFAULT: {
            css: {
              '--tw-prose-body': theme('colors.surface-content'),
              '--tw-prose-headings': theme('colors.surface-content'),
              '--tw-prose-lead': theme('colors.surface-content'),
              '--tw-prose-links': theme('colors.surface-content'),
              '--tw-prose-bold': theme('colors.surface-content'),
              '--tw-prose-counters': theme('colors.surface-content/30%'),
              '--tw-prose-bullets': theme('colors.surface-content/30%'),
              '--tw-prose-hr': theme('colors.surface-content/20%'),
              '--tw-prose-quotes': theme('colors.surface-content'),
              '--tw-prose-quote-borders': theme('colors.surface-content'),
              '--tw-prose-captions': theme('colors.surface-content'),
              '--tw-prose-code': theme('colors.surface-content'),
              '--tw-prose-pre-code': theme('colors.surface-content'),
              '--tw-prose-pre-bg': theme('colors.surface-content'),
              '--tw-prose-th-borders': theme('colors.surface-300'),
              '--tw-prose-td-borders': theme('colors.surface-300'),
            },
          },
        }),
      },
    },
  }
);

/**
 * @param {Array<string>} colors
 */
function createTheme(colors, colorSpace = 'hsl') {
  return Object.fromEntries(
    colors.map((color) => {
      return [color, `${colorSpace}(var(--color-${color}) / <alpha-value>)`];
      // return [color, `${colorSpace}(var(--color-${color}) / var(--tw-bg-opacity))`];
    })
  );
}

function injectThemes(addBase, config) {
  const includedThemesObj = {};

  const themes = config('ux.themes');
  const themeRoot = config('ux.themeRoot') ?? ':root';

  /**
   * Convert names to CSS variables and color values common color space (hsl, oklch, etc) and space separated
   */
  function processColors(input) {
    const result = {};

    const colors = { ...input };

    // Generate optional surface colors
    if (!('surface-100' in input)) {
      colors['surface-100'] = 'oklch(100 0 0)';
    }

    if (!('surface-200' in input)) {
      colors['surface-200'] = generateDarkenColorFrom(colors['surface-100'], 0.07);
    }

    if (!('surface-300' in input)) {
      if ('surface-200' in input) {
        colors['surface-300'] = generateDarkenColorFrom(colors['surface-200'], 0.07);
      } else {
        colors['surface-300'] = generateDarkenColorFrom(colors['surface-100'], 0.14);
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
    if (!('error' in input)) {
      colors['error'] = 'oklch(0.7176 0.221 22.18)';
    }

    // Generate optional content colors
    if (!('surface-content' in input)) {
      colors['surface-content'] = generateForegroundColorFrom(colors['surface-100'], 0.8);
    }
    if (!('primary-content' in input)) {
      colors['primary-content'] = generateForegroundColorFrom(colors['primary'], 0.8);
    }
    if (!('secondary-content' in input)) {
      colors['secondary-content'] = generateForegroundColorFrom(colors['secondary'], 0.8);
    }
    if (!('accent-content' in input)) {
      colors['accent-content'] = generateForegroundColorFrom(colors['accent'], 0.8);
    }
    if (!('neutral-content' in input)) {
      colors['neutral-content'] = generateForegroundColorFrom(colors['neutral'], 0.8);
    }
    if (!('info-content' in input)) {
      if ('info' in input) {
        colors['info-content'] = generateForegroundColorFrom(colors['info'], 0.8);
      } else {
        colors['info-content'] = '0 0 0';
      }
    }
    if (!('success-content' in input)) {
      if ('success' in input) {
        colors['success-content'] = generateForegroundColorFrom(colors['success'], 0.8);
      } else {
        colors['success-content'] = '0 0 0';
      }
    }
    if (!('warning-content' in input)) {
      if ('warning' in input) {
        colors['warning-content'] = generateForegroundColorFrom(colors['warning'], 0.8);
      } else {
        colors['warning-content'] = '0 0 0';
      }
    }
    if (!('error-content' in input)) {
      if ('error' in input) {
        colors['error-content'] = generateForegroundColorFrom(colors['error'], 0.8);
      } else {
        colors['error-content'] = '0 0 0';
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
      cssThemes[themeRoot] = processColors(themeColors);
      rootThemeName = themeName;
    } else if (index === 1) {
      // Dark theme
      cssThemes['@media (prefers-color-scheme: dark)'] = {
        [themeRoot]: processColors(themeColors),
      };
      // Also register first and second them by name AFTER @media for precedence
      cssThemes[`[data-theme=${rootThemeName}]`] = processColors(themes[rootThemeName]);
      cssThemes[`[data-theme=${themeName}]`] = processColors(themeColors);
    } else {
      cssThemes[`[data-theme=${themeName}]`] = processColors(themeColors);
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

function generateForegroundColorFrom(input, percentage = 0.8) {
  try {
    return formatCss(interpolate([input, isDark(input) ? 'white' : 'black'], 'oklch')(percentage));
  } catch (e) {
    // console.error('Unable to generate foreground color', input);
  }
}

function generateDarkenColorFrom(input, percentage = 0.07) {
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
