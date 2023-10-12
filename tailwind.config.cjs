const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,svelte,md,ts,js}'],
  theme: {
    extend: {
      colors: {
        accent: colors.blue,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('./src/lib/plugins/tailwind.cjs'),
    require('@tailwindcss/typography'),

    plugin(function ({ addBase, addComponents, theme }) {
      // Consider moving to tailwind plugin
      addComponents({
        '.grid-cols-xs': {
          '@apply grid-cols-[repeat(auto-fill,minmax(200px,1fr))]': {},
        },
        '.grid-cols-sm': {
          '@apply grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]': {},
        },
        '.grid-cols-md': {
          '@apply grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]': {},
        },
        '.grid-cols-lg': {
          '@apply grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(600px,1fr))]': {},
        },
      });

      // Expose color palette as CSS variables (--color-xxx-yyy) - https://gist.github.com/Merott/d2a19b32db07565e94f10d13d11a8574
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    }),
  ],
};
