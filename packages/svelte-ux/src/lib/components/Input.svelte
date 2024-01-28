<script lang="ts">
  /*
    TODO:
      - [ ] Show remaining mask as separate element under input (instead of input.value)
        - Set opacity to match TextField placeholder (30%)
        - Replace completed slots as spaces (for spacing)
  */
  import { createEventDispatcher, onMount } from 'svelte';
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

  import { multi } from '../actions/multi';
  import type { Actions } from '../actions/multi';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let value = '';
  export let type: HTMLInputTypeAttribute = 'text';
  export let inputmode: HTMLInputAttributes['inputmode'] | undefined = undefined;
  export let id: string | undefined = undefined;
  export let actions: Actions<HTMLInputElement | HTMLTextAreaElement> | undefined = undefined;
  export let inputEl: HTMLInputElement | null = null;
  export let autocapitalize: HTMLInputAttributes['autocapitalize'] = undefined;

  export let mask = '';
  export let replace = '_';
  export let accept: string | RegExp = '\\d';
  export let placeholder = mask;
  export let disabled = false;

  const theme = getComponentTheme('Input');

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

    dispatch('change', { value });
  }

  onMount(() => {
    // Format on initial to handle partial values as well as different (but compatible) formats (ex. phone numbers)
    if (mask) {
      const initialValue = value;
      value = clean(value).join('');
      if (value != initialValue) {
        // console.log('change', { initialValue, value });
        dispatch('change', { value });
      }
    }
  });
</script>

<input
  {id}
  {value}
  {type}
  {inputmode}
  placeholder={isFocused && mask ? mask : placeholder}
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
    'text-sm w-full outline-none bg-transparent selection:bg-gray-500/30',
    mask && (mask == placeholder || isFocused || value) && 'font-mono',
    theme.root,
    $$props.class
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
