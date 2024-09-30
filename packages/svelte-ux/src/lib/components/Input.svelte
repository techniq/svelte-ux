<script lang="ts">
  /*
    TODO:
      - [ ] Show remaining mask as separate element under input (instead of input.value)
        - Set opacity to match TextField placeholder (30%)
        - Replace completed slots as spaces (for spacing)
  */
  import { createEventDispatcher, onMount } from 'svelte';
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

  import { multi } from '../actions/multi.js';
  import type { Actions } from '../actions/multi.js';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let name = '';
  export let value = '';
  export let type: HTMLInputTypeAttribute = 'text';
  export let inputmode: HTMLInputAttributes['inputmode'] | undefined = undefined;
  export let id: string | undefined = undefined;
  export let actions: Actions<HTMLInputElement | HTMLTextAreaElement> | undefined = undefined;
  export let inputEl: HTMLInputElement | null = null;
  export let autocapitalize: HTMLInputAttributes['autocapitalize'] = undefined;
  let className: string | undefined = undefined;
  export { className as class };

  export let mask = '';
  export let replace = '_';
  export let accept: string | RegExp = '\\d';
  let placeholderProp: string | undefined = undefined;
  export { placeholderProp as placeholder };
  export let required = false;
  export let disabled = false;

  /**
   * see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
   */
  export let min: number | undefined = undefined;
  /**
   * see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
   */
  export let max: number | undefined = undefined;
  /**
   * see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
   */
  export let step: number | undefined = undefined;

  $: placeholder = placeholderProp ?? mask;

  const settingsClasses = getComponentClasses('Input');

  let isFocused = false;

  const dispatch = createEventDispatcher();

  let backspace = false;

  $: replaceSet = new Set(replace); // Set of characters to replace
  $: prev = ((j) => Array.from(mask ?? '', (c, i) => (replaceSet.has(c) ? (j = i + 1) : j)))(0);
  $: firstPlaceholderPos = [...(mask ?? '')].findIndex((c) => replaceSet.has(c));
  $: acceptRegEx = accept instanceof RegExp ? accept : new RegExp(accept, 'g');

  function clean(inputValue: string) {
    // Get only accepted characters (no mask)
    const inputMatch = inputValue?.match(acceptRegEx) || [];

    if (inputMatch.length === 0) {
      return [];
    }

    // Apply mask to input
    return Array.from(mask, (maskChar) => {
      // If input character matches mask, or aligns with replacement placeholders
      if (inputMatch[0] === maskChar || replaceSet.has(maskChar)) {
        return inputMatch.shift() ?? maskChar;
      } else {
        return maskChar;
      }
    });
  }

  function onInput(e: Event & { currentTarget: HTMLInputElement }) {
    const el = e.currentTarget;
    applyMask(el, mask);
    dispatch('change', { value });
  }

  function applyMask(el: HTMLInputElement, mask: string) {
    if (mask) {
      // For selection (including just cursor position), ...
      const [i, j] = [el.selectionStart, el.selectionEnd].map((i) => {
        i = clean(el.value.slice(0, i ?? undefined)).findIndex((c) => replaceSet.has(c));
        return i < 0 ? prev[prev.length - 1] : backspace ? prev[i - 1] || firstPlaceholderPos : i;
      });
      value = clean(el.value).join('');
      el.value = value;
      el.setSelectionRange(i, j);
      backspace = false;
    } else {
      value = el.value;
    }
  }

  $: if (inputEl) applyMask(inputEl, mask);

  onMount(() => {
    // Format on initial to handle partial values as well as different (but compatible) formats (ex. phone numbers)
    if (mask) {
      const initialValue = value;
      value = clean(value).join('');
      if (value != initialValue) {
        dispatch('change', { value });
      }
    }
  });
</script>

<input
  {id}
  {type}
  {name}
  {value}
  {min}
  {max}
  {step}
  {inputmode}
  placeholder={isFocused && mask ? mask : placeholder}
  {required}
  {disabled}
  {autocapitalize}
  bind:this={inputEl}
  on:keydown={(e) => (backspace = e.key === 'Backspace')}
  on:keydown
  on:keyup
  on:keypress
  on:input={onInput}
  on:input
  on:focus={(e) => {
    isFocused = true;
  }}
  on:focus
  on:blur={(e) => {
    isFocused = false;

    // TODO: Consider clearing value if any mask is still shown?
    // TODO: Dispatch blur as well to allow DateField/etc to do the same if no value is set?
    if (value === mask) {
      value = '';
    }
    dispatch('blur', e);
  }}
  on:blur
  use:multi={actions}
  {...$$restProps}
  class={cls(
    'Input',
    'text-sm w-full outline-none bg-transparent placeholder-surface/50 selection:bg-surface-content/10',
    mask && (mask == placeholder || isFocused || value) && 'font-mono',
    settingsClasses.root,
    className
  )}
/>

<style>
  /* Hide +/- buttons */
  input[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
</style>
