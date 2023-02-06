<script lang="ts">
  import { spring } from 'svelte/motion';
  import { format as formatUtil, type FormatType } from '../utils/format';

  type T = $$Generic;
  type SpringOptions = Parameters<typeof spring<T>>[1];

  export let value: T | 0;
  export let format: FormatType = undefined;
  export let options: SpringOptions;
  export let disabled = false;

  const springValue = spring(value, options);
  $: $springValue = value ?? 0;
  $: displayValue = disabled || value == null ? value : $springValue;
</script>

<slot value={displayValue}>
  {#if format}
    {formatUtil(displayValue, format)}
  {:else}
    {displayValue}
  {/if}
</slot>
