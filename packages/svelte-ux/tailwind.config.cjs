const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const { themes } = require('./src/lib/styles/daisy');

module.exports = {
  content: ['./src/**/*.{html,svelte,md,ts,js}'],
  ux: {
    themes,
    // themes: {
    //   light: {
    //     primary: colors['blue']['500'],
    //     'primary-content': 'white',
    //     secondary: colors['cyan']['300'],
    //     'surface-100': 'white',
    //     'surface-200': colors['gray']['100'],
    //     'surface-300': colors['gray']['300'],
    //     'surface-content': colors['gray']['900'],
    //   },
    // },
  },
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
