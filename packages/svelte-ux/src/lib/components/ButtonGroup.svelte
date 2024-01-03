<script lang="ts" context="module">
  import { type ComponentProps, setContext, getContext } from 'svelte';
  import type Button from './Button.svelte';
  import type { ThemeColors } from '$lib/types';

  // TODO: Use `ButtonProps['...']` if can work around circular reference (Button <-> ButtonGroup)
  type ButtonProps = ComponentProps<Button>;
  type ButtonGroupContext = {
    variant:
      | 'default'
      | 'outline'
      | 'fill'
      | 'fill-outline'
      | 'fill-light'
      | 'text'
      | 'none'
      | undefined; // ButtonProps['variant'];
    size: 'sm' | 'md' | 'lg' | undefined; //ButtonProps['size'];
    color: ThemeColors | 'default' | undefined; //ButtonProps['color'];
    rounded: boolean | 'full' | undefined; // ButtonProps['rounded']
  };

  const buttonGroupKey = Symbol();

  export function setButtonGroup(value: ButtonGroupContext | undefined) {
    setContext(buttonGroupKey, value);
  }

  export function getButtonGroup() {
    return getContext<ButtonGroupContext | undefined>(buttonGroupKey);
  }
</script>

<script lang="ts">
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let variant: ComponentProps<Button>['variant'] = undefined;
  export let size: ComponentProps<Button>['size'] | undefined = undefined;
  export let color: ComponentProps<Button>['color'] | undefined = undefined;
  export let rounded: ComponentProps<Button>['rounded'] | undefined = undefined;
  export let disabled: boolean = false;

  const theme = getComponentTheme('ButtonGroup');

  $: _class = cls(
    'ButtonGroup',
    'inline-flex',
    disabled && 'opacity-50 pointer-events-none',
    `variant-${variant}`, // used for per-variant group overrides in `style`

    /* Remove left/right rounding if Button is not first/last, or if is a child of an element that is first/last (ex. wrapped in span for menu/tooltip/etc) */
    '[&_.Button:not(:first-child)]:rounded-l-none',
    '[&_.Button:not(:last-child)]:rounded-r-none',
    '[&_:not(:first-child)_.Button]:rounded-l-none',
    '[&_:not(:last-child)_.Button]:rounded-r-none',

    /* Overlap borders to allow selection styling per Button.  Should be used with z-index */
    '[&.variant-outline_.Button:not(:first-child)]:-ml-px',
    '[&.variant-outline_:not(:first-child)_.Button]:-ml-px',
    '[&.variant-fill-outline_.Button:not(:first-child)]:-ml-px',
    '[&.variant-fill-outline_:not(:first-child)_.Button]:-ml-px',

    /* Add gap between buttons (default, filled) */
    '[&.variant-default_.Button:not(:first-child)]:ml-px',
    '[&.variant-default_:not(:first-child)_.Button]:ml-px',
    '[&.variant-fill_.Button:not(:first-child)]:ml-px',
    '[&.variant-fill_:not(:first-child)_.Button]:ml-px',
    '[&.variant-fill-light_.Button:not(:first-child)]:ml-px',
    '[&.variant-fill-light_:not(:first-child)_.Button]:ml-px',

    theme.root,
    $$props.class
  );

  setButtonGroup({
    variant,
    size,
    color,
    rounded,
  });
</script>

<div role="group" class={_class} on:keydown on:keyup on:keypress on:click>
  <slot />
</div>
