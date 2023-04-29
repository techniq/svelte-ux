/**
 * Add table of contents based on headings to markdown (.md) files.  Useful with mdsvex
 */
export function markdownToc() {
  return {
    markup({ content, filename }) {
      // console.log({ filename });

      if (/node_modules/.test(filename)) return null;

      // TODO: After removing toc, can this rest of this be done via SvelteKit load() / Vite?
      if (filename.endsWith('.md') && filename.match(/routes\/docs/)) {
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
            .replace('$docUrl', docUrl),
        };
      }
    },
  };
}
