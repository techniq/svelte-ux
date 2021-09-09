import { visit } from 'unist-util-visit';
import prettier from 'prettier/esm/standalone.mjs';
import typescriptPlugin from 'prettier/esm/parser-typescript.mjs';
import sveltePlugin from 'prettier-plugin-svelte';
import Prism from 'prismjs';
import 'prism-svelte';

const { format } = prettier;

function codePreview() {
	function visitor(node) {
		if (node.lang !== 'svelte' && !node.value.startsWith('<script')) {
			const formattedCode = format(node.value, {
				parser: 'svelte',
				plugins: [typescriptPlugin, sveltePlugin],
				svelteBracketNewLine: true
			});
			const highlightedCode = Prism.highlight(formattedCode, Prism.languages.svelte, 'svelte');
			node.value = `<Preview code="{\`${highlightedCode}\`}" language="svelte">${node.value}</Preview>`;
		}
	}

	return (tree) => {
		visit(tree, 'html', visitor);
	};
}

export default {
	extensions: ['.md', '.svx'],
	layout: './src/docs/Layout.svelte',
	remarkPlugins: [codePreview],
	highlight: false
};
