const colors = require('tailwindcss/colors');
const layerstack = require('@layerstack/tailwind/plugin');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,svelte}', './node_modules/svelte-ux/**/*.{svelte,js}'],
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: [layerstack]
};

module.exports = config;
