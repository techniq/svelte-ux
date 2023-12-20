const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,svelte,md,ts,js}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
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
    }),
  ],
};
