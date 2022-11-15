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
    autoscroll,
  } = getContext(groupKey);
  const [send, receive] = crossfade;

  let optionElement: HTMLElement = null;

  onMount(() => {
    registerOption(optionElement, value);
  });

  onDestroy(() => {
    unregisterOption(optionElement, value);
  });

  $: if (autoscroll && $selectedOption === optionElement) {
    // TODO: Only scroll if needed / out of view
    const optionOffset = {
      top: optionElement.offsetTop - optionElement.parentElement.offsetTop,
      left: optionElement.offsetLeft - optionElement.parentElement.offsetLeft,
    };
    const optionCenter = {
      left: optionElement.clientWidth / 2,
      top: optionElement.clientHeight / 2,
    };
    const containerCenter = {
      left: optionElement.parentElement.clientWidth / 2,
      top: optionElement.parentElement.clientHeight / 2,
    };
    optionElement.parentElement.scroll({
      top: optionOffset.top + optionCenter.top - containerCenter.top,
      left: optionOffset.left + optionCenter.left - containerCenter.left,
      behavior: 'smooth',
    });
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
