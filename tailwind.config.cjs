const colors = require('tailwindcss/colors');

module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,svelte,md}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'color-var': 'var(--color)',
				accent: colors.blue,
				sky: colors.sky
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
