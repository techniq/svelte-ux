<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import type { Readable } from 'svelte/store';

  interface Props {
    store: Readable<T>;
    children?: Snippet<[{ value: T }]>;
  }

  let { store, children }: Props = $props();
</script>

{@render children?.({ value: $store })}
