<script lang="ts">
  import { slide } from 'svelte/transition';

  import Icon from './Icon.svelte';
  import ProgressCircle from './ProgressCircle.svelte';
  import { cls } from '../utils/styles';
  import { multi } from '../actions/multi';
  import type { Actions } from '../actions/multi';
  import type { ThemeColors } from '$lib/types';
  import { getComponentTheme } from './theme';
  import { getButtonGroup } from './ButtonGroup.svelte';
  import { asIconData, type IconInput } from '$lib/utils/icons';

  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let fullWidth: boolean = false;
  export let icon: IconInput = undefined;
  export let iconOnly = icon !== undefined && $$slots.default !== true;
  export let actions: Actions<HTMLAnchorElement | HTMLButtonElement> | undefined = undefined;

  export let loading: boolean = false;
  export let disabled: boolean = false;
  export let rounded: boolean | 'full' | undefined = undefined; // default in reactive groupContext below
  export let variant:
    | 'default'
    | 'outline'
    | 'fill'
    | 'fill-outline'
    | 'fill-light'
    | 'text'
    | 'none'
    | undefined = undefined; // default in reactive groupContext below
  export let size: 'sm' | 'md' | 'lg' | undefined = undefined; // default in reactive groupContext below
  export let color: ThemeColors | 'default' | undefined = undefined; // default in reactive groupContext below

  /** @type {{root?: string, icon?: string, loading?: string}} */
  export let classes: {
    root?: string;
    icon?: string;
    loading?: string;
  } = {};
  const theme = getComponentTheme('Button');

  // Override default from `ButtonGroup` if set
  const groupContext = getButtonGroup();
  $: variant = variant ?? groupContext?.variant ?? 'default';
  $: size = size ?? groupContext?.size ?? 'md';
  $: color = color ?? groupContext?.color ?? 'default';
  $: rounded = rounded ?? groupContext?.rounded ?? (iconOnly ? 'full' : true);

  $: _class = cls(
    'Button',
    'transition duration-200 ring-surface-content/60',
    'focus:outline-none focus-visible:ring-1',
    fullWidth ? 'flex w-full' : 'inline-flex',
    loading ? 'gap-2' : 'gap-1',
    variant === 'none' || !rounded ? '' : rounded === 'full' ? 'rounded-full' : 'rounded',
    variant !== 'none' && [
      'items-center justify-center',
      'font-medium tracking-wider whitespace-nowrap',
      iconOnly
        ? {
            sm: 'text-xs p-1',
            md: 'text-sm p-2',
            lg: 'text-base p-3',
          }[size!]
        : {
            sm: 'text-xs px-2 py-1',
            md: 'text-sm px-4 py-2',
            lg: 'text-base px-6 py-3',
          }[size!],
    ],
    disabled && 'opacity-50 pointer-events-none',
    // Variant specific styles
    `variant-${variant}`,
    {
      default: '',
      outline: 'border focus-visible:ring-offset-1',
      fill: 'focus-visible:ring-offset-1',
      'fill-outline': 'border focus-visible:ring-offset-1',
      'fill-light': '',
      text: 'p-0',
      none: '',
    }[variant ?? 'none'],

    // Variant specific colors
    {
      default: {
        default: [
          'hover:[--bg-color:theme(colors.surface-content/10%)]',
          // '[--text-color:theme(colors.surface-content)]', // inherit
          '[--ring-color:theme(colors.surface-content/60%)]',
        ],
        primary: [
          'hover:[--bg-color:theme(colors.primary/10%)]',
          '[--text-color:theme(colors.primary)]',
          '[--ring-color:theme(colors.primary/60%)]',
        ],
        secondary: [
          'hover:[--bg-color:theme(colors.secondary/10%)]',
          '[--text-color:theme(colors.secondary)]',
          '[--ring-color:theme(colors.secondary/60%)]',
        ],
        accent: [
          'hover:[--bg-color:theme(colors.accent/10%)]',
          '[--text-color:theme(colors.accent)]',
          '[--ring-color:theme(colors.accent/60%)]',
        ],
        neutral: [
          'hover:[--bg-color:theme(colors.neutral/10%)]',
          '[--text-color:theme(colors.neutral)]',
          '[--ring-color:theme(colors.neutral/60%)]',
        ],
        info: [
          'hover:[--bg-color:theme(colors.info/10%)]',
          '[--text-color:theme(colors.info)]',
          '[--ring-color:theme(colors.info/60%)]',
        ],
        success: [
          'hover:[--bg-color:theme(colors.success/10%)]',
          '[--text-color:theme(colors.success)]',
          '[--ring-color:theme(colors.success/60%)]',
        ],
        warning: [
          'hover:[--bg-color:theme(colors.warning/10%)]',
          '[--text-color:theme(colors.warning)]',
          '[--ring-color:theme(colors.warning/60%)]',
        ],
        danger: [
          'hover:[--bg-color:theme(colors.danger/10%)]',
          '[--text-color:theme(colors.danger)]',
          '[--ring-color:theme(colors.danger/60%)]',
        ],
      },
      outline: {
        default: [
          'hover:[--bg-color:theme(colors.surface-content/10%)]',
          '[--border-color:theme(colors.surface-content)]',
          '[--text-color:theme(colors.surface-content)]',
          '[--ring-color:theme(colors.surface-content/60%)]',
        ],
        primary: [
          'hover:[--bg-color:theme(colors.primary/10%)]',
          '[--border-color:theme(colors.primary)]',
          '[--text-color:theme(colors.primary)]',
          '[--ring-color:theme(colors.primary/60%)]',
        ],
        secondary: [
          'hover:[--bg-color:theme(colors.secondary/10%)]',
          '[--border-color:theme(colors.secondary)]',
          '[--text-color:theme(colors.secondary)]',
          '[--ring-color:theme(colors.secondary/60%)]',
        ],
        accent: [
          'hover:[--bg-color:theme(colors.accent/10%)]',
          '[--border-color:theme(colors.accent)]',
          '[--text-color:theme(colors.accent)]',
          '[--ring-color:theme(colors.accent/60%)]',
        ],
        neutral: [
          'hover:[--bg-color:theme(colors.neutral/10%)]',
          '[--border-color:theme(colors.neutral)]',
          '[--text-color:theme(colors.neutral)]',
          '[--ring-color:theme(colors.neutral/60%)]',
        ],
        info: [
          'hover:[--bg-color:theme(colors.info/10%)]',
          '[--border-color:theme(colors.info)]',
          '[--text-color:theme(colors.info)]',
          '[--ring-color:theme(colors.info/60%)]',
        ],
        success: [
          'hover:[--bg-color:theme(colors.success/10%)]',
          '[--border-color:theme(colors.success)]',
          '[--text-color:theme(colors.success)]',
          '[--ring-color:theme(colors.success/60%)]',
        ],
        warning: [
          'hover:[--bg-color:theme(colors.warning/10%)]',
          '[--border-color:theme(colors.warning)]',
          '[--text-color:theme(colors.warning)]',
          '[--ring-color:theme(colors.warning/60%)]',
        ],
        danger: [
          'hover:[--bg-color:theme(colors.danger/10%)]',
          '[--border-color:theme(colors.danger)]',
          '[--text-color:theme(colors.danger)]',
          '[--ring-color:theme(colors.danger/60%)]',
        ],
      },
      fill: {
        default: [
          `[--bg-color:theme(colors.surface-300)]`,
          'hover:[--bg-color:color-mix(in_oklab,theme(colors.surface-300)_90%,black)]',
          '[--text-color:theme(colors.surface-content)]',
          '[--ring-color:theme(colors.surface-content/60%)]',
        ],
        primary: [
          `[--bg-color:theme(colors.primary)]`,
          'hover:[--bg-color:color-mix(in_oklab,theme(colors.primary)_90%,black)]',
          '[--text-color:theme(colors.primary-content)]',
          '[--ring-color:theme(colors.primary/60%)]',
        ],
        secondary: [
          '[--bg-color:theme(colors.secondary)]',
          'hover:[--bg-color:color-mix(in_oklab,theme(colors.secondary)_90%,black)]',
          '[--text-color:theme(colors.secondary-content)]',
          '[--ring-color:theme(colors.secondary/60%)]',
        ],
        accent: [
          '[--bg-color:theme(colors.accent)]',
          'hover:[--bg-color:color-mix(in_oklab,theme(colors.accent)_90%,black)]',
          '[--text-color:theme(colors.accent-content)]',
          '[--ring-color:theme(colors.accent/60%)]',
        ],
        neutral: [
          '[--bg-color:theme(colors.neutral)]',
          'hover:[--bg-color:color-mix(in_oklab,theme(colors.neutral)_90%,black)]',
          '[--text-color:theme(colors.neutral-content)]',
          '[--ring-color:theme(colors.neutral/60%)]',
        ],
        info: [
          `[--bg-color:theme(colors.info)]`,
          'hover:[--bg-color:color-mix(in_oklab,theme(colors.info)_90%,black)]',
          '[--text-color:theme(colors.info-content)]',
          '[--ring-color:theme(colors.info/60%)]',
        ],
        success: [
          `[--bg-color:theme(colors.success)]`,
          'hover:[--bg-color:color-mix(in_oklab,theme(colors.success)_90%,black)]',
          '[--text-color:theme(colors.success-content)]',
          '[--ring-color:theme(colors.success/60%)]',
        ],
        warning: [
          `[--bg-color:theme(colors.warning)]`,
          'hover:[--bg-color:color-mix(in_oklab,theme(colors.warning)_90%,black)]',
          '[--text-color:theme(colors.warning-content)]',
          '[--ring-color:theme(colors.warning/60%)]',
        ],
        danger: [
          `[--bg-color:theme(colors.danger)]`,
          'hover:[--bg-color:color-mix(in_oklab,theme(colors.danger)_90%,black)]',
          '[--text-color:theme(colors.danger-content)]',
          '[--ring-color:theme(colors.danger/60%)]',
        ],
      },
      'fill-light': {
        default: [
          '[--bg-color:theme(colors.surface-content/10%)]',
          'hover:[--bg-color:theme(colors.surface-content/20%)]',
          '[--text-color:theme(colors.surface-content)]',
          '[--ring-color:theme(colors.surface-content/60%)]',
        ],
        primary: [
          '[--bg-color:theme(colors.primary/10%)]',
          'hover:[--bg-color:theme(colors.primary/20%)]',
          '[--text-color:theme(colors.primary)]',
          '[--ring-color:theme(colors.primary/60%)]',
        ],
        secondary: [
          '[--bg-color:theme(colors.secondary/10%)]',
          'hover:[--bg-color:theme(colors.secondary/20%)]',
          '[--text-color:theme(colors.secondary)]',
          '[--ring-color:theme(colors.secondary/60%)]',
        ],
        accent: [
          '[--bg-color:theme(colors.accent/10%)]',
          'hover:[--bg-color:theme(colors.accent/20%)]',
          '[--text-color:theme(colors.accent)]',
          '[--ring-color:theme(colors.secondary/60%)]',
        ],
        neutral: [
          '[--bg-color:theme(colors.neutral/10%)]',
          'hover:[--bg-color:theme(colors.neutral/20%)]',
          '[--text-color:theme(colors.neutral)]',
          '[--ring-color:theme(colors.neutral/60%)]',
        ],
        info: [
          '[--bg-color:theme(colors.info/10%)]',
          'hover:[--bg-color:theme(colors.info/20%)]',
          '[--text-color:theme(colors.info)]',
          '[--ring-color:theme(colors.info/60%)]',
        ],
        success: [
          '[--bg-color:theme(colors.success/10%)]',
          'hover:[--bg-color:theme(colors.success/20%)]',
          '[--text-color:theme(colors.success)]',
          '[--ring-color:theme(colors.success/60%)]',
        ],
        warning: [
          '[--bg-color:theme(colors.warning/10%)]',
          'hover:[--bg-color:theme(colors.warning/20%)]',
          '[--text-color:theme(colors.warning)]',
          '[--ring-color:theme(colors.warning/60%)]',
        ],
        danger: [
          '[--bg-color:theme(colors.danger/10%)]',
          'hover:[--bg-color:theme(colors.danger/20%)]',
          '[--text-color:theme(colors.danger)]',
          '[--ring-color:theme(colors.danger/60%)]',
        ],
      },
      'fill-outline': {
        default: [
          '[--bg-color:theme(colors.surface-content/10%)]',
          'hover:[--bg-color:theme(colors.surface-content/20%)]',
          '[--border-color:theme(colors.surface-content)]',
          '[--text-color:theme(colors.surface-content)]',
          '[--ring-color:theme(colors.surface-content/60%)]',
        ],
        primary: [
          '[--bg-color:theme(colors.primary/10%)]',
          'hover:[--bg-color:theme(colors.primary/20%)]',
          '[--border-color:theme(colors.primary)]',
          '[--text-color:theme(colors.primary)]',
          '[--ring-color:theme(colors.primary/60%)]',
        ],
        secondary: [
          '[--bg-color:theme(colors.secondary/10%)]',
          'hover:[--bg-color:theme(colors.secondary/20%)]',
          '[--border-color:theme(colors.secondary)]',
          '[--text-color:theme(colors.secondary)]',
          '[--ring-color:theme(colors.secondary/60%)]',
        ],
        accent: [
          '[--bg-color:theme(colors.accent/10%)]',
          'hover:[--bg-color:theme(colors.accent/20%)]',
          '[--border-color:theme(colors.accent)]',
          '[--text-color:theme(colors.accent)]',
          '[--ring-color:theme(colors.accent/60%)]',
        ],
        neutral: [
          '[--bg-color:theme(colors.neutral/10%)]',
          'hover:[--bg-color:theme(colors.neutral/20%)]',
          '[--border-color:theme(colors.neutral)]',
          '[--text-color:theme(colors.neutral)]',
          '[--ring-color:theme(colors.neutral/60%)]',
        ],
        info: [
          '[--bg-color:theme(colors.info/10%)]',
          'hover:[--bg-color:theme(colors.info/20%)]',
          '[--border-color:theme(colors.info)]',
          '[--text-color:theme(colors.info)]',
          '[--ring-color:theme(colors.info/60%)]',
        ],
        success: [
          '[--bg-color:theme(colors.success/10%)]',
          'hover:[--bg-color:theme(colors.success/20%)]',
          '[--border-color:theme(colors.success)]',
          '[--text-color:theme(colors.success)]',
          '[--ring-color:theme(colors.success/60%)]',
        ],
        warning: [
          '[--bg-color:theme(colors.warning/10%)]',
          'hover:[--bg-color:theme(colors.warning/20%)]',
          '[--border-color:theme(colors.warning)]',
          '[--text-color:theme(colors.warning)]',
          '[--ring-color:theme(colors.warning/60%)]',
        ],
        danger: [
          '[--bg-color:theme(colors.danger/10%)]',
          'hover:[--bg-color:theme(colors.danger/20%)]',
          '[--border-color:theme(colors.danger)]',
          '[--text-color:theme(colors.danger)]',
          '[--ring-color:theme(colors.danger/60%)]',
        ],
      },
      text: {
        default: [
          '[--text-color:theme(colors.surface-content)]',
          'hover:[--text-color:color-mix(in_oklab,theme(colors.surface-content)_80%,black)]',
          '[--ring-color:theme(colors.surface-content/60%)]',
        ],
        primary: [
          '[--text-color:theme(colors.primary)]',
          'hover:[--text-color:color-mix(in_oklab,theme(colors.primary)_80%,black)]',
          '[--ring-color:theme(colors.primary/60%)]',
        ],
        secondary: [
          '[--text-color:theme(colors.secondary)]',
          'hover:[--text-color:color-mix(in_oklab,theme(colors.secondary)_80%,black)]',
          '[--ring-color:theme(colors.secondary/60%)]',
        ],
        accent: [
          '[--text-color:theme(colors.accent)]',
          'hover:[--text-color:color-mix(in_oklab,theme(colors.accent)_80%,black)]',
          '[--ring-color:theme(colors.accent/60%)]',
        ],
        neutral: [
          '[--text-color:theme(colors.neutral)]',
          'hover:[--text-color:color-mix(in_oklab,theme(colors.neutral)_80%,black)]',
          '[--ring-color:theme(colors.neutral/60%)]',
        ],
        info: [
          '[--text-color:theme(colors.info)]',
          'hover:[--text-color:color-mix(in_oklab,theme(colors.info)_80%,black)]',
          '[--ring-color:theme(colors.info/60%)]',
        ],
        success: [
          '[--text-color:theme(colors.success)]',
          'hover:[--text-color:color-mix(in_oklab,theme(colors.success)_80%,black)]',
          '[--ring-color:theme(colors.success/60%)]',
        ],
        warning: [
          '[--text-color:theme(colors.warning)]',
          'hover:[--text-color:color-mix(in_oklab,theme(colors.warning)_80%,black)]',
          '[--ring-color:theme(colors.warning/60%)]',
        ],
        danger: [
          '[--text-color:theme(colors.danger)]',
          'hover:[--text-color:color-mix(in_oklab,theme(colors.danger)_80%,black)]',
          '[--ring-color:theme(colors.danger/60%)]',
        ],
      },
      none: {
        default: '',
        primary: '',
        secondary: '',
        accent: '',
        neutral: '',
        info: '',
        success: '',
        warning: '',
        danger: '',
      },
    }[variant ?? 'none']?.[color ?? 'default'],

    // text color
    ['default', 'outline', 'fill', 'fill-outline', 'fill-light', 'text'].includes(
      variant ?? 'none'
    ) && 'text-[--text-color]',

    // background color
    ['default', 'outline', 'fill', 'fill-outline', 'fill-light'].includes(variant ?? 'none') &&
      'bg-[--bg-color] ',

    // border color
    ['outline', 'fill-outline'].includes(variant ?? 'none') && 'border-[--border-color]',

    // ring color
    ['default', 'outline', 'fill', 'fill-outline', 'fill-light', 'text'].includes(
      variant ?? 'none'
    ) && 'ring-[--ring-color]',

    theme.root,
    classes?.root,
    $$props.class
  );
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={href ? 'a' : 'button'}
  {href}
  {target}
  {type}
  {...$$restProps}
  class={_class}
  style={$$props.style ?? ''}
  {disabled}
  use:multi={actions}
  on:click
  on:mouseover
  on:mouseout
  on:focus
  on:blur
>
  {#if loading}
    <span transition:slide={{ axis: 'x', duration: 200 }}>
      <ProgressCircle size={16} width={2} class={cls(theme.loading, classes.loading)} />
    </span>
  {:else if icon}
    <span in:slide={{ axis: 'x', duration: 200 }}>
      {#if typeof icon === 'string' || 'icon' in icon}
        <!-- font path/url/etc or font-awesome IconDefinition -->
        <Icon
          data={asIconData(icon)}
          class={cls('pointer-events-none', theme.icon, classes.icon)}
        />
      {:else}
        <Icon class={cls('pointer-events-none', theme.icon, classes.icon)} {...icon} />
      {/if}
    </span>
  {/if}

  <slot />
</svelte:element>
