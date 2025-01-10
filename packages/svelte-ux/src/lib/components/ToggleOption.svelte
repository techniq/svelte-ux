<script lang="ts">
  import { onMount, onDestroy, getContext, type Snippet } from 'svelte';

  import { groupKey } from './ToggleGroup.svelte';
  import { scrollIntoView } from '../utils/dom.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import type { HTMLInputAttributes, HTMLLabelAttributes } from 'svelte/elements';

  interface Props {
    value: any;
    classes?: {
      root?: string;
      option?: string;
      indicator?: string;
    };
    onclick?: HTMLInputAttributes['onclick'];
    children?: Snippet<[{ selected: boolean }]>;
  }

  let {
    value,
    classes = {},
    class: className,
    onclick,
    children,
    ...restProps
  }: Props & Omit<HTMLLabelAttributes, keyof Props> = $props();
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

  let optionElement: HTMLElement | null = $state(null);
  let selected = $derived($selectedOption === optionElement);

  onMount(() => {
    registerOption(optionElement, value);
  });

  onDestroy(() => {
    unregisterOption(optionElement, value);
  });

  $effect(() => {
    if (autoscroll && selected && optionElement) {
      // TODO: Only scroll if needed / out of view
      scrollIntoView(optionElement);
    }
  });
</script>

<label
  class:selected
  bind:this={optionElement}
  {...restProps}
  class={cls(
    'ToggleOption',
    'label',
    'grid items-center',
    $classesContext.label,
    settingsClasses.root,
    classes.root,
    className
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
    {@render children?.({ selected })}
  </div>

  <input
    {name}
    type="radio"
    class="appearance-none absolute"
    checked={selected}
    onclick={(e) => {
      selectOption(optionElement, value);
      onclick?.(e);
    }}
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
