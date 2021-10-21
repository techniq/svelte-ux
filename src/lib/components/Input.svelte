<script lang="ts">
  /*
    TODO:
      - [ ] Show remaining mask as separate element under input (instead of input.value)
        - Set opacity to match TextField placeholder (30%)
        - Replace completed slots as spaces (for spacing)
  */
  import { createEventDispatcher } from 'svelte';

  export let value = '';
  export let mask: string;
  export let replace = '_';
  export let accept = '\\d';
  export let id = undefined;

  const dispatch = createEventDispatcher();

  let back = false;

  const replaceSet = new Set(replace);
  const prev = ((j) => Array.from(mask, (c, i) => (replaceSet.has(c) ? (j = i + 1) : j)))(0);
  const first = [...mask].findIndex((c) => replaceSet.has(c));
  const acceptRegEx = new RegExp(accept, 'g');

  function clean(input) {
    input = input.match(acceptRegEx) || [];
    return Array.from(mask, (c) => (input[0] === c || replaceSet.has(c) ? input.shift() || c : c));
  }

  function onInput(e) {
    const el = e.target;

    const [i, j] = [el.selectionStart, el.selectionEnd].map((i) => {
      i = clean(el.value.slice(0, i)).findIndex((c) => replaceSet.has(c));
      return i < 0 ? prev[prev.length - 1] : back ? prev[i - 1] || first : i;
    });
    value = clean(el.value).join('');
    el.value = value;
    el.setSelectionRange(i, j);
    back = false;

    dispatch('change', { value });
  }
</script>

<input
  {value}
  placeholder={mask}
  on:keydown={(e) => (back = e.key === 'Backspace')}
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
