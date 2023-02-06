<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { format as formatUtil, type FormatType } from '../utils/format';

  type T = $$Generic;
  type TweenedOptions = Parameters<typeof tweened<T>>[1];

  export let value: T | 0;
  export let format: FormatType = undefined;
  export let options: TweenedOptions;
  export let disabled = false;

  const tweenedValue = tweened(value, options);
  $: $tweenedValue = value ?? 0;
  $: displayValue = disabled || value == null ? value : $tweenedValue;
</script>

<slot value={displayValue}>
  {#if format}
    {formatUtil(displayValue, format)}
  {:else}
    {displayValue}
  {/if}
</slot>
