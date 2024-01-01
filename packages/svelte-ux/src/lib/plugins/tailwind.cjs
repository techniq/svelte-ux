const plugin = require('tailwindcss/plugin');

const { createThemeColors, injectThemes } = require('./tailwind/theme');
const colorMix = require('./tailwind/colorMix');
const elevation = require('./tailwind/elevation');

module.exports = plugin(
  function (api) {
    const { addBase, addUtilities, matchUtilities, config } = api;

    injectThemes(addBase, config);
    // colorMix(api);
    elevation(api);

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
  },
  {
    darkMode: 'class',
    theme: {
      extend: {
        colors: (theme) => {
          // return createThemeColors(theme('ux.colorspace'));
          return createThemeColors('oklch'); // 'hsl'
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
