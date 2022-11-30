import { sveltekit } from '@sveltejs/kit/vite';
import sveld from 'vite-plugin-sveld';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), sveld()],
};

export default config;
