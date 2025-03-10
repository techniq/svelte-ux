<script lang="ts">
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let value: number | null;
  export let max: number | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('Progress');
</script>

<progress
  {value}
  {max}
  {...$$restProps}
  class={cls(
    'Progress',
    'h-2 w-full',

    // bar color
    '[--color:var(--color-primary)]',
    '[&::-webkit-progress-value]:bg-[var(--color)]',
    '[&::-moz-progress-bar]:bg-[var(--color)]',

    // track color
    '[--track-color:var(--color-surface-200)]',
    '[&::-webkit-progress-bar]:bg-[var(--track-color)]',
    'bg-[var(--track-color)]',

    // rounded
    '[&::-webkit-progress-value]:rounded-full',
    '[&::-moz-progress-bar]:rounded-full',
    '[&::-webkit-progress-bar]:rounded-full',
    'rounded-full',

    settingsClasses.root,
    className
  )}
>
</progress>
