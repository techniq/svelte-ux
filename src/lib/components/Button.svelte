<script lang="ts">
  import Icon from './Icon.svelte';

  import cssVars from '../actions/cssVars';
  import CircularProgress from './CircularProgress.svelte';
  import { cls } from '../utils/styles';
  import multi from '../actions/multi';
  import type { Actions } from '../actions/multi';

  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let fullWidth: boolean = false;
  export let icon: string | undefined = undefined;
  export let iconOnly = icon !== undefined && $$slots.default !== true;
  export let actions: Actions<HTMLAnchorElement | HTMLButtonElement> = undefined;

  export let small: boolean = false;
  export let loading: boolean = false;
  export let circle: boolean = iconOnly;
  export let disabled: boolean = false;
  export let variant: 'text' | 'outlined' | 'filled' | 'none' = 'text';
  export let color:
    | 'default'
    | 'accent'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose' = 'default';

  export let classes: {
    root?: string;
    icon?: string;
    loading?: string;
  } = {};

  $: _class = cls(
    'button',
    'transition duration-300 ring-black/20',
    'focus:outline-none focus-visible:ring-1',
    circle ? 'rounded-full' : variant !== 'none' ? 'rounded' : '',
    small ? 'text-xs' : 'text-sm',
    fullWidth ? 'flex w-full' : 'inline-flex',
    (variant !== 'none' || iconOnly) && 'items-center justify-center',
    variant !== 'none' && 'px-4 uppercase font-medium tracking-wider whitespace-nowrap',
    variant !== 'none' && !small && 'py-2',
    disabled && 'opacity-50 pointer-events-none',
    {
      text: {
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
      },
      outlined: {
        default: 'border hover:bg-black/5',
        accent: 'text-accent-500 border border-accent-500 hover:bg-accent-500/10',
        red: 'text-red-500 border border-red-500 hover:bg-red-500/10',
        orange: 'text-orange-500 border border-orange-500 hover:bg-orange-500/10',
        amber: 'text-amber-500 border border-amber-500 hover:bg-amber-500/10',
        yellow: 'text-yellow-500 border border-yellow-500 hover:bg-yellow-500/10',
        lime: 'text-lime-500 border border-lime-500 hover:bg-lime-500/10',
        green: 'text-green-500 border border-green-500 hover:bg-green-500/10',
        emerald: 'text-emerald-500 border border-emerald-500 hover:bg-emerald-500/10',
        teal: 'text-teal-500 border border-teal-500 hover:bg-teal-500/10',
        cyan: 'text-cyan-500 border border-cyan-500 hover:bg-cyan-500/10',
        sky: 'text-sky-500 border border-sky-500 hover:bg-sky-500/10',
        blue: 'text-blue-500 border border-blue-500 hover:bg-blue-500/10',
        indigo: 'text-indigo-500 border border-indigo-500 hover:bg-indigo-500/10',
        violet: 'text-violet-500 border border-violet-500 hover:bg-violet-500/10',
        purple: 'text-purple-500 border border-purple-500 hover:bg-purple-500/10',
        fuchsia: 'text-fuchsia-500 border border-fuchsia-500 hover:bg-fuchsia-500/10',
        pink: 'text-pink-500 border border-pink-500 hover:bg-pink-500/10',
        rose: 'text-rose-500 border border-rose-500 hover:bg-rose-500/10',
      },
      filled: {
        default: 'bg-black/5 hover:bg-black/10',
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
      },
      // none: {},
    }[variant]?.[color],
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
    <CircularProgress size={16} width={2} class={cls('mr-2', classes.loading)} />
  {:else if icon}
    <Icon data={icon} class={cls(!iconOnly && 'mr-1', classes.icon)} />
  {/if}
  <slot />
</svelte:element>
