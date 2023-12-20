const colors = require('tailwindcss/colors');
const svelte_ux = require('svelte-ux/plugins/tailwind.cjs');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,svelte}',
		'./node_modules/svelte-ux/**/*.{svelte,js}',
		'./node_modules/layerchart/**/*.{svelte,js}'
	],
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: [svelte_ux]
};

module.exports = config;
