<script lang="ts">
  /*
    TODO:
      - [ ] change color
  */

  import { createEventDispatcher } from 'svelte';
  import clsx from 'clsx';
  import { mdiCircleMedium } from '@mdi/js';

  import Icon from './Icon.svelte';
  import Stack from './Stack.svelte';

  export let group: any = undefined;
  export let value: any = undefined;
  export let disabled: boolean = false;
  export let checked: boolean = false;
  export let dense: boolean = false;

  const dispatch = createEventDispatcher();

  function onClick(e: MouseEvent) {
    if (disabled) return;
    group = value;
    dispatch('change', value);
  }

  $: checked = group !== undefined ? group === value : checked;
</script>

<div
  class={clsx(
    'inline-flex items-center',
    disabled ? 'opacity-50' : 'cursor-pointer',
    $$props.class
  )}
  on:click={onClick}
>
  <input type="radio" bind:group class="hidden" on:change {value} {checked} />
  <Stack stack inline>
    <div
      class={clsx(
        'overlay',
        'bg-black/10 rounded-full opacity-0',
        dense ? 'w-6 h-6' : 'w-10 h-10',
        !disabled && 'hover:opacity-100'
      )}
    />

    <div
      class={clsx(
        'box',
        'rounded-full bg-white border-2 pointer-events-none',
        checked && !disabled ? 'border-accent-500' : 'border-gray-500',
        dense ? 'w-4 h-4' : 'w-5 h-5'
      )}
    />

    <Icon
      path={mdiCircleMedium}
      size={dense ? '1.5em' : '2em'}
      class={clsx(
        'pointer-events-none transition-transform',
        disabled ? 'text-gray-500' : 'text-accent-500',
        checked ? 'scale-100' : 'scale-0'
      )}
    />
  </Stack>

  <slot />
</div>
