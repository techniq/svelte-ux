<script lang="ts">
  import clsx from 'clsx';

  import Stack from './Stack.svelte';

  export let value: number = $$slots.value ? 1 : 0;
  export let small = false;
  export let circle = false;
  export let dot = false;

  export let placement: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';
</script>

<Stack stack inline>
  <slot />
  <div
    class={clsx(
      'rounded-full flex items-center justify-center transform transition-transform',

      !$$slots.value && 'bg-blue-500 text-white',

      {
        'self-start': placement.startsWith('top'),
        'self-end': placement.startsWith('bottom'),
        'justify-self-start': placement.endsWith('left'),
        'justify-self-end': placement.endsWith('right'),
      },

      dot
        ? {
            'h-2 w-2': small,
            'h-3 w-3': !small,
          }
        : {
            'h-4 w-4 text-[0.6rem]': small,
            'h-5 w-5 text-xs': !small,
          },

      dot
        ? {
            'translate-y-[40%]': small && placement.startsWith('top'),
            'translate-y-[-40%]': small && placement.startsWith('bottom'),
            'translate-x-[40%]': small && placement.endsWith('left'),
            'translate-x-[-40%]': small && placement.endsWith('right'),
            'translate-y-[10%]': !small && placement.startsWith('top'),
            'translate-y-[-10%]': !small && placement.startsWith('bottom'),
            'translate-x-[10%]': !small && placement.endsWith('left'),
            'translate-x-[-10%]': !small && placement.endsWith('right'),
          }
        : circle
        ? {
            'translate-y-[-10%]': small && placement.startsWith('top'),
            'translate-y-[10%]': small && placement.startsWith('bottom'),
            'translate-x-[-10%]': small && placement.endsWith('left'),
            'translate-x-[10%]': small && placement.endsWith('right'),
            'translate-y-[-20%]': !small && placement.startsWith('top'),
            'translate-y-[20%]': !small && placement.startsWith('bottom'),
            'translate-x-[-20%]': !small && placement.endsWith('left'),
            'translate-x-[20%]': !small && placement.endsWith('right'),
          }
        : {
            '-translate-y-1/3': placement.startsWith('top'),
            'translate-y-1/3': placement.startsWith('bottom'),
            '-translate-x-1/3': placement.endsWith('left'),
            'translate-x-1/3': placement.endsWith('right'),
          },

      {
        'scale-0': (value ?? 0) === 0,
        'scale-100': (value ?? 0) !== 0,
      }
    )}
  >
    <slot name="value">
      {#if !dot}
        {value || ''}
      {/if}
    </slot>
  </div>
</Stack>
