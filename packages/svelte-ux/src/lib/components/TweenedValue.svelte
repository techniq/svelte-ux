<script lang="ts">
  import type { Snippet } from 'svelte';
  import { tweened } from 'svelte/motion';
  import type { FormatNumberStyle } from '../utils/format.js';
  import { getSettings } from './settings.js';

  type TweenedOptions = Parameters<typeof tweened<number | null>>[1];

  interface Props {
    value: number | null;
    format?: FormatNumberStyle;
    options?: TweenedOptions;
    disabled?: boolean;
    children?: Snippet<[{ value: number | null }]>;
  }

  let { value, format = 'none', options = undefined, disabled = false, children }: Props = $props();

  const { format: formatUtil } = getSettings();
  const tweenedValue = tweened(value, options);

  $effect(() => {
    $tweenedValue = value ?? 0;
  });

  let displayValue = $derived(disabled || value == null ? value : $tweenedValue);
</script>

{#if children}
  {@render children({ value: displayValue })}
{:else}
  {$formatUtil(displayValue, format)}
{/if}
