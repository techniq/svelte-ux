<script lang="ts">
  import type { Snippet } from 'svelte';
  import Prism from 'prismjs';
  import 'prism-svelte';
  import { mdiCodeTags } from '@mdi/js';

  import { slide } from 'svelte/transition';

  import Button from './Button.svelte';
  import Code from './Code.svelte';
  import { cls } from '../utils/styles.js';

  interface Props {
    code?: string | null;
    language?: string;
    highlightedCode?: string;
    showCode?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    code,
    language = 'svelte',
    highlightedCode = code ? Prism.highlight(code, Prism.languages.svelte, language) : '',
    showCode = $bindable(false),
    class: className,
    children,
  }: Props = $props();
</script>

<div class={cls('Preview border rounded bg-surface-100', className)}>
  <div class="p-4">
    {@render children?.()}
  </div>

  {#if code && showCode}
    <div transition:slide class="bg-surface-200">
      <Code source={code} highlightedSource={highlightedCode} classes={{ pre: 'rounded-t-none' }} />
    </div>
  {/if}
</div>

{#if code}
  <Button
    icon={mdiCodeTags}
    class=" text-surface-content/70 py-1"
    onclick={() => (showCode = !showCode)}
  >
    {showCode ? 'Hide' : 'Show'} Code
  </Button>
{/if}
