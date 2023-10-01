<script lang="ts">
  import Prism from 'prismjs';
  import 'prism-svelte';
  import { mdiCodeTags } from '@mdi/js';

  import { slide } from 'svelte/transition';

  import Button from './Button.svelte';
  import { cls } from '$lib/utils/styles';
  import CopyButton from './CopyButton.svelte';

  export let code: string | null = null;
  export let language = 'svelte';
  export let highlightedCode = code ? Prism.highlight(code, Prism.languages.svelte, language) : '';
  export let showCode = false;
</script>

<div class={cls('Preview border border-black/20 rounded bg-white', $$props.class)}>
  <div class="p-4">
    <slot />
  </div>

  {#if code && showCode}
    <div class="relative">
      <pre
        class="language-{language} rounded"
        style="margin: 0; white-space: normal;"
        transition:slide>
          <code class="language-{language}">{@html highlightedCode}</code>
      </pre>

      <div class="absolute top-0 right-0 p-2 z-10">
        <CopyButton
          value={code}
          class="text-white/70 hover:bg-white/20 py-1 backdrop-blur-md"
          size="sm"
        />
      </div>
    </div>
  {/if}
</div>

{#if code}
  <Button icon={mdiCodeTags} class=" text-black/70 py-1" on:click={() => (showCode = !showCode)}>
    {showCode ? 'Hide' : 'Show'} Code
  </Button>
{/if}
