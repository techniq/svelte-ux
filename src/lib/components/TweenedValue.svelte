<script lang="ts">
  import { tweened } from 'svelte/motion';

  type T = $$Generic;
  type TweenedOptions = Parameters<typeof tweened<T>>[1];

  export let value: T;
  export let options: TweenedOptions;

  const tweenedValue = tweened(value, options);
  $: $tweenedValue = value;
</script>

<slot value={$tweenedValue}>
  {$tweenedValue}
</slot>
