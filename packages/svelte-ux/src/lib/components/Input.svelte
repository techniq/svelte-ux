<script lang="ts">
  /*
    TODO:
      - [ ] Show remaining mask as separate element under input (instead of input.value)
        - Set opacity to match TextField placeholder (30%)
        - Replace completed slots as spaces (for spacing)
  */
  import { onMount } from 'svelte';
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

  import { multi } from '../actions/multi.js';
  import type { Actions } from '../actions/multi.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';

  interface Props {
    name?: string;
    value?: string;
    type?: HTMLInputTypeAttribute;
    inputmode?: HTMLInputAttributes['inputmode'];
    id?: string;
    actions?: Actions<HTMLInputElement | HTMLTextAreaElement>;
    inputEl?: HTMLInputElement | null;
    autocapitalize?: HTMLInputAttributes['autocapitalize'];
    class?: string;
    mask?: string;
    replace?: string;
    accept?: string | RegExp;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    /**
     * see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
     */
    min?: number;
    /**
     * see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
     */
    max?: number;
    /**
     * see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
     */
    step?: number;
    onChange?: (value: string) => void;
    onBlur?: (event: FocusEvent) => void;
  }

  let {
    name = '',
    value = $bindable(''),
    type = 'text',
    inputmode,
    id,
    actions,
    inputEl = $bindable(null),
    autocapitalize,
    class: className,
    mask = '',
    replace = '_',
    accept = '\\d',
    placeholder: placeholderProp,
    required = false,
    disabled = false,
    min,
    max,
    step,
    onChange,
    onBlur,
    ...restProps
  }: Props & Omit<HTMLInputAttributes, keyof Props> = $props();

  let placeholder = $derived(placeholderProp ?? mask);

  const settingsClasses = getComponentClasses('Input');

  let isFocused = $state(false);

  let backspace = $state(false);

  let replaceSet = $derived(new Set(replace)); // Set of characters to replace
  let prev = $derived(
    ((j) => Array.from(mask ?? '', (c, i) => (replaceSet.has(c) ? (j = i + 1) : j)))(0)
  );
  let firstPlaceholderPos = $derived([...(mask ?? '')].findIndex((c) => replaceSet.has(c)));
  let acceptRegEx = $derived(accept instanceof RegExp ? accept : new RegExp(accept, 'g'));

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
    onChange?.(value);
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

  $effect(() => {
    if (inputEl) applyMask(inputEl, mask);
  });

  onMount(() => {
    // Format on initial to handle partial values as well as different (but compatible) formats (ex. phone numbers)
    if (mask) {
      const initialValue = value;
      value = clean(value).join('');
      if (value != initialValue) {
        onChange?.(value);
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
  onkeydown={(e) => {
    backspace = e.key === 'Backspace';
    restProps['onkeydown']?.(e);
  }}
  oninput={(e) => {
    onInput(e);
    restProps['oninput']?.(e);
  }}
  onfocus={(e) => {
    isFocused = true;
    restProps['onfocus']?.(e);
  }}
  onblur={(e) => {
    isFocused = false;

    // TODO: Consider clearing value if any mask is still shown?
    // TODO: Dispatch blur as well to allow DateField/etc to do the same if no value is set?
    if (value === mask) {
      value = '';
    }
    onBlur?.(e);
    restProps['onblur']?.(e);
  }}
  use:multi={actions}
  {...restProps}
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
