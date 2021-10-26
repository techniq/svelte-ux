<script lang="ts">
  /*
    TODO:
      - [ ] Show remaining mask as separate element under input (instead of input.value)
        - Set opacity to match TextField placeholder (30%)
        - Replace completed slots as spaces (for spacing)
  */
  import { createEventDispatcher, onMount } from 'svelte';

  export let value = '';
  export let mask: string;
  export let replace = '_';
  export let accept = '\\d';
  export let id = undefined;

  const dispatch = createEventDispatcher();

  let backspace = false;

  const replaceSet = new Set(replace); // Set of characters to replace

  // For each character in mask, if character marked for replacement
  const prev = ((j) => Array.from(mask, (c, i) => (replaceSet.has(c) ? (j = i + 1) : j)))(0);
  const firstPlaceholderPos = [...mask].findIndex((c) => replaceSet.has(c));
  const acceptRegEx = new RegExp(accept, 'g');

  function clean(inputValue) {
    // Get only accepted characters (no mask)
    const inputOnly = inputValue.match(acceptRegEx) || [];

    if (inputOnly.length === 0) {
      return [];
    }

    // Apply mask to input
    return Array.from(mask, (maskChar) => {
      // If input character matches mask, or aligns with replacement placeholders
      if (inputOnly[0] === maskChar || replaceSet.has(maskChar)) {
        return inputOnly.shift() ?? maskChar;
      } else {
        return maskChar;
      }
    });
  }

  function onInput(e: Event & { currentTarget: HTMLInputElement }) {
    const el = e.currentTarget;

    // For selection (including just cursor position),
    const [i, j] = [el.selectionStart, el.selectionEnd].map((i) => {
      i = clean(el.value.slice(0, i)).findIndex((c) => replaceSet.has(c));
      return i < 0 ? prev[prev.length - 1] : backspace ? prev[i - 1] || firstPlaceholderPos : i;
    });
    value = clean(el.value).join('');
    el.value = value;
    el.setSelectionRange(i, j);
    backspace = false;

    dispatch('change', { value });
  }

  // Format on initial to handle partial values as well as different (but compatible) formats (ex. phone numbers)
  onMount(() => {
    const initialValue = value;
    value = clean(value).join('');
    if (value != initialValue) {
      // console.log('change', { initialValue, value });
      dispatch('change', { value });
    }
  });
</script>

<input
  {value}
  placeholder={mask}
  on:keydown={(e) => (backspace = e.key === 'Backspace')}
  on:input={onInput}
  on:blur={() => {
    // TODO: Consider clearing value if any mask is still shown?
    // TODO: Dispatch blur as well to allow DateField/etc to do the same if no value is set?
    if (value === mask) {
      value = '';
    }
  }}
  class="font-mono text-sm w-full outline-none bg-transparent selection:bg-gray-500/30"
  {id}
/>
