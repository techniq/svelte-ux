<script lang="ts">
  import clsx from 'clsx';
  import { onMount, onDestroy, getContext } from 'svelte';

  import { groupKey } from './ToggleGroup.svelte';

  export let value: any;

  export let classes: {
    root?: string;
    option?: string;
    indicator?: string;
  } = {};

  const { registerOption, unregisterOption, selectOption, selectedOption, crossfade } =
    getContext(groupKey);
  const [send, receive] = crossfade;

  let optionElement: HTMLElement = null;

  onMount(() => {
    registerOption(optionElement, value);
  });

  onDestroy(() => {
    unregisterOption(optionElement, value);
  });
</script>

<button
  class:selected={$selectedOption === optionElement}
  on:click={() => selectOption(optionElement, value)}
  on:click
  bind:this={optionElement}
  {...$$restProps}
  class={clsx('optionContainer', classes.root, $$props.class)}
>
  <div class={clsx('option', classes.option)}>
    <slot />
  </div>

  {#if $selectedOption === optionElement}
    <div
      class={clsx('indicator', classes.option)}
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
