<script lang="ts">
  import { mdiContentCopy } from '@mdi/js';

  import { cls } from '@layerstack/tailwind';
  import Button from './Button.svelte';
  import { getComponentSettings } from './settings.js';
  import { slide } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  let className: string | undefined = undefined;
  export { className as class };

  const dispatch = createEventDispatcher<{ click: void }>();

  const { classes: settingsClasses, defaults } = getComponentSettings('CopyButton');

  export let value: string | (() => string);
  export let message: string | null = 'Copied!';

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
    dispatch('click');
    if (message) {
      showMessage = true;
    }
  }}
>
  {#if showMessage && message}
    <span transition:slide={{ axis: 'x', duration: 200 }}>{message}</span>
  {/if}
</Button>
