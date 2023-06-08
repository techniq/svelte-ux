<script lang="ts">
  import { cls } from '$lib/utils/styles';

  export let value: number | null;
  export let max: number | undefined = undefined;
</script>

<progress
  {value}
  {max}
  {...$$restProps}
  class={cls(
    'h-2 w-full',

    // bar color
    '[--color:theme(colors.accent.500)]',
    '[&::-webkit-progress-value]:bg-[--color]',
    '[&::-moz-progress-bar]:bg-[--color]',

    // track color
    '[--track-color:theme(colors.gray.100)]',
    '[&::-webkit-progress-bar]:bg-[--track-color]',
    'bg-[--track-color]',

    // rounded
    '[&::-webkit-progress-value]:rounded-full',
    '[&::-moz-progress-bar]:rounded-full',
    '[&::-webkit-progress-bar]:rounded-full',
    'rounded-full',

    $$props.class
  )}
/>
