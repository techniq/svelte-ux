<script lang="ts">
  import { mdiContentCopy } from '@mdi/js';

  import { cls } from '../utils/styles.js';
  import Button from './Button.svelte';
  import { getComponentSettings } from './settings.js';
  import { slide } from 'svelte/transition';
  import type { ComponentProps } from 'svelte';

  const { classes: settingsClasses, defaults } = getComponentSettings('CopyButton');

  interface Props {
    class?: string;
    value: string | (() => string);
    message?: string | null;
    onClick?: () => void;
  }

  let {
    class: className,
    value,
    message = 'Copied!',
    onClick,
    ...rest
  }: Props & Omit<ComponentProps<typeof Button>, keyof Props> = $props();

  let showMessage = $state(false);

  $effect(() => {
    if (showMessage) {
      setTimeout(() => (showMessage = false), 3000);
    }
  });

  let restProps = $derived({ ...defaults, ...rest });
</script>

<Button
  icon={mdiContentCopy}
  {...restProps}
  class={cls('CopyButton', settingsClasses.root, className)}
  onclick={() => {
    let copyValue = typeof value === 'function' ? value() : value;
    navigator.clipboard.writeText(copyValue);
    onClick?.();
    if (message) {
      showMessage = true;
    }
  }}
>
  {#if showMessage && message}
    <span transition:slide={{ axis: 'x', duration: 200 }}>{message}</span>
  {/if}
</Button>
