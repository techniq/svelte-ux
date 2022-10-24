<script lang="ts">
  import clsx from 'clsx';
  import { uniqueId } from '$lib/utils/string';

  export let id: string = uniqueId('switch_');
  export let value: any = undefined;
  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let size: 'sm' | 'md' | 'lg' = 'lg';
</script>

<div class="inline-block">
  <input
    {id}
    type="checkbox"
    bind:checked
    on:change
    {value}
    class="peer appearance-none inline"
    {disabled}
  />

  <label
    for={id}
    class={clsx(
      'switch',
      'border rounded-full flex align-items p-[3px]',
      {
        'w-6 h-4': size === 'sm',
        'w-8 h-5': size === 'md',
        'w-10 h-6': size === 'lg',
      },
      checked ? 'bg-blue-400 border-blue-400' : 'bg-gray-300 border-gray-300',
      disabled
        ? 'opacity-50'
        : 'cursor-pointer peer-focus-visible:ring-2 ring-accent-400 ring-offset-1',

      $$props.class
    )}
  >
    <div
      class={clsx(
        'toggle w-1/2 h-full rounded-full transition-all duration-200 bg-white flex items-center justify-center transform',
        checked && 'translate-x-full'
      )}
    >
      <slot {checked} {value} />
    </div>
  </label>
</div>
