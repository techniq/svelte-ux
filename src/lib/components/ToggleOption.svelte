<script lang="ts">
  import { onMount, onDestroy, getContext } from 'svelte';

  import { groupKey } from './ToggleGroup.svelte';
  import { scrollIntoView } from '../utils/dom';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let value: any;

  export let classes: {
    root?: string;
    option?: string;
    indicator?: string;
  } = {};
  const theme = getComponentTheme('ToggleOption');

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
  $: selected = $selectedOption === optionElement;

  onMount(() => {
    registerOption(optionElement, value);
  });

  onDestroy(() => {
    unregisterOption(optionElement, value);
  });

  $: if (autoscroll && selected) {
    // TODO: Only scroll if needed / out of view
    scrollIntoView(optionElement);
  }
</script>

<button
  type="button"
  class:selected
  on:click={() => selectOption(optionElement, value)}
  on:click
  bind:this={optionElement}
  {...$$restProps}
  class={cls(
    'ToggleOption',
    'optionContainer',
    'grid items-center',
    $classesContext.optionContainer,
    theme.root,
    classes.root,
    $$props.class
  )}
>
  <!-- Stack indicator under option -->
  {#if selected}
    <div
      class={cls('indicator', $classesContext.indicator, theme.indicator, classes.indicator)}
      in:receive={{ key: 'indicator' }}
      out:send|local={{ key: 'indicator' }}
    />
  {/if}

  <div class={cls('option', $classesContext.option, theme.option, classes.option)}>
    <slot {selected} />
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
