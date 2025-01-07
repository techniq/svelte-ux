<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

  interface Props {
    initial?: T | null;
    children?: Snippet<[{ value?: T | null; set: (value: T) => void }]>;
  }

  let { initial, children }: Props = $props();

  let value = $state(initial);

  function set(newValue: T) {
    value = newValue;
  }
</script>

{@render children?.({ value, set })}
