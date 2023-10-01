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
    | 'text'
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
        default: 'hover:bg-black/5 ring-black/10',
        accent: 'text-accent-500 hover:bg-accent-500/10 ring-accent-500/60',
        red: 'text-red-500 hover:bg-red-500/10 ring-red-500/60',
        orange: 'text-orange-500 hover:bg-orange-500/10 ring-orange-500/60',
        amber: 'text-amber-500 hover:bg-amber-500/10 ring-amber-500/60',
        yellow: 'text-yellow-500 hover:bg-yellow-500/10 ring-yellow-500/60',
        lime: 'text-lime-500 hover:bg-lime-500/10 ring-lime-500/60',
        green: 'text-green-500 hover:bg-green-500/10 ring-green-500/60',
        emerald: 'text-emerald-500 hover:bg-emerald-500/10 ring-emerald-500/60',
        teal: 'text-teal-500 hover:bg-teal-500/10 ring-teal-500/60',
        cyan: 'text-cyan-500 hover:bg-cyan-500/10 ring-cyan-500/60',
        sky: 'text-sky-500 hover:bg-sky-500/10 ring-sky-500/60',
        blue: 'text-blue-500 hover:bg-blue-500/10 ring-blue-500/60',
        indigo: 'text-indigo-500 hover:bg-indigo-500/10 ring-indigo-500/60',
        violet: 'text-violet-500 hover:bg-violet-500/10 ring-violet-500/60',
        purple: 'text-purple-500 hover:bg-purple-500/10 ring-purple-500/60',
        fuchsia: 'text-fuchsia-500 hover:bg-fuchsia-500/10 ring-fuchsia-500/60',
        pink: 'text-pink-500 hover:bg-pink-500/10 ring-pink-500/60',
        rose: 'text-rose-500 hover:bg-rose-500/10 ring-rose-500/60',
        gray: 'text-gray-500 hover:bg-gray-500/10 ring-gray-500/60',
      },
      outline: {
        default: 'bg-white hover:bg-black/5 ring-black/10',
        accent: 'text-accent-500 border-accent-500 hover:bg-accent-500/10 ring-accent-500/60',
        red: 'text-red-500 border-red-500 hover:bg-red-500/10 ring-red-500/60',
        orange: 'text-orange-500 border-orange-500 hover:bg-orange-500/10 ring-orange-500/60',
        amber: 'text-amber-500 border-amber-500 hover:bg-amber-500/10 ring-amber-500/60',
        yellow: 'text-yellow-500 border-yellow-500 hover:bg-yellow-500/10 ring-yellow-500/60',
        lime: 'text-lime-500 border-lime-500 hover:bg-lime-500/10 ring-lime-500/60',
        green: 'text-green-500 border-green-500 hover:bg-green-500/10 ring-green-500/60',
        emerald: 'text-emerald-500 border-emerald-500 hover:bg-emerald-500/10 ring-emerald-500/60',
        teal: 'text-teal-500 border-teal-500 hover:bg-teal-500/10 ring-teal-500/60',
        cyan: 'text-cyan-500 border-cyan-500 hover:bg-cyan-500/10 ring-cyan-500/60',
        sky: 'text-sky-500 border-sky-500 hover:bg-sky-500/10 ring-sky-500/60',
        blue: 'text-blue-500 border-blue-500 hover:bg-blue-500/10 ring-blue-500/60',
        indigo: 'text-indigo-500 border-indigo-500 hover:bg-indigo-500/10 ring-indigo-500/60',
        violet: 'text-violet-500 border-violet-500 hover:bg-violet-500/10 ring-violet-500/60',
        purple: 'text-purple-500 border-purple-500 hover:bg-purple-500/10 ring-purple-500/60',
        fuchsia: 'text-fuchsia-500 border-fuchsia-500 hover:bg-fuchsia-500/10 ring-fuchsia-500/60',
        pink: 'text-pink-500 border-pink-500 hover:bg-pink-500/10 ring-pink-500/60',
        rose: 'text-rose-500 border-rose-500 hover:bg-rose-500/10 ring-rose-500/60',
        gray: 'text-gray-500 border-gray-500 hover:bg-gray-500/10 ring-gray-500/60',
      },
      fill: {
        default: 'text-black bg-black/5 hover:bg-black/10 ring-black/10',
        accent: 'text-white bg-accent-500 hover:bg-accent-600 ring-accent-500/60',
        red: 'text-white bg-red-500 hover:bg-red-600 ring-red-500/60',
        orange: 'text-white bg-orange-500 hover:bg-orange-600 ring-orange-500/60',
        amber: 'text-white bg-amber-500 hover:bg-amber-600 ring-amber-500/60',
        yellow: 'text-white bg-yellow-500 hover:bg-yellow-600 ring-yellow-500/60',
        lime: 'text-white bg-lime-500 hover:bg-lime-600 ring-lime-500/60',
        green: 'text-white bg-green-500 hover:bg-green-600 ring-green-500/60',
        emerald: 'text-white bg-emerald-500 hover:bg-emerald-600 ring-emerald-500/60',
        teal: 'text-white bg-teal-500 hover:bg-teal-600 ring-teal-500/60',
        cyan: 'text-white bg-cyan-500 hover:bg-cyan-600 ring-cyan-500/60',
        sky: 'text-white bg-sky-500 hover:bg-sky-600 ring-sky-500/60',
        blue: 'text-white bg-blue-500 hover:bg-blue-600 ring-blue-500/60',
        indigo: 'text-white bg-indigo-500 hover:bg-indigo-600 ring-indigo-500/60',
        violet: 'text-white bg-violet-500 hover:bg-violet-600 ring-violet-500/60',
        purple: 'text-white bg-purple-500 hover:bg-purple-600 ring-purple-500/60',
        fuchsia: 'text-white bg-fuchsia-500 hover:bg-fuchsia-600 ring-fuchsia-500/60',
        pink: 'text-white bg-pink-500 hover:bg-pink-600 ring-pink-500/60',
        rose: 'text-white bg-rose-500 hover:bg-rose-600 ring-rose-500/60',
        gray: 'text-white bg-gray-500 hover:bg-gray-600 ring-gray-500/60',
      },
      'fill-light': {
        default: 'text-black bg-black/5 hover:bg-black/10 ring-black/20',
        accent:
          'text-accent-500 bg-accent-500/10 hover:bg-accent-500/20 ring-accent-400 ring-accent-500/60',
        red: 'text-red-500 bg-red-500/10 hover:bg-red-500/20 ring-red-500/60',
        orange: 'text-orange-500 bg-orange-500/10 hover:bg-orange-500/20 ring-orange-500/60',
        amber: 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 ring-amber-500/60',
        yellow: 'text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 ring-yellow-500/60',
        lime: 'text-lime-500 bg-lime-500/10 hover:bg-lime-500/20 ring-lime-500/60',
        green: 'text-green-500 bg-green-500/10 hover:bg-green-500/20 ring-green-500/60',
        emerald: 'text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 ring-emerald-500/60',
        teal: 'text-teal-500 bg-teal-500/10 hover:bg-teal-500/20 ring-teal-500/60',
        cyan: 'text-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 ring-cyan-500/60',
        sky: 'text-sky-500 bg-sky-500/10 hover:bg-sky-500/20 ring-sky-500/60',
        blue: 'text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 ring-blue-500/60',
        indigo: 'text-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20 ring-indigo-500/60',
        violet: 'text-violet-500 bg-violet-500/10 hover:bg-violet-500/20 ring-violet-500/60',
        purple: 'text-purple-500 bg-purple-500/10 hover:bg-purple-500/20 ring-purple-500/60',
        fuchsia: 'text-fuchsia-500 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 ring-fuchsia-500/60',
        pink: 'text-pink-500 bg-pink-500/10 hover:bg-pink-500/20 ring-pink-500/60',
        rose: 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 ring-rose-500/60',
        gray: 'text-gray-500 bg-gray-500/10 hover:bg-gray-500/20 ring-gray-500/60',
      },
      'fill-outline': {
        default: 'text-black bg-black/5 hover:bg-black/10 border-black/20 ring-black/10',
        accent:
          'text-accent-500 border-accent-500 bg-accent-500/10 hover:bg-accent-500/20 ring-accent-500/60',
        red: 'text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 ring-red-500/60',
        orange:
          'text-orange-500 border-orange-500 bg-orange-500/10 hover:bg-orange-500/20 ring-orange-500/60',
        amber:
          'text-amber-500 border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 ring-amber-500/60',
        yellow:
          'text-yellow-500 border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 ring-yellow-500/60',
        lime: 'text-lime-500 border-lime-500 bg-lime-500/10 hover:bg-lime-500/20 ring-lime-500/60',
        green:
          'text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 ring-green-500/60',
        emerald:
          'text-emerald-500 border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 ring-emerald-500/60',
        teal: 'text-teal-500 border-teal-500 bg-teal-500/10 hover:bg-teal-500/20 ring-teal-500/60',
        cyan: 'text-cyan-500 border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 ring-cyan-500/60',
        sky: 'text-sky-500 border-sky-500 bg-sky-500/10 hover:bg-sky-500/20 ring-sky-500/60',
        blue: 'text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 ring-blue-500/60',
        indigo:
          'text-indigo-500 border-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20 ring-indigo-500/60',
        violet:
          'text-violet-500 border-violet-500 bg-violet-500/10 hover:bg-violet-500/20 ring-violet-500/60',
        purple:
          'text-purple-500 border-purple-500 bg-purple-500/10 hover:bg-purple-500/20 ring-purple-500/60',
        fuchsia:
          'text-fuchsia-500 border-fuchsia-500 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 ring-fuchsia-500/60',
        pink: 'text-pink-500 border-pink-500 bg-pink-500/10 hover:bg-pink-500/20 ring-pink-500/60',
        rose: 'text-rose-500 border-rose-500 bg-rose-500/10 hover:bg-rose-500/20 ring-rose-500/60',
        gray: 'text-gray-500 border-gray-500 bg-gray-500/10 hover:bg-gray-500/20 ring-gray-500/60',
      },
      text: {
        default: 'hover:text-black/70 ring-black/10',
        accent: 'text-accent-500 hover:text-accent-700 ring-accent-500/60',
        red: 'text-red-500 hover:text-red-700 ring-red-500/60',
        orange: 'text-orange-500 hover:text-orange-700 ring-orange-500/60',
        amber: 'text-amber-500 hover:text-amber-700 ring-amber-500/60',
        yellow: 'text-yellow-500 hover:text-yellow-700 ring-yellow-500/60',
        lime: 'text-lime-500 hover:text-lime-700 ring-lime-500/60',
        green: 'text-green-500 hover:text-green-700 ring-green-500/60',
        emerald: 'text-emerald-500 hover:text-emerald-700 ring-emerald-500/60',
        teal: 'text-teal-500 hover:text-teal-700 ring-teal-500/60',
        cyan: 'text-cyan-500 hover:text-cyan-700 ring-cyan-500/60',
        sky: 'text-sky-500 hover:text-sky-700 ring-sky-500/60',
        blue: 'text-blue-500 hover:text-blue-700 ring-blue-500/60',
        indigo: 'text-indigo-500 hover:text-indigo-700 ring-indigo-500/60',
        violet: 'text-violet-500 hover:text-violet-700 ring-violet-500/60',
        purple: 'text-purple-500 hover:text-purple-700 ring-purple-500/60',
        fuchsia: 'text-fuchsia-500 hover:text-fuchsia-700 ring-fuchsia-500/60',
        pink: 'text-pink-500 hover:text-pink-700 ring-pink-500/60',
        rose: 'text-rose-500 hover:text-rose-700 ring-rose-500/60',
        gray: 'text-gray-500 hover:text-gray-700 ring-gray-500/60',
      },
      none: {},
    }[variant ?? 'none']?.[color ?? 'default'],
    theme.root,
    classes?.root,
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
        <Icon data={icon} class={cls('pointer-events-none', theme.icon, classes.icon)} />
      {:else}
        <Icon class={cls('pointer-events-none', theme.icon, classes.icon)} {...icon} />
      {/if}
    </span>
  {/if}

  <slot />
</svelte:element>
