import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import slug from 'rehype-slug';
import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

const themes = { light: 'github-light-default', dark: 'github-dark-default' };

// Create a single shiki highlighter lazily (build-time, in Node) and reuse it for all code fences.
let highlighterPromise;
function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [themes.light, themes.dark],
      langs: [
        'svelte',
        'javascript',
        'js',
        'typescript',
        'ts',
        'json',
        'sh',
        'bash',
        'css',
        'html',
        'md',
        'plaintext',
      ],
    });
  }
  return highlighterPromise;
}

export default {
  extensions: ['.md', '.svx'],
  // https://github.com/pngwn/MDsveX/issues/556
  layout: dirname(fileURLToPath(import.meta.url)) + '/src/docs/Layout.svelte',
  rehypePlugins: [slug],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await getHighlighter();
      const language = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang: language, themes }));
      return `{@html \`${html}\`}`;
    },
  },
};
