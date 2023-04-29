import { parse, walk } from 'svelte/compiler';

/**
 * Add table of contents based on headings to markdown (.md) files.  Useful with mdsvex
 */
export function markdownToc() {
  return {
    markup({ content, filename }) {
      // console.log({ filename });

      if (/node_modules/.test(filename)) return null;

      if (filename.endsWith('.md') && filename.match(/routes\/docs/)) {
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

        const name = filename.match('.*/(.*)/.*.md')[1];
        const docUrl = 'src/' + filename.match('src/(.*)')[1] + '?plain=1';
        const sourceUrl = docUrl
          .replace('routes/docs', 'lib')
          .replace('/+page', '')
          .replace('.md', docUrl.includes('component') ? '.svelte' : '.ts');

        return {
          code: content
            .replace('$name', name)
            .replace('$sourceUrl', sourceUrl)
            .replace('$docUrl', docUrl)
            .replace(
              '</Layout_MDSVEX_DEFAULT>',
              `
                <div slot="toc" class="text-gray-600">
                  <ul>
                    <li class="mb-4">
                      <a href="#examples" class="font-semibold">Examples</a>
                      <ul class="text-sm ml-4">
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
                    <li class="">
                      <a href="#api" class="font-semibold">API</a>
                      <ul class="text-sm ml-4">
                        <li><a href="#props">props</a></li>
                        <li><a href="#slots">slots</a></li>
                        <li><a href="#events">events</a></li>
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
  };
}
