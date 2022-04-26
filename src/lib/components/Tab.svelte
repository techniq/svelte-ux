<script lang="ts">
  import { onMount, onDestroy, getContext } from 'svelte';

  import { tabsKey } from './Tabs.svelte';

  export let value: any;

  const { registerTab, unregisterTab, selectTab, selectedTab, crossfade } = getContext(tabsKey);
  const [send, receive] = crossfade;

  let tabElement: HTMLElement = null;

  onMount(() => {
    registerTab(tabElement, value);
  });

  onDestroy(() => {
    unregisterTab(tabElement, value);
  });
</script>

<button
  class:selected={$selectedTab === tabElement}
  on:click={() => selectTab(tabElement, value)}
  bind:this={tabElement}
  {...$$restProps}
  class="tabContainer {$$props.class}"
>
  <div class="tab">
    <slot />
  </div>

  {#if $selectedTab === tabElement}
    <div
      class="indicator"
      in:receive={{ key: 'indicator' }}
      out:send|local={{ key: 'indicator' }}
    />
  {/if}
</button>

<style lang="postcss">
  button {
    border: 0;
    cursor: pointer;
    margin: 0;
    padding: 0;
    outline: 0;
    user-select: none;

    display: grid;
    align-items: center;

    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  button:hover {
    /* 		background-color: rgba(0,0,0,.05); */
    /*  		background-color: rgba(255,255,255,.4); */
  }

  /* Stack contents */
  button > * {
    grid-column: 1;
    grid-row: 1;
    z-index: 1;
  }
</style>
