<script lang="ts">
  import { mdiContentCopy } from '@mdi/js';

  import { cls } from '../utils/styles.js';
  import Button from './Button.svelte';
  import { getComponentSettings } from './settings.js';
  import { slide } from 'svelte/transition';
  let className: string | undefined = undefined;
  export { className as class };

  const { classes: settingsClasses, defaults } = getComponentSettings('CopyButton');

  export let value: string | (() => string);

  let showMessage = false;
  $: if (showMessage) {
    setTimeout(() => (showMessage = false), 3000);
  }

  $: restProps = { ...defaults, ...$$restProps };
</script>

<Button
  icon={mdiContentCopy}
  {...restProps}
  class={cls('CopyButton', settingsClasses.root, className)}
  on:click={() => {
    let copyValue = typeof value === 'function' ? value() : value;
    navigator.clipboard.writeText(copyValue);
    showMessage = true;
  }}
>
  {#if showMessage}
    <span transition:slide={{ axis: 'x', duration: 200 }}>Copied!</span>
  {/if}
</Button>
