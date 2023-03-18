<script lang="ts">
  import Prism from 'prismjs';
  import 'prism-svelte';
  import { mdiCodeTags, mdiContentCopy } from '@mdi/js';

  import { slide } from 'svelte/transition';

  import Button from './Button.svelte';

  export let code = null;
  export let language = 'svelte';
  export let highlightedCode = code ? Prism.highlight(code, Prism.languages.svelte, language) : '';
  export let showCode = false;
</script>

<div class="border border-black/20 rounded bg-white">
  <div class="p-4">
    <slot />
  </div>

  {#if code && showCode}
    <div class="relative">
      <pre
        class="language-{language} rounded"
        style="margin: 0; white-space: normal;"
        transition:slide|local>
          <code class="language-{language}">{@html highlightedCode}</code>
      </pre>

      <div class="absolute top-0 right-0 p-2">
        <Button
          icon={mdiContentCopy}
          class="text-white/70 hover:bg-white/20 py-1"
          on:click={() => navigator.clipboard.writeText(code)}
        >
          Copy
        </Button>
      </div>
    </div>
  {/if}
</div>

{#if code}
  <Button icon={mdiCodeTags} class=" text-black/70 py-1" on:click={() => (showCode = !showCode)}>
    {showCode ? 'Hide' : 'Show'} Code
  </Button>
{/if}
