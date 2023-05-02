import prettier from 'prettier/esm/standalone.mjs';
import typescriptPlugin from 'prettier/esm/parser-typescript.mjs';
import sveltePlugin from 'prettier-plugin-svelte';
import Prism from 'prismjs';
import 'prism-svelte';

const { format } = prettier;

/**
 *  Add `code` and `highlightedCode` props to <Preview> from slot contents
 */
export function codePreview() {
  return {
    markup({ content, filename }) {
      let code = content;

      const previews = content.match(/<Preview[\s\S]*?<\/Preview>/g) ?? [];

      previews.forEach((preview) => {
        const previewCode = preview.match(/<Preview.*>([^]*)<\/Preview>/)[1];

        const formattedCode = format(previewCode, {
          parser: 'svelte',
          plugins: [typescriptPlugin, sveltePlugin],
        });
        const highlightedCode = Prism.highlight(formattedCode, Prism.languages.svelte, 'svelte');

        if (!preview.includes('code=')) {
          code = code.replace(
            preview,
            preview.replace(
              '<Preview',
              `<Preview code={\`${formattedCode}\`} highlightedCode={\`${highlightedCode}\`}`
            )
          );
        }
      });

      return { code };
    },
  };
}
