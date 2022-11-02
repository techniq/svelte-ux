<script lang="ts">
  import { spring } from 'svelte/motion';

  type T = $$Generic;
  type SpringOptions = Parameters<typeof spring<T>>[1];

  export let value: T | 0;
  export let options: SpringOptions;
  export let disabled = false;

  const springValue = spring(value, options);
  $: $springValue = value ?? 0;
  $: displayValue = disabled || value == null ? value : $springValue;
</script>

<slot value={displayValue}>
  {displayValue}
</slot>
