import { format } from 'prettier';
import typescriptPlugin from 'prettier/plugins/typescript';
import sveltePlugin from 'prettier-plugin-svelte';

/**
 *  Add `code` prop to <Preview> from slot contents (highlighting is handled client-side by <Code> via shiki)
 */
export function codePreview() {
  return {
    /**
     * @param {Object} options
     * @param {string} options.content
     * @param {string} options.filename
     */
    async markup({ content, filename }) {
      let code = content;

      // Process <Preview>...</Preview> to `<Preview code={...}>...</Preview>
      const previewMatches = content.match(/<Preview[\s\S]*?<\/Preview>/g) ?? [];

      for await (const previewMatch of previewMatches) {
        const previewContent = previewMatch.match(/<Preview.*>([^]*)<\/Preview>/)?.[1] ?? '';

        const formattedCode = await format(previewContent, {
          parser: 'svelte',
          plugins: [typescriptPlugin, sveltePlugin],
        });

        if (!previewMatch.includes('code=')) {
          code = code.replace(
            previewMatch,
            previewMatch.replace('<Preview', `<Preview code={\`${formattedCode}\`}`)
          );
        }
      }

      return { code };
    },
  };
}
