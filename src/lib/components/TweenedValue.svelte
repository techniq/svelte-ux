<script lang="ts">
  import { tweened } from 'svelte/motion';

  export let value: number;
  export let options: Parameters<typeof tweened>[1];

  const tweenedValue = tweened(value, options);
  $: $tweenedValue = value;
</script>

<slot value={$tweenedValue}>
  {$tweenedValue}
</slot>
