<script lang="ts">
  import { mdiContentCopy } from '@mdi/js';

  import { cls } from '../utils/styles';
  import Button from './Button.svelte';
  import { getComponentTheme } from './theme';

  export let value: string;

  let showMessage = false;
  $: if (showMessage) {
    setTimeout(() => (showMessage = false), 3000);
  }

  const theme = getComponentTheme('CopyButton');
</script>

<Button
  icon={mdiContentCopy}
  {...$$restProps}
  class={cls('CopyButton', theme.root, $$props.class)}
  on:click={() => {
    navigator.clipboard.writeText(value);
    showMessage = true;
  }}
>
  {#if showMessage}
    Copied!
  {/if}
</Button>
