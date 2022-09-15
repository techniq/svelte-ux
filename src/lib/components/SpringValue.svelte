<script lang="ts">
  import { spring } from 'svelte/motion';

  type T = $$Generic;
  type SpringOptions = Parameters<typeof spring<T>>[1];

  export let value: T;
  export let options: SpringOptions;

  const springValue = spring(value, options);
  $: $springValue = value;
</script>

<slot value={$springValue}>
  {$springValue}
</slot>
