<script lang="ts">
  import clsx from 'clsx';

  import Icon from './Icon.svelte';

  import cssVars from '../actions/cssVars';
  import CircularProgress from './CircularProgress.svelte';

  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let fullWidth: boolean = false;
  export let icon: string | undefined = undefined;
  export let iconOnly = icon !== undefined && $$slots.default !== true;

  export let small: boolean = false;
  export let filled: boolean = false;
  export let loading: boolean = false;

  export let circle: boolean = iconOnly;
  export let base: boolean = iconOnly;

  export let color: string | undefined = undefined;
  export let disabled: boolean = false;

  $: hasClassOverride = (str: string) => {
    return $$props.class?.includes(str) ?? false;
  };

  $: _class = clsx(
    'button',
    'transition duration-300 ring-black/20',
    !filled && !hasClassOverride('hover:bg-') && 'hover:bg-black/5',
    'focus:outline-none focus-visible:ring-1',
    circle ? 'rounded-full' : !base ? 'rounded' : '',
    small ? 'text-xs' : 'text-sm',
    fullWidth ? 'flex' : 'inline-flex',
    (!base || iconOnly) && 'items-center justify-center',
    !base && 'px-4 uppercase font-medium tracking-wider whitespace-nowrap',
    !base && !small && 'py-2',
    disabled && 'opacity-50 pointer-events-none',
    filled && 'bg-black/10 border border-black/20 hover:border-gray-700',
    $$props.class
  );
</script>

{#if href}
  <a
    {...$$restProps}
    {href}
    {target}
    class={_class}
    use:cssVars={{ color }}
    style={$$props.style ?? ''}
    {disabled}
  >
    {#if loading}
      <CircularProgress size={16} />
    {:else if icon}
      <Icon path={icon} class={clsx($$slots.default && 'mr-1')} />
    {/if}
    <slot />
  </a>
{:else}
  <button
    {type}
    {...$$restProps}
    on:click
    class={_class}
    use:cssVars={{ color }}
    style={$$props.style ?? ''}
    {disabled}
  >
    {#if loading}
      <CircularProgress size={16} width={2} class="mr-2" />
    {:else if icon}
      <Icon path={icon} class={clsx($$slots.default && 'mr-1')} />
    {/if}
    <slot />
  </button>
{/if}
