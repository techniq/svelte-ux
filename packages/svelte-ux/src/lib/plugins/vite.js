import s from 'sveld';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { preprocess } from 'svelte/compiler';
import qs from 'node:querystring';

export function sveld() {
  return {
    name: 'vite-plugin-sveld',
    /**
     * @param {string} src
     * @param {string} id
     */
    async transform(src, id) {
      const query = qs.parse(id.split('?')[1]);

      if ('raw' in query && 'sveld' in query) {
        const raw = JSON.parse(src.split('export default ')[1]);

        let { code } = await preprocess(raw, vitePreprocess(), {
          filename: id,
        });
        const data = new s.ComponentParser({
          verbose: false,
        }).parseSvelteComponent(code, {
          filePath: id,
          moduleName: id,
        });

        return {
          code: `export default ${JSON.stringify(data)}`,
          map: null,
        };
      }
    },
  };
}
