<script context="module">
  export const groupKey = {};
</script>

<script lang="ts">
  import { setContext, createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { crossfade, fade } from 'svelte/transition';
  import cssVars from '../actions/cssVars';

  export let value: any = undefined; // index or value

  // styles
  export let contained: boolean = false;
  export let underlined: boolean = false;
  export let vertical: boolean = false;
  export let circle: boolean = false;

  $: styleVars = {
    flow: vertical ? 'row' : 'column',
    borderRadius: circle ? '9999px' : null,
  };

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
    // console.log({ selected, newSelectedOption });
    selectOption(newSelectedOption, value);
  }

  function registerOption(option: HTMLElement, optionValue: any) {
    options.push(option);
    // if (value != null) {
    optionsByValue.set(optionValue, option);
    // }

    // Select option if selected after being registered
    if (/*selected != null &&*/ optionValue === value) {
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
    // console.log('selectOption', option, optionValue);

    if (option) {
      dispatch('change', { value: optionValue });
      $selectedOption = option;
      value = optionValue;

      const i = options.indexOf(option);
      $selectedPanel = panels[i];
    }
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
  });
</script>

<div class="toggle-group" class:contained class:underlined use:cssVars={styleVars} {...$$restProps}>
  <slot />
</div>

<style lang="postcss">
  /*
	 * Contained (Apple) style
	 */
  .contained :global(.options) {
    @apply inline-grid overflow-auto p-1 text-sm bg-black/10 border-black/20 transition-shadow border;
    grid-auto-flow: var(--flow);
    border-radius: var(--borderRadius, 10px);
  }
  .contained :global(.options:hover) {
    @apply shadow border-gray-700;
  }

  /* TODO: Determine why this no longer works.  Could be due to recent Svelte change with :global() or Tailwind */
  /* .contained :global(.optionContainer) {
    @apply text-black/50 hover:text-opacity-100 hover:bg-black/5 ring-black/40 focus-visible:ring-1;
    border-radius: var(--borderRadius, 8px);
  } */
  .contained :global(.optionContainer) {
    @apply text-black/50 ring-black/40;
    border-radius: var(--borderRadius, 8px);
  }
  .contained :global(.optionContainer:hover) {
    @apply text-opacity-100 bg-black/5;
  }
  .contained :global(.optionContainer:focus-visible) {
    @apply ring-1;
  }

  .contained :global(.optionContainer.selected) {
    @apply text-black;
  }

  .contained :global(.indicator) {
    @apply bg-white w-full h-full z-0 shadow-md ring-black/20 ring-1;
    border-radius: var(--borderRadius, 8px);
  }

  /*
	 * Underline (Twitter) style
	 */
  .underlined :global(.options) {
    @apply flex border-b text-sm h-10;
  }

  .underlined :global(.optionContainer) {
    @apply text-black/50 font-bold;
  }
  .underlined :global(.optionContainer:hover) {
    @apply text-accent-500 bg-accent-500/10;
  }

  .underlined :global(.selected) {
    @apply text-accent-500;
  }

  .underlined :global(.indicator) {
    @apply h-full border-b-2 border-accent-500;
  }

  .underlined :global(.circle .options) {
    /* width: 144px;
    height: 48px;
    border-radius: 24px;
    min-height: 48px; */
  }

  .underlined :global(.circle .indicator) {
    /* border-radius: 24px;
    border: 2px solid #1da1f2; */
  }
</style>
