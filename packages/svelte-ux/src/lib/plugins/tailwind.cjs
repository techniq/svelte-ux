const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  function ({ addUtilities, matchUtilities }) {
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
            [
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
            ],
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
