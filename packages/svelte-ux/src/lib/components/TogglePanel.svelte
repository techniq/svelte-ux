<script lang="ts">
  import { getContext, onDestroy, type Snippet } from 'svelte';

  import { groupKey } from './ToggleGroup.svelte';
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  const panel = {};
  const { registerPanel, unregisterPanel, selectedPanel } = getContext<any>(groupKey);

  registerPanel(panel);

  onDestroy(() => {
    unregisterPanel(panel);
  });
</script>

{#if $selectedPanel === panel}
  {@render children?.()}
{/if}
