<script context="module">
  export const groupKey = Symbol();
</script>

<script lang="ts">
  import { setContext, createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { crossfade, fade } from 'svelte/transition';

  import { cls } from '@layerstack/tailwind';
  import { uniqueId } from '@layerstack/utils';
  import { Logger } from '@layerstack/utils';
  import { getComponentClasses } from './theme.js';

  export let name = uniqueId('group-');
  export let value: any = undefined; // index or value
  export let autoscroll: boolean = false;

  export let variant:
    | 'default'
    | 'outline'
    | 'fill'
    | 'fill-light'
    | 'fill-surface'
    | 'underline'
    | 'none' = 'default';
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
  const settingsClasses = getComponentClasses('ToggleGroup');

  $: variantClasses = {
    default: {
      options: '',
      label: 'text-surface-content/60 hover:text-primary [&.selected]:text-primary',
      indicator: 'h-full bg-primary/10',
    },
    outline: {
      options: cls(
        'border',
        gap === true
          ? vertical
            ? 'divide-y divide-y-4'
            : 'divide-x divide-x-4'
          : gap === 'px'
            ? vertical
              ? 'divide-y'
              : 'divide-x'
            : ''
      ),
      label: 'text-surface-content/60 hover:text-primary [&.selected]:text-primary',
      indicator: 'h-full w-full bg-primary/10',
    },
    fill: {
      options: cls(!gap && 'bg-primary/10'),
      label: cls(
        'text-primary hover:text-primary-700 hover:bg-primary/10 [&.selected]:text-primary-content',
        gap && 'bg-primary/10'
      ),
      indicator: 'h-full bg-primary',
    },
    'fill-light': {
      options: cls(!gap && 'bg-surface-content/10'),
      label: cls(
        'text-surface-content/60 hover:text-surface-content/80 hover:bg-surface-content/10 [&.selected]:text-primary',
        gap && 'bg-surface-content/10'
      ),
      indicator: 'h-full bg-primary/10',
    },
    'fill-surface': {
      options: cls(!gap && 'bg-surface-content/10'),
      label: cls(
        'text-surface-content/60 hover:text-surface-content/80 hover:bg-surface-content/10 [&.selected]:text-primary',
        gap && 'bg-surface-content/10'
      ),
      indicator: 'h-full bg-surface-100 border',
    },
    underline: {
      options: vertical ? 'border-r' : 'border-b',
      label:
        'relative text-surface-content/50 font-bold hover:text-primary hover:bg-primary/10 [&.selected]:text-primary',
      indicator: cls(
        'absolute border-primary',
        vertical
          ? 'top-0 right-0 h-full border-l-4 rounded-l'
          : 'bottom-0 left-0 w-full border-t-2 rounded-t'
      ),
    },
    none: {},
  } as Record<typeof variant, typeof classes>;

  // Toss classes into a store so it can be reactively read from context
  const classesStore = writable(classes);
  $: $classesStore = {
    root: cls('', variantClasses[variant].root, classes.root),

    options: cls(
      'grid overflow-auto',
      vertical ? 'grid-flow-row' : 'grid-flow-col',
      rounded === 'full' ? 'rounded-full' : rounded && 'rounded',
      variant !== 'outline' && (gap === true ? 'gap-1' : gap === 'px' ? 'gap-px' : ''),
      inset ? 'p-[2px]' : '',
      variantClasses[variant].options,
      settingsClasses.options,
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
      // If adding gap between options, round first and last outside edges for options and the indicator
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
      settingsClasses.label,
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
      settingsClasses.option,
      classes.option
    ),

    indicator: cls(
      'z-0',
      rounded === 'full' ? 'rounded-full' : rounded && 'rounded',
      variantClasses[variant].indicator,
      settingsClasses.indicator,
      classes.indicator
    ),
  };

  const logger = new Logger('ToggleGroup');

  const options: HTMLElement[] = [];
  const optionsByValue: Map<any, HTMLElement> = new Map();
  const panels: HTMLElement[] = [];
  const selectedOption = writable<HTMLElement | undefined>(undefined);
  const selectedPanel = writable<HTMLElement | undefined>(undefined);
  // @ts-expect-error - not sure why `fade` is not type compatible for `fallback`
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
    name,
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
