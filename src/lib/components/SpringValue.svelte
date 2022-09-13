<script lang="ts">
  import { spring } from 'svelte/motion';

  export let value: number;
  export let options: Parameters<typeof spring>[1];

  const springValue = spring(value, options);
  $: $springValue = value;
</script>

<slot value={$springValue}>
  {$springValue}
</slot>
