const colors = require('tailwindcss/colors');

module.exports = {
	mode: 'jit',
	purge: {
		content: ['./src/**/*.html', './src/**/*.svelte', './src/**/*.md']
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
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
