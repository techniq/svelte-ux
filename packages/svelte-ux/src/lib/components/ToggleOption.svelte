<script lang="ts">
  import { onMount, onDestroy, getContext } from 'svelte';

  import { groupKey } from './ToggleGroup.svelte';
  import { scrollIntoView } from '../utils/dom.js';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let value: any;

  export let classes: {
    root?: string;
    option?: string;
    indicator?: string;
  } = {};
  const settingsClasses = getComponentClasses('ToggleOption');

  const {
    name,
    registerOption,
    unregisterOption,
    selectOption,
    selectedOption,
    crossfade,
    classes: classesContext,
    autoscroll,
  } = getContext<any>(groupKey);
  const [send, receive] = crossfade;

  let optionElement: HTMLElement | null = null;
  $: selected = $selectedOption === optionElement;

  onMount(() => {
    registerOption(optionElement, value);
  });

  onDestroy(() => {
    unregisterOption(optionElement, value);
  });

  $: if (autoscroll && selected && optionElement) {
    // TODO: Only scroll if needed / out of view
    scrollIntoView(optionElement);
  }
</script>

<label
  class:selected
  bind:this={optionElement}
  {...$$restProps}
  class={cls(
    'ToggleOption',
    'label',
    'grid items-center',
    $classesContext.label,
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
>
  <!-- Stack indicator under option -->
  {#if selected}
    <div
      class={cls(
        'indicator',
        $classesContext.indicator,
        settingsClasses.indicator,
        classes.indicator
      )}
      in:receive={{ key: 'indicator' }}
      out:send={{ key: 'indicator' }}
    ></div>
  {/if}

  <div class={cls('option', $classesContext.option, settingsClasses.option, classes.option)}>
    <slot {selected} />
  </div>

  <input
    {name}
    type="radio"
    class="appearance-none absolute"
    checked={selected}
    on:click={() => selectOption(optionElement, value)}
    on:click
  />
</label>

<style lang="postcss">
  /* Stack contents */
  label > * {
    grid-column: 1;
    grid-row: 1;
    z-index: 1;
  }
</style>
