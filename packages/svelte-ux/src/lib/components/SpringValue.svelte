<script lang="ts">
  import { spring } from 'svelte/motion';
  import type { FormatType } from '../utils/format';
  import { getSettings } from './settings.js';

  type T = $$Generic;
  type SpringOptions = Parameters<typeof spring<T>>[1];

  export let value: T | 0;
  export let format: FormatType | undefined = undefined;
  export let options: SpringOptions = undefined;
  export let disabled = false;

  const { format: formatUtil } = getSettings();
  const springValue = spring(value, options);
  $: $springValue = value ?? 0;
  $: displayValue = disabled || value == null ? value : $springValue;
</script>

<slot value={displayValue}>
  {#if format}
    {$formatUtil(displayValue, format)}
  {:else}
    {displayValue}
  {/if}
</slot>
