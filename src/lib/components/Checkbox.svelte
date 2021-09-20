<script lang="ts">
  /*
    TODO:
			- [ ] change color
      - [ ] bind:group (array of values)
        - Smelte
          - https://github.com/matyunya/smelte/blob/2bdabb642fbba956757a7bec5a5896fc356ed51e/src/components/Checkbox/Checkbox.svelte#L24
          - https://github.com/matyunya/smelte/pull/184
          - https://svelte.dev/repl/1565708677134e418e256234984d90ef?version=3.29.0
        - svelte-mui
          - https://github.com/vikignt/svelte-mui/blob/master/src/Checkbox.svelte
          - https://svelte-mui.now.sh/checkbox/checkbox-group
        - Svelte Material UI
          - https://sveltematerialui.com/demo/checkbox
          - https://github.com/hperrin/svelte-material-ui/blob/master/packages/checkbox/Checkbox.svelte
      - [ ] use:draw
  */

  import { createEventDispatcher } from 'svelte';
  import clsx from 'clsx';
  import { mdiCheck, mdiMinus } from '@mdi/js';

  import Icon from './Icon.svelte';
  import Stack from './Stack.svelte';

  export let value: any = undefined;
  export let checked: boolean = false;
  export let indeterminate: boolean = false;
  export let disabled: boolean = false;
  export let circle: boolean = false;
  export let dense: boolean = false;
  export let inline: boolean = false;

  const dispatch = createEventDispatcher();

  function onClick(e: MouseEvent) {
    if (disabled) return;
    checked = !checked;
    dispatch('change', checked);
  }
</script>

<div
  class={clsx(
    inline ? 'inline-flex' : 'flex',
    'items-center',
    disabled ? 'opacity-50' : 'cursor-pointer',
    $$props.class
  )}
  on:click={onClick}
>
  <input type="checkbox" bind:checked class="hidden" on:change {value} />
  <Stack stack inline>
    <div
      class={clsx(
        'overlay',
        'bg-black/10 rounded-full w-10 h-10 opacity-0',
        dense && 'w-6 h-6',
        !disabled && 'hover:opacity-100'
      )}
    />

    <div
      class={clsx(
        'box',
        'w-5 h-5 pointer-events-none',
        checked ? 'bg-accent-500' : 'border-2 border-gray-500',
        checked && disabled && 'bg-gray-500',
        dense && 'w-4 h-4',
        circle ? 'rounded-full' : 'rounded'
      )}
    />

    <Icon
      path={indeterminate ? mdiMinus : mdiCheck}
      class={clsx(
        'pointer-events-none text-white transition-transform',
        checked ? 'scale-100' : 'scale-0'
      )}
      size={dense ? '1em' : '1.2em'}
    />
  </Stack>
  <slot />
</div>
