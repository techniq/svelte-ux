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

  const {
    registerOption,
    unregisterOption,
    selectOption,
    selectedOption,
    crossfade,
    classes: classesContext,
  } = getContext(groupKey);
  const [send, receive] = crossfade;

  let optionElement: HTMLElement = null;

  onMount(() => {
    registerOption(optionElement, value);
  });

  onDestroy(() => {
    unregisterOption(optionElement, value);
  });

  $: if ($selectedOption === optionElement) {
    optionElement.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }
</script>

<button
  type="button"
  class:selected={$selectedOption === optionElement}
  on:click={() => selectOption(optionElement, value)}
  on:click
  bind:this={optionElement}
  {...$$restProps}
  class={clsx(
    'optionContainer',
    'grid items-center',
    $classesContext.optionContainer,
    classes.root,
    $$props.class
  )}
>
  <!-- Stack indicator under option -->
  {#if $selectedOption === optionElement}
    <div
      class={clsx('indicator', $classesContext.indicator, classes.indicator)}
      in:receive={{ key: 'indicator' }}
      out:send|local={{ key: 'indicator' }}
    />
  {/if}

  <div class={clsx('option', $classesContext.option, classes.option)}>
    <slot />
  </div>
</button>

<style lang="postcss">
  /* Stack contents */
  button > * {
    grid-column: 1;
    grid-row: 1;
    z-index: 1;
  }
</style>
