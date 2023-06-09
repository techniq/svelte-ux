<script context="module">
  export const groupKey = {};
</script>

<script lang="ts">
  import { setContext, createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { crossfade, fade } from 'svelte/transition';

  import { cls } from '../utils/styles';
  import Logger from '../utils/logger';
  import { getComponentTheme } from './theme';

  export let value: any = undefined; // index or value
  export let autoscroll: boolean = false;

  // styles
  export let contained: boolean = false;
  export let underlined: boolean = false;
  export let vertical: boolean = false;
  export let circle: boolean = false;

  export let classes: {
    root?: string;
    options?: string;
    optionContainer?: string;
    option?: string;
    indicator?: string;
  } = {};
  const theme = getComponentTheme('ToggleGroup');

  const logger = new Logger('ToggleGroup');

  const options: HTMLElement[] = [];
  const optionsByValue: Map<any, HTMLElement> = new Map();
  const panels: HTMLElement[] = [];
  const selectedOption = writable(undefined);
  const selectedPanel = writable(undefined);
  const [send, receive] = crossfade({ fallback: fade });
  const dispatch = createEventDispatcher();

  // Value changed (controlled)
  $: {
    // Find selected option element based on selected value/index
    const newSelectedOption = optionsByValue.get(value) || options[value];
    logger.debug('value changed', { value, newSelectedOption });
    selectOption(newSelectedOption, value);
  }

  function registerOption(option: HTMLElement, optionValue: any) {
    options.push(option);
    optionsByValue.set(optionValue, option);

    // Select option if selected after being registered
    if (optionValue === value) {
      selectOption(option, optionValue);
    }
  }

  function unregisterOption(option: HTMLElement, optionValue: any) {
    const i = options.indexOf(option);
    options.splice(i, 1);
    selectedOption.update((current) =>
      current === option ? options[i] || options[options.length - 1] : current
    );
    optionsByValue.delete(optionValue);
  }

  function registerPanel(panel: HTMLElement) {
    panels.push(panel);
    selectedPanel.update((current) => current || panel);
  }

  function unregisterPanel(panel: HTMLElement) {
    const i = panels.indexOf(panel);
    panels.splice(i, 1);
    selectedPanel.update((current) =>
      current === panel ? panels[i] || panels[panels.length - 1] : current
    );
  }

  function selectOption(option: HTMLElement, optionValue: any) {
    logger.debug('selectOption', { option, optionValue });

    if (value !== optionValue) {
      dispatch('change', { value: optionValue });
    }

    $selectedOption = option;
    value = optionValue;

    const i = options.indexOf(option);
    $selectedPanel = panels[i];
  }

  // Toss classes into a store so it can be reactively read from context
  const classesStore = writable(classes);
  $: $classesStore = contained
    ? {
        ...classes,
        options: cls(
          'inline-grid overflow-auto p-1 text-sm bg-black/10 border-black/20 transition-shadow border',
          'hover:shadow hover:border-gray-700',
          circle ? 'rounded-full' : 'rounded-[10px]',
          vertical ? 'grid-flow-row' : 'grid-flow-col',
          theme.options,
          classes.options
        ),
        optionContainer: cls(
          'text-black/50 ring-black/40',
          circle ? 'rounded-full' : 'rounded-[8px]',
          'hover:text-opacity-100 hover:bg-black/5',
          'focus-visible:ring-1',
          '[&.selected]:text-black',
          theme.optionContainer,
          classes.optionContainer
        ),
        indicator: cls(
          'bg-white w-full h-full shadow-md ring-black/20 ring-1',
          circle ? 'rounded-full' : 'rounded-[8px]',
          theme.indicator,
          classes.indicator
        ),
      }
    : underlined
    ? {
        ...classes,
        options: cls('flex border-b text-sm h-10', theme.options, classes.options),
        optionContainer: cls(
          'text-black/50 font-bold',
          'hover:text-accent-500 hover:bg-accent-500/10',
          '[&.selected]:text-accent-500',
          theme.optionContainer,
          classes.optionContainer
        ),
        indicator: cls('h-full border-b-2 border-accent-500', theme.indicator, classes.indicator),
      }
    : classes;

  setContext(groupKey, {
    registerOption,
    unregisterOption,
    registerPanel,
    unregisterPanel,
    selectOption,
    selectedOption,
    selectedPanel,
    crossfade: [send, receive],
    classes: classesStore,
    autoscroll,
  });
</script>

<div
  class={cls('ToggleGroup', $classesStore.root, $$props.class)}
  class:contained
  class:underlined
  {...$$restProps}
>
  <div class={cls('options', $classesStore.options)}>
    <slot />
  </div>
  <slot name="panes" />
</div>
