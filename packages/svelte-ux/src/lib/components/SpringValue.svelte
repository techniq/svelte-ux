<script lang="ts">
  import type { Snippet } from 'svelte';
  import { spring } from 'svelte/motion';
  import type { FormatNumberStyle } from '../utils/format.js';
  import { getSettings } from './settings.js';

  type SpringOptions = Parameters<typeof spring<number | null>>[1];

  interface Props {
    value: number | null;
    format?: FormatNumberStyle;
    options?: SpringOptions;
    disabled?: boolean;
    children?: Snippet<[{ value: number | null }]>;
  }

  let { value, format = 'none', options, disabled = false, children }: Props = $props();

  const { format: formatUtil } = getSettings();
  const springValue = spring(value, options);

  $effect(() => {
    $springValue = value ?? 0;
  });

  let displayValue = $derived(disabled || value == null ? value : $springValue);
</script>

{#if children}
  {@render children({ value: displayValue })}
{:else}
  {$formatUtil(displayValue, format)}
{/if}
