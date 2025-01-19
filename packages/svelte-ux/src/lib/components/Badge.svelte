<script lang="ts">
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let value = $$slots.value ? 1 : 0;
  export let small = false;
  export let circle = false;
  export let dot = false;
  let className: string | undefined = undefined;
  export { className as class };

  export let placement: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';

  const settingsClasses = getComponentClasses('Badge');
</script>

<div class="inline-grid grid-stack">
  <slot />
  <div
    class={cls(
      'Badge',
      'rounded-full flex items-center justify-center transform transition-transform',

      !$$slots.value && 'bg-primary text-primary-content',

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
      },
      settingsClasses.root,
      className
    )}
  >
    <slot name="value">
      {#if !dot}
        {value || ''}
      {/if}
    </slot>
  </div>
</div>
