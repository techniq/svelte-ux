import { parse, walk } from 'svelte/compiler';
import staticAdapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import sveld from 'vite-plugin-sveld';

import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    mdsvex(mdsvexConfig),
    sveltePreprocess(),
    // Add table of contents based on headings
    {
      markup({ content, filename }) {
        // console.log({ filename });

        if (/node_modules/.test(filename)) return null;

        if (filename.endsWith('.md') && filename.match(/routes\/docs\/(components)/)) {
          const toc = [];

          walk(parse(content), {
            enter(node) {
              if (node.type === 'Element') {
                if (node.name === 'h2') {
                  const id = node.attributes.find((attribute) => attribute.name === 'id');
                  toc.push({
                    id: id?.value[0].raw ?? 'unknown',
                    text: node.children[0].raw,
                  });
                }
              }
            },
          });

          const githubFilename = 'src/' + filename.match('src/(.*)')[1];
          const component = filename.match('.*/(.*).md')[1];

          return {
            code: content
              .replace('$filename', githubFilename)
              .replace('$component', component)
              .replace(
                '</Layout_MDSVEX_DEFAULT>',
                `
                  <div slot="toc" class="prose">
                    <ul>
                      <!--
                      <li>
                        <a href="#usage">Usage</a>
                      </li>
                      -->
                      <li>
                        <a href="#examples">Examples</a>
                        <ul>
                        ${toc
                          .map((item) => {
                            return `
                              <li>
                                <a href="\#${item.id}">${item.text}</a>
                              </li>`;
                          })
                          .join('')}
                        </ul>
                      </li>
                      <li>
                        <a href="#api">API</a>
                        <ul>
                          <li><a href="#props">Props</a></li>
                          <li><a href="#slots">Slots</a></li>
                          <li><a href="#events">Events</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  </Layout_MDSVEX_DEFAULT>
                `
              ),
          };
        }
      },
    },
  ],

  kit: {
    adapter: staticAdapter(),
    target: '#svelte',
    ssr: false, // TODO: Re-enable after identifing/fixing layout shift
    vite: {
      plugins: [sveld()],
      optimizeDeps: {
        include: ['d3-scale', 'd3-format', 'd3-time', 'd3-array'],
      },
    },
  },
};

export default config;
