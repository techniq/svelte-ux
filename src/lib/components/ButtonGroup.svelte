<script lang="ts">
  import { ComponentProps, setContext } from 'svelte';
  import { cls } from '../utils/styles';
  import type Button from './Button.svelte';

  export let variant: ComponentProps<Button>['variant'] = 'text';
  export let color: ComponentProps<Button>['color'] | undefined = undefined;
  export let disabled: boolean = false;

  $: _class = cls(
    'button-group',
    'flex',
    variant, // used for per-variant group overrides in `style`
    disabled && 'opacity-50 pointer-events-none',
    $$props.class
  );

  setContext('ButtonGroup', {
    variant,
    color,
  });
</script>

<div role="group" class={_class}>
  <slot />
</div>

<style lang="postcss">
  /* Sets if button is first/last, or if child of element that is first/last (ex. wrapped in span for menu/tooltip/etc)

  /* `variant="outlined" */
  .outlined :global(button:not(:first-child)),
  .outlined :global(:not(:first-child) button) {
    @apply rounded-l-none border-l-0;
  }
  .outlined :global(button:not(:last-child)),
  .outlined :global(:not(:last-child) button) {
    @apply rounded-r-none;
  }

  /* `variant="filled" */
  .filled :global(button:not(:first-child)),
  .filled :global(:not(:first-child) button) {
    @apply rounded-l-none ml-px;
  }
  .filled :global(button:not(:last-child)),
  .filled :global(:not(:last-child) button) {
    @apply rounded-r-none;
  }
</style>
