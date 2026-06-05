<script lang="ts">
  import { slide } from 'svelte/transition';

  import Button from './Button.svelte';
  import Code from './Code.svelte';
  import { cls } from '@layerstack/tailwind';
  import { getSettings } from './settings.js';

  export let code: string | null = null;
  export let language = 'svelte';
  export let showCode = false;

  let className: string | undefined = undefined;
  export { className as class };

  const { icons } = getSettings();
</script>

<div class={cls('Preview border rounded-sm bg-surface-100', className)}>
  <div class="p-4">
    <slot />
  </div>

  {#if code && showCode}
    <div transition:slide>
      <Code source={code} {language} classes={{ root: 'rounded-t-none border-x-0 border-b-0' }} />
    </div>
  {/if}
</div>

{#if code}
  <Button
    icon={icons.code}
    class=" text-surface-content/70 py-1"
    on:click={() => (showCode = !showCode)}
  >
    {showCode ? 'Hide' : 'Show'} Code
  </Button>
{/if}
