<script context="module">
  // Custom components: https://mdsvex.com/docs#custom-components
  import blockquote from './Blockquote.svelte';
  import a from './Link.svelte';

  // Used by injected info via svelte preprocessor
  import { mdiFileDocumentEditOutline } from '@mdi/js';
  import Button from '$lib/components/Button.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';

  export { a, blockquote };
</script>

<script>
  // frontmatter: https://mdsvex.com/docs#frontmatter-1
  export let component;
  export let filename;
  export let description;
</script>

{#if component}
  <div class="flex items-center gap-2">
    <span class="text-2xl font-bold">{component}</span>
    {#if filename}
      <Tooltip title="Edit this page">
        <Button
          class="text-black/50"
          icon={mdiFileDocumentEditOutline}
          href="https://github.com/techniq/svelte-ux/blob/master/{filename}"
          target="_blank"
        />
      </Tooltip>
    {/if}
  </div>
{/if}

{#if description}
  {description}
{/if}

<slot name="toc" />

<slot />
