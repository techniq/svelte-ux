<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import Avatar from './Avatar.svelte';
  import ProgressCircle from './ProgressCircle.svelte';
  import Icon from './Icon.svelte';
  import Overlay from './Overlay.svelte';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let title: string | number | null = null;
  export let subheading: string | number | null = null;
  export let icon: string | null = null;

  /**
   * Wrap icon in Avatar
   */
  export let avatar: boolean | ComponentProps<Avatar> | null = null;

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
  const settingsClasses = getComponentClasses('ListItem');

  /**
   * Show loading overlay
   */
  export let loading: boolean | null = null;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li
  class={cls(
    'ListItem',
    'flex gap-4 items-center border-t border-surface-content/10 py-2 px-4',
    'relative', // Needed for loading overlay
    list === 'type' && 'first-of-type:border-t-0 first-of-type:rounded-t last-of-type:rounded-b',
    list === 'parent' && 'first:border-t-0 first:rounded-t last:rounded-b',
    list === 'group' && 'group-first:border-t-0 group-first:rounded-t group-last:rounded-b',
    noShadow !== true && 'elevation-1',
    noBackground !== true && 'bg-surface-100',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
  on:click
  role="listitem"
>
  {#if loading}
    <Overlay center class="rounded">
      <ProgressCircle />
    </Overlay>
  {/if}

  <slot name="avatar">
    {#if icon != null}
      {#if avatar}
        <Avatar
          class={cls(settingsClasses.avatar, classes.avatar)}
          {...typeof avatar === 'object' ? avatar : {}}
        >
          <Icon data={icon} class={cls(settingsClasses.icon, classes.icon)} />
        </Avatar>
      {:else}
        <Icon data={icon} class={cls(settingsClasses.icon, classes.icon)} />
      {/if}
    {/if}
  </slot>

  <div class="flex-grow">
    <slot name="title">
      {#if title != null}
        <div class={cls(settingsClasses.title, classes.title)}>{title}</div>
      {/if}
    </slot>

    <slot name="subheading">
      {#if subheading != null}
        <div
          class={cls(
            'text-sm text-surface-content/50',
            settingsClasses.subheading,
            classes.subheading
          )}
        >
          {subheading}
        </div>
      {/if}
    </slot>
  </div>

  <slot name="actions" />
</li>
