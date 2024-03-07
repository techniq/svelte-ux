const plugin = require('tailwindcss/plugin');

const { createThemeColors, injectThemes } = require('./tailwind/theme.cjs');
const colorMix = require('./tailwind/colorMix.cjs');
const elevation = require('./tailwind/elevation.cjs');

// TODO: Type options (convert to Typescript and use generic argument, or use jsdoc?)
module.exports = plugin.withOptions(
  (options = {}) => {
    const colorSpace = options?.colorSpace ?? 'hsl';

    return function (api) {
      const { addBase, addUtilities, config } = api;

      injectThemes(colorSpace, addBase, config);

      // colorMix(api); // Remove `bg-mix-*` / etc utils until needed (and better browser support)

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
    };
  },
  (options) => {
    const colorSpace = options?.colorSpace ?? 'hsl';

    return {
      darkMode: 'class',
      theme: {
        extend: {
          colors: createThemeColors(colorSpace),
          borderColor: (theme) => ({
            DEFAULT: theme('colors.surface-content/20%'),
          }),
          outlineColor: (theme) => ({
            DEFAULT: theme('colors.surface-content/20%'),
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
    };
  }
);
