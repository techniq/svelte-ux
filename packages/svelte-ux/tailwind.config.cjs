const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

const svelteUx = require('@layerstack/tailwind/plugin');

module.exports = {
  content: ['./src/**/*.{html,svelte,md,ts,js}'],
  ux: {
    themes: require('./themes.json'),
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Reduce font size
            h1: {
              fontSize: theme('fontSize.2xl')[0],
              fontWeight: theme('fontWeight.extrabold'),
            },
            h2: {
              fontSize: theme('fontSize.xl')[0],
              fontWeight: theme('fontWeight.bold'),
              marginTop: theme('spacing.3'),
            },
            h3: {
              fontSize: theme('fontSize.lg')[0],
              fontWeight: theme('fontWeight.semibold'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    svelteUx({ colorSpace: 'hsl' }),
    require('@tailwindcss/typography'),

    plugin(function ({ addComponents }) {
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
