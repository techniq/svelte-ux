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

  export let variant: 'default' | 'outline' | 'fill' | 'fill-light' | 'underline' | 'none' =
    'default';
  export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  export let rounded: boolean | 'full' = variant !== 'underline';
  export let gap: boolean | 'px' = false;
  export let inset: boolean = false;
  export let vertical: boolean = false;

  export let classes: {
    root?: string;
    options?: string;
    label?: string;
    option?: string;
    indicator?: string;
  } = {};
  const theme = getComponentTheme('ToggleGroup');

  $: variantClasses = {
    default: {
      options: '',
      label: 'text-gray-500 hover:text-accent-500 [&.selected]:text-accent-500',
      indicator: 'h-full bg-accent-50',
    },
    outline: {
      options: 'border hover:border-gray-300',
      label: 'text-gray-500 hover:text-accent-500 [&.selected]:text-accent-500',
      indicator: 'h-full w-full bg-accent-50',
    },
    fill: {
      options: cls(!gap && 'bg-accent-500/10'),
      label: cls(
        gap && 'bg-accent-500/10',
        'text-accent-500 hover:text-accent-600 hover:bg-accent-500/10 [&.selected]:text-accent-50'
      ),
      indicator: 'h-full bg-accent-500',
    },
    'fill-light': {
      options: cls(!gap && 'bg-gray-500/10'),
      label: cls(
        gap && 'bg-gray-500/10',
        'text-gray-500 hover:text-gray-600 hover:bg-gray-500/10 [&.selected]:text-accent-500'
      ),
      indicator: 'h-full bg-accent-100',
    },
    underline: {
      options: 'border-b',
      label:
        'relative text-black/50 font-bold hover:text-accent-500 hover:bg-accent-500/10 [&.selected]:text-accent-500',
      indicator: 'absolute bottom-0 left-0 w-full border-t-2 rounded-t border-accent-500',
    },
    none: {},
  } satisfies Record<typeof variant, typeof classes>;

  // Toss classes into a store so it can be reactively read from context
  const classesStore = writable(classes);
  $: $classesStore = {
    root: cls('', variantClasses[variant].root, classes.root),

    options: cls(
      'grid overflow-auto',
      vertical ? 'grid-flow-row' : 'grid-flow-col',
      rounded === 'full' ? 'rounded-full' : rounded && 'rounded',
      gap === true ? 'gap-1' : gap === 'px' ? 'gap-px' : '',
      inset ? 'p-[2px]' : '',
      variantClasses[variant].options,
      theme.options,
      classes.options
    ),

    label: cls(
      'text-center cursor-pointer',
      {
        xs: 'text-xs',
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      }[size],
      rounded === 'full' ? 'rounded-full' : rounded && 'rounded',
      // If adding gap between options, round round firt and last outside edges for options and the indicator
      gap &&
        (vertical
          ? [
              '[&:not(:first-child)]:rounded-t-none',
              '[&:not(:last-child)]:rounded-b-none',
              '[&:not(:first-child)_.indicator]:rounded-t-none',
              '[&:not(:last-child)_.indicator]:rounded-b-none',
            ]
          : [
              '[&:not(:first-child)]:rounded-l-none',
              '[&:not(:last-child)]:rounded-r-none',
              '[&:not(:first-child)_.indicator]:rounded-l-none',
              '[&:not(:last-child)_.indicator]:rounded-r-none',
            ]),
      variantClasses[variant].label,
      theme.label,
      classes.label
    ),

    option: cls(
      variant !== 'none' && 'px-4 font-medium',
      {
        xs: '',
        sm: 'py-1',
        md: 'py-1',
        lg: 'py-1',
      }[size],
      variantClasses[variant].option,
      theme.option,
      classes.option
    ),

    indicator: cls(
      'z-0',
      rounded === 'full' ? 'rounded-full' : rounded && 'rounded',
      variantClasses[variant].indicator,
      theme.indicator,
      classes.indicator
    ),
  };

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
  class={cls('ToggleGroup', `variant-${variant}`, $classesStore.root, $$props.class)}
  {...$$restProps}
>
  <!-- TODO: Figure out why fieldset and class="overflow-auto" doesn't work  -->
  <div class={cls('options', $classesStore.options)}>
    <slot />
  </div>
  <slot name="panes" />
</div>
