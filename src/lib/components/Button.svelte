<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { slide } from 'svelte/transition';

  import Icon from './Icon.svelte';
  import ProgressCircle from './ProgressCircle.svelte';
  import { cls } from '../utils/styles';
  import { multi } from '../actions/multi';
  import type { Actions } from '../actions/multi';
  import type { TailwindColors } from '$lib/types';
  import { getComponentTheme } from './theme';
  import { getButtonGroup } from './ButtonGroup.svelte';

  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let fullWidth: boolean = false;
  export let icon: ComponentProps<Icon>['data'] | ComponentProps<Icon> | undefined = undefined;
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
    | 'none'
    | undefined = undefined; // default in reactive groupContext below
  export let size: 'sm' | 'md' | 'lg' = undefined; // default in reactive groupContext below
  export let color: TailwindColors | 'default' | undefined = undefined; // default in reactive groupContext below

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
    'transition duration-200 ring-black/20',
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
          }[size]
        : {
            sm: 'text-xs px-2 py-1',
            md: 'text-sm px-4 py-2',
            lg: 'text-base px-6 py-3',
          }[size],
    ],
    disabled && 'opacity-50 pointer-events-none',
    // Variant specific styles
    `variant-${variant}`,
    {
      default: '',
      outline: 'border',
      fill: '',
      'fill-outline': 'border',
      'fill-light': '',
      none: '',
    }[variant ?? 'none'],
    // Variant specific colors
    {
      default: {
        default: 'hover:bg-black/5',
        accent: 'text-accent-500 hover:bg-accent-500/10',
        red: 'text-red-500 hover:bg-red-500/10',
        orange: 'text-orange-500 hover:bg-orange-500/10',
        amber: 'text-amber-500 hover:bg-amber-500/10',
        yellow: 'text-yellow-500 hover:bg-yellow-500/10',
        lime: 'text-lime-500 hover:bg-lime-500/10',
        green: 'text-green-500 hover:bg-green-500/10',
        emerald: 'text-emerald-500 hover:bg-emerald-500/10',
        teal: 'text-teal-500 hover:bg-teal-500/10',
        cyan: 'text-cyan-500 hover:bg-cyan-500/10',
        sky: 'text-sky-500 hover:bg-sky-500/10',
        blue: 'text-blue-500 hover:bg-blue-500/10',
        indigo: 'text-indigo-500 hover:bg-indigo-500/10',
        violet: 'text-violet-500 hover:bg-violet-500/10',
        purple: 'text-purple-500 hover:bg-purple-500/10',
        fuchsia: 'text-fuchsia-500 hover:bg-fuchsia-500/10',
        pink: 'text-pink-500 hover:bg-pink-500/10',
        rose: 'text-rose-500 hover:bg-rose-500/10',
        gray: 'text-gray-500 hover:bg-gray-500/10',
      },
      outline: {
        default: 'bg-white hover:bg-black/5',
        accent: 'text-accent-500 border-accent-500 hover:bg-accent-500/10',
        red: 'text-red-500 border-red-500 hover:bg-red-500/10',
        orange: 'text-orange-500 border-orange-500 hover:bg-orange-500/10',
        amber: 'text-amber-500 border-amber-500 hover:bg-amber-500/10',
        yellow: 'text-yellow-500 border-yellow-500 hover:bg-yellow-500/10',
        lime: 'text-lime-500 border-lime-500 hover:bg-lime-500/10',
        green: 'text-green-500 border-green-500 hover:bg-green-500/10',
        emerald: 'text-emerald-500 border-emerald-500 hover:bg-emerald-500/10',
        teal: 'text-teal-500 border-teal-500 hover:bg-teal-500/10',
        cyan: 'text-cyan-500 border-cyan-500 hover:bg-cyan-500/10',
        sky: 'text-sky-500 border-sky-500 hover:bg-sky-500/10',
        blue: 'text-blue-500 border-blue-500 hover:bg-blue-500/10',
        indigo: 'text-indigo-500 border-indigo-500 hover:bg-indigo-500/10',
        violet: 'text-violet-500 border-violet-500 hover:bg-violet-500/10',
        purple: 'text-purple-500 border-purple-500 hover:bg-purple-500/10',
        fuchsia: 'text-fuchsia-500 border-fuchsia-500 hover:bg-fuchsia-500/10',
        pink: 'text-pink-500 border-pink-500 hover:bg-pink-500/10',
        rose: 'text-rose-500 border-rose-500 hover:bg-rose-500/10',
        gray: 'text-gray-500 border-gray-500 hover:bg-gray-500/10',
      },
      fill: {
        default: 'text-black bg-black/5 hover:bg-black/10',
        accent: 'text-white bg-accent-500 hover:bg-accent-600',
        red: 'text-white bg-red-500 hover:bg-red-600',
        orange: 'text-white bg-orange-500 hover:bg-orange-600',
        amber: 'text-white bg-amber-500 hover:bg-amber-600',
        yellow: 'text-white bg-yellow-500 hover:bg-yellow-600',
        lime: 'text-white bg-lime-500 hover:bg-lime-600',
        green: 'text-white bg-green-500 hover:bg-green-600',
        emerald: 'text-white bg-emerald-500 hover:bg-emerald-600',
        teal: 'text-white bg-teal-500 hover:bg-teal-600',
        cyan: 'text-white bg-cyan-500 hover:bg-cyan-600',
        sky: 'text-white bg-sky-500 hover:bg-sky-600',
        blue: 'text-white bg-blue-500 hover:bg-blue-600',
        indigo: 'text-white bg-indigo-500 hover:bg-indigo-600',
        violet: 'text-white bg-violet-500 hover:bg-violet-600',
        purple: 'text-white bg-purple-500 hover:bg-purple-600',
        fuchsia: 'text-white bg-fuchsia-500 hover:bg-fuchsia-600',
        pink: 'text-white bg-pink-500 hover:bg-pink-600',
        rose: 'text-white bg-rose-500 hover:bg-rose-600',
        gray: 'text-white bg-gray-500 hover:bg-gray-600',
      },
      'fill-light': {
        default: 'text-black bg-black/5 hover:bg-black/10',
        accent: 'text-accent-500 bg-accent-500/10 hover:bg-accent-500/20',
        red: 'text-red-500 bg-red-500/10 hover:bg-red-500/20',
        orange: 'text-orange-500 bg-orange-500/10 hover:bg-orange-500/20',
        amber: 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20',
        yellow: 'text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20',
        lime: 'text-lime-500 bg-lime-500/10 hover:bg-lime-500/20',
        green: 'text-green-500 bg-green-500/10 hover:bg-green-500/20',
        emerald: 'text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20',
        teal: 'text-teal-500 bg-teal-500/10 hover:bg-teal-500/20',
        cyan: 'text-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20',
        sky: 'text-sky-500 bg-sky-500/10 hover:bg-sky-500/20',
        blue: 'text-blue-500 bg-blue-500/10 hover:bg-blue-500/20',
        indigo: 'text-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20',
        violet: 'text-violet-500 bg-violet-500/10 hover:bg-violet-500/20',
        purple: 'text-purple-500 bg-purple-500/10 hover:bg-purple-500/20',
        fuchsia: 'text-fuchsia-500 bg-fuchsia-500/10 hover:bg-fuchsia-500/20',
        pink: 'text-pink-500 bg-pink-500/10 hover:bg-pink-500/20',
        rose: 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20',
        gray: 'text-gray-500 bg-gray-500/10 hover:bg-gray-500/20',
      },
      'fill-outline': {
        default: 'text-black bg-black/5 hover:bg-black/10 border-black/20',
        accent: 'text-accent-500 border-accent-500 bg-accent-500/10 hover:bg-accent-500/20',
        red: 'text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20',
        orange: 'text-orange-500 border-orange-500 bg-orange-500/10 hover:bg-orange-500/20',
        amber: 'text-amber-500 border-amber-500 bg-amber-500/10 hover:bg-amber-500/20',
        yellow: 'text-yellow-500 border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20',
        lime: 'text-lime-500 border-lime-500 bg-lime-500/10 hover:bg-lime-500/20',
        green: 'text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20',
        emerald: 'text-emerald-500 border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20',
        teal: 'text-teal-500 border-teal-500 bg-teal-500/10 hover:bg-teal-500/20',
        cyan: 'text-cyan-500 border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20',
        sky: 'text-sky-500 border-sky-500 bg-sky-500/10 hover:bg-sky-500/20',
        blue: 'text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20',
        indigo: 'text-indigo-500 border-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20',
        violet: 'text-violet-500 border-violet-500 bg-violet-500/10 hover:bg-violet-500/20',
        purple: 'text-purple-500 border-purple-500 bg-purple-500/10 hover:bg-purple-500/20',
        fuchsia: 'text-fuchsia-500 border-fuchsia-500 bg-fuchsia-500/10 hover:bg-fuchsia-500/20',
        pink: 'text-pink-500 border-pink-500 bg-pink-500/10 hover:bg-pink-500/20',
        rose: 'text-rose-500 border-rose-500 bg-rose-500/10 hover:bg-rose-500/20',
        gray: 'text-gray-500 border-gray-500 bg-gray-500/10 hover:bg-gray-500/20',
      },
      none: {},
    }[variant ?? 'none']?.[color ?? 'default'],
    theme.root,
    classes.root,
    $$props.class
  );
</script>

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
>
  {#if loading}
    <span transition:slide|local={{ axis: 'x', duration: 200 }}>
      <ProgressCircle size={16} width={2} class={cls(theme.loading, classes.loading)} />
    </span>
  {:else if icon}
    <span in:slide|local={{ axis: 'x', duration: 200 }}>
      {#if typeof icon === 'string' || 'icon' in icon}
        <!-- font path/url/etc or font-awesome IconDefinition -->
        <Icon data={icon} class={cls('pointer-events-none', theme.icon, classes.icon)} />
      {:else}
        <Icon class={cls('pointer-events-none', theme.icon, classes.icon)} {...icon} />
      {/if}
    </span>
  {/if}

  <slot />
</svelte:element>
