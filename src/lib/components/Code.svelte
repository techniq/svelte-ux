<script lang="ts">
  import Prism from 'prismjs';
  import 'prism-svelte';
  import { mdiContentCopy } from '@mdi/js';

  import Button from './Button.svelte';
  import { cls } from '$lib/utils/styles';

  export let code: string | null = null;
  export let language = 'svelte';
  export let highlightedCode = code
    ? Prism.highlight(code, Prism.languages[language] ?? Prism.languages.text, language)
    : '';
</script>

<div class={cls('Code', 'rounded', $$restProps.class)}>
  {#if code}
    <div class="relative">
      <pre class="language-{language} rounded" style="margin: 0; white-space: normal;">
          <code class="language-{language}">{@html highlightedCode}</code>
      </pre>

      <div class="absolute top-0 right-0 p-2 z-10">
        <Button
          icon={mdiContentCopy}
          class="text-white/70 hover:bg-white/20 py-1 backdrop-blur-md"
          size="sm"
          on:click={() => navigator.clipboard.writeText(code ?? '')}
        >
          Copy
        </Button>
      </div>
    </div>
  {/if}
</div>
