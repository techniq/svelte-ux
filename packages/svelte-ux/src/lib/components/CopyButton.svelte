<script lang="ts">
  import { mdiContentCopy } from '@mdi/js';

  import { cls } from '../utils/styles';
  import Button from './Button.svelte';
  import { getComponentSettings } from './settings';
  import { slide } from 'svelte/transition';

  const { defaults } = getComponentSettings('CopyButton');
  const settingsClasses = defaults.classes;

  export let value: string;
  export let variant = defaults.variant;

  let showMessage = false;
  $: if (showMessage) {
    setTimeout(() => (showMessage = false), 3000);
  }
</script>

<Button
  icon={mdiContentCopy}
  {variant}
  {...$$restProps}
  class={cls('CopyButton', settingsClasses.root, $$props.class)}
  on:click={() => {
    navigator.clipboard.writeText(value);
    showMessage = true;
  }}
>
  {#if showMessage}
    <span transition:slide={{ axis: 'x', duration: 200 }}>Copied!</span>
  {/if}
</Button>
