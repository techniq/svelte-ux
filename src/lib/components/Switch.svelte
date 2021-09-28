<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import clsx from 'clsx';

  export let value: any = undefined;
  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let id: string = undefined;
  export let size: 'sm' | 'md' | 'lg' = 'lg';

  const dispatch = createEventDispatcher();

  function onClick(e: MouseEvent) {
    // TODO: Find why to only stop propagation if passed to on:change listener
    e.stopPropagation();

    if (disabled) return;
    checked = !checked;
    dispatch('change', checked);
  }
</script>

<div
  class={clsx(
    'switch',
    'border rounded-full flex align-items p-[3px]',
    {
      'w-6 h-4': size === 'sm',
      'w-8 h-5': size === 'md',
      'w-10 h-6': size === 'lg',
    },
    disabled ? 'opacity-50' : 'cursor-pointer',
    checked ? 'bg-blue-400 border-blue-400' : 'bg-gray-300 border-gray-300',

    $$props.class
  )}
  on:click={onClick}
>
  <input type="checkbox" bind:checked class="hidden" on:change {value} {id} />
  <div
    class={clsx(
      'toggle w-1/2 h-full rounded-full transition-all duration-200 bg-white flex items-center justify-center transform',
      checked && 'translate-x-full'
    )}
  >
    <slot {checked} {value} />
  </div>
</div>
