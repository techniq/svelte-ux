<script lang="ts">
  import Avatar from './Avatar.svelte';
  import ProgressCircle from './ProgressCircle.svelte';
  import Icon from './Icon.svelte';
  import Overlay from './Overlay.svelte';
  import type { ComponentProps } from '../types';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let title: string | number | null = null;
  export let subheading: string | number | null = null;
  export let icon: string | null = null;

  /**
   * Wrap icon in Avatar
   */
  export let avatar: boolean | ComponentProps<Avatar> = null;

  /**
   * Controls how first, last, and gap between are calculated
   *   - type: items are of the same type
   *   - parent: items share a common parent
   *   - group: closest element with 'group' class.  Useful for `animate:flip` or other wrapping element
   */
  export let list: 'type' | 'parent' | 'group' = 'parent';

  /**
   * Remove shadow (useful when using `ring`)
   */
  export let noShadow = false;

  /**
   * Remove background
   */
  export let noBackground = false;

  export let classes: {
    root?: string;
    avatar?: string;
    icon?: string;
    title?: string;
    subheading?: string;
  } = {};
  const theme = getComponentTheme('ListItem');

  /**
   * Show loading overlay
   */
  export let loading: boolean | null = null;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li
  class={cls(
    'ListItem',
    'flex gap-4 items-center border-t py-2 px-4',
    'relative', // Needed for loading overlay
    list === 'type' && 'first-of-type:border-t-0 first-of-type:rounded-t last-of-type:rounded-b',
    list === 'parent' && 'first:border-t-0 first:rounded-t last:rounded-b',
    list === 'group' && 'group-first:border-t-0 group-first:rounded-t group-last:rounded-b',
    noShadow !== true && 'elevation-1',
    noBackground !== true && 'bg-white',
    theme.root,
    classes.root,
    $$props.class
  )}
  on:click
>
  {#if loading}
    <Overlay center class="rounded">
      <ProgressCircle />
    </Overlay>
  {/if}

  <slot name="avatar">
    {#if icon != null}
      {#if avatar}
        <Avatar class={cls(theme.avatar, classes.avatar)} {...avatar}>
          <Icon path={icon} class={cls(theme.icon, classes.icon)} />
        </Avatar>
      {:else}
        <Icon path={icon} class={cls(theme.icon, classes.icon)} />
      {/if}
    {/if}
  </slot>

  <div class="flex-grow">
    <slot name="title">
      {#if title != null}
        <div class={cls(theme.title, classes.title)}>{title}</div>
      {/if}
    </slot>

    <slot name="subheading">
      {#if subheading != null}
        <div class={cls('text-sm text-black/50', theme.subheading, classes.subheading)}>
          {subheading}
        </div>
      {/if}
    </slot>
  </div>

  <slot name="actions" />
</li>
