import { format } from 'prettier';
import typescriptPlugin from 'prettier/plugins/typescript';
import sveltePlugin from 'prettier-plugin-svelte';
import Prism from 'prismjs';
import 'prism-svelte';

/**
 *  Add `code` and `highlightedCode` props to <Preview> from slot contents
 */
export function codePreview() {
  return {
    async markup({ content, filename }) {
      let code = content;

      // Process <Preview>...</Preview> to `<Preview code={...}>...</Preview>
      const previewMatches = content.match(/<Preview[\s\S]*?<\/Preview>/g) ?? [];

      for await (const previewMatch of previewMatches) {
        const previewContent = previewMatch.match(/<Preview.*>([^]*)<\/Preview>/)[1];

        const formattedCode = await format(previewContent, {
          parser: 'svelte',
          plugins: [typescriptPlugin, sveltePlugin],
        });
        const highlightedCode = Prism.highlight(formattedCode, Prism.languages.svelte, 'svelte');

        if (!previewMatch.includes('code=')) {
          code = code.replace(
            previewMatch,
            previewMatch.replace(
              '<Preview',
              `<Preview code={\`${formattedCode}\`} highlightedCode={\`${highlightedCode}\`}`
            )
          );
        }
      }

      return { code };
    },
  };
}
