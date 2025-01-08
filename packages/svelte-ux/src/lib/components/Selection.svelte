<script lang="ts" generics="T">
  import { onMount, type Snippet } from 'svelte';
  import selectionStore from '../stores/selectionStore.js';

  interface Props {
    initial?: T[];
    all?: T[];
    single?: boolean;
    max?: number;
    onChange?: (value: typeof $selection.selected) => void;
    children?: Snippet<[typeof $selection]>;
  }

  let { initial = [], all = [], single = false, max, onChange, children }: Props = $props();

  const selection = $derived(selectionStore({ initial, all, single, max }));

  onMount(() => {
    $selection.all.set(all);
  });

  $effect(() => {
    onChange?.($selection.selected);
  });
</script>

{@render children?.({ ...$selection })}
