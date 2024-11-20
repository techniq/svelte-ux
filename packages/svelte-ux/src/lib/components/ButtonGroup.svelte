<script lang="ts" context="module">
  import { type ComponentProps, setContext, getContext } from 'svelte';
  import type Button from './Button.svelte';
  import type { ButtonColor, ButtonRounded, ButtonSize, ButtonVariant } from '../types/index.js';

  type ButtonGroupContext = {
    variant: ButtonVariant | undefined;
    size: ButtonSize | undefined;
    color: ButtonColor | undefined;
    rounded: ButtonRounded | undefined;
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
  import { cls } from '@layerstack/tailwind';
  import { getComponentSettings } from './settings.js';

  const { classes: settingsClasses, defaults } = getComponentSettings('ButtonGroup');

  export let variant: ComponentProps<Button>['variant'] = defaults.variant;
  export let size: ComponentProps<Button>['size'] | undefined = defaults.size;
  export let color: ComponentProps<Button>['color'] | undefined = defaults.color;
  export let rounded: ComponentProps<Button>['rounded'] | undefined = defaults.rounded;
  export let disabled: boolean = false;
  let className: string | undefined = undefined;
  export { className as class };

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

    settingsClasses.root,
    className
  );

  setButtonGroup({
    variant,
    size,
    color,
    rounded,
  });
</script>

<div role="group" class={_class} {...$$restProps}>
  <slot />
</div>
