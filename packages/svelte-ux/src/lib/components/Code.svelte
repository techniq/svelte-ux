<script module lang="ts">
  import { BROWSER } from 'esm-env';
  import type { Highlighter } from 'shiki/bundle/web';

  // Lazily create a single shiki highlighter (browser-only) shared by all <Code> instances.
  let highlighter = $state<Highlighter | null>(null);

  if (BROWSER) {
    import('shiki/bundle/web')
      .then(({ createHighlighter }) =>
        createHighlighter({
          themes: ['github-light-default', 'github-dark-default'],
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
          ],
        })
      )
      .then((h) => {
        highlighter = h;
      });
  }

  /** Remove the leading indentation shared by all lines (so template-literal sources highlight cleanly). */
  function stripIndent(text: string): string {
    const lines = text.split('\n');
    const indents = lines
      .filter((line) => line.trim().length > 0)
      .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
    const minIndent = indents.length ? Math.min(...indents) : 0;
    return (minIndent ? lines.map((line) => line.slice(minIndent)) : lines).join('\n').trim();
  }
</script>

<script lang="ts">
  import { transformerMetaHighlight } from '@shikijs/transformers';

  import { cls } from '@layerstack/tailwind';
  import CopyButton from './CopyButton.svelte';

  interface Props {
    source?: string | null;
    language?: string;
    copyButton?: boolean | 'hover';
    showLineNumbers?: boolean;
    /** Lines to highlight, e.g. `"1,3-5"` */
    highlight?: string;
    classes?: { root?: string; pre?: string; code?: string };
    class?: string;
  }

  let {
    source = null,
    language = 'svelte',
    copyButton = true,
    showLineNumbers = false,
    highlight,
    classes = {},
    class: className,
  }: Props = $props();

  let sourceStr = $derived(stripIndent(source ?? ''));
</script>

<div class={cls('Code', 'rounded-sm overflow-hidden border', classes.root, className)}>
  <div
    class={cls(
      'relative bg-surface-100 dark:bg-surface-300 p-4 overflow-auto not-prose [tab-size:2]',
      copyButton === 'hover' && 'group',
      showLineNumbers && 'show-line-numbers'
    )}
  >
    {#if source}
      <!-- Keep <pre><code> tightly packed: Svelte preserves whitespace inside <pre>, so any
           newlines/indentation between these tags would render as leading blank lines. -->
      <!-- eslint-disable svelte/no-at-html-tags -->
      <!-- prettier-ignore -->
      <pre class={cls('whitespace-normal overflow-auto', classes.pre)}><code class={cls('text-sm', classes.code)}>{#if highlighter}{@html highlighter.codeToHtml(sourceStr, {
            lang: language,
            themes: { light: 'github-light-default', dark: 'github-dark-default' },
            meta: highlight ? { __raw: `{${highlight}}` } : undefined,
            transformers: highlight ? [transformerMetaHighlight()] : undefined,
          })}{:else}{sourceStr}{/if}</code></pre>

      {#if copyButton !== false}
        <div
          class={cls(
            'absolute top-0 right-0 p-2 z-10',
            copyButton === 'hover' && 'opacity-0 group-hover:opacity-100 transition-opacity'
          )}
        >
          <CopyButton
            value={sourceStr}
            class="text-surface-content/70 hover:bg-surface-100/20 py-1 backdrop-blur-md"
            size="sm"
          />
        </div>
      {/if}
    {/if}
  </div>
</div>

