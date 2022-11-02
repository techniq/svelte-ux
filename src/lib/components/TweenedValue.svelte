<script lang="ts">
  import { tweened } from 'svelte/motion';

  type T = $$Generic;
  type TweenedOptions = Parameters<typeof tweened<T>>[1];

  export let value: T | 0;
  export let options: TweenedOptions;
  export let disabled = false;

  const tweenedValue = tweened(value, options);
  $: $tweenedValue = value ?? 0;
  $: displayValue = disabled || value == null ? value : $tweenedValue;
</script>

<slot value={displayValue}>
  {displayValue}
</slot>
