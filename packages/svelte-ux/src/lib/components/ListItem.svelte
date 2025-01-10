<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';

  import Avatar from './Avatar.svelte';
  import ProgressCircle from './ProgressCircle.svelte';
  import Icon from './Icon.svelte';
  import Overlay from './Overlay.svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import type { HTMLLiAttributes } from 'svelte/elements';

  const settingsClasses = getComponentClasses('ListItem');

  interface Props {
    title?: string | number | Snippet | null;
    subheading?: string | number | Snippet | null;
    icon?: string | null;
    /**
     * Wrap icon in Avatar
     */
    avatar?: boolean | ComponentProps<typeof Avatar> | Snippet | null;
    /**
     * Controls how first, last, and gap between are calculated
     *   - type: items are of the same type
     *   - parent: items share a common parent
     *   - group: closest element with 'group' class.  Useful for `animate:flip` or other wrapping element
     */
    list?: 'type' | 'parent' | 'group';
    /**
     * Remove shadow (useful when using `ring`)
     */
    noShadow?: boolean;
    /**
     * Remove background
     */
    noBackground?: boolean;
    classes?: {
      root?: string;
      avatar?: string;
      icon?: string;
      title?: string;
      subheading?: string;
    };
    class?: string;
    /**
     * Show loading overlay
     */
    loading?: boolean | null;
    onclick?: HTMLLiAttributes['onclick'];
    actions?: Snippet;
  }

  let {
    title,
    subheading,
    icon,
    avatar,
    list = 'parent',
    noShadow = false,
    noBackground = false,
    classes = {},
    class: className,
    loading,
    onclick,
    actions,
  }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
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
    className
  )}
  {onclick}
  role="listitem"
>
  {#if loading}
    <Overlay center class="rounded">
      <ProgressCircle />
    </Overlay>
  {/if}

  {#if typeof avatar === "function"}
    {@render avatar()}
  {:else if icon != null}
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

  <div class="flex-grow">
    {#if typeof title === "function"}
      {@render title()}
    {:else if title != null}
      <div class={cls(settingsClasses.title, classes.title)}>{title}</div>
    {/if}

    {#if typeof subheading === "function"}
      {@render subheading()}
    {:else if subheading != null}
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
  </div>

  {@render actions?.()}
</li>
