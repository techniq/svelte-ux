<script lang="ts">
  import clsx from 'clsx';

  import Icon from './Icon.svelte';

  import cssVars from '../actions/cssVars';

  export let href: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let fullWidth: boolean = false;
  export let icon: string | undefined = undefined;
  export let iconOnly = icon !== undefined && $$slots.default !== true;

  export let small: boolean = false;
  export let filled: boolean = false;

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
    circle ? 'rounded-full' : 'rounded',
    small ? 'text-xs' : 'text-sm',
    fullWidth ? 'block' : 'inline-block',
    base ? '' : 'px-4 uppercase font-medium tracking-wider whitespace-nowrap',
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
    {#if icon}
      <Icon path={icon} class={clsx($$slots.default && 'mr-1')} />
    {/if}
    <slot />
  </a>
{:else}
  <button
    {...$$restProps}
    on:click
    class={_class}
    use:cssVars={{ color }}
    style={$$props.style ?? ''}
    {disabled}
  >
    {#if icon}
      <Icon path={icon} class={clsx($$slots.default && 'mr-1')} />
    {/if}
    <slot />
  </button>
{/if}
