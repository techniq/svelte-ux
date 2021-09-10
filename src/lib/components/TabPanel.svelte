<script>
  import { getContext, onDestroy } from 'svelte';

  import { tabsKey } from './Tabs.svelte';

  const panel = {};
  const { registerPanel, unregisterPanel, selectedPanel } = getContext(tabsKey);

  registerPanel(panel);

  onDestroy(() => {
    unregisterPanel(panel);
  });
</script>

{#if $selectedPanel === panel}
  <slot />
{/if}
