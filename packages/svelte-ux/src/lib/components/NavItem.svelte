<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { isActive, url } from '@layerstack/utils/routing';
  import { scrollIntoView } from '@layerstack/svelte-actions';
  import { mdScreen } from '@layerstack/svelte-stores';
  import { cls } from '@layerstack/tailwind';

  import Icon from './Icon.svelte';
  import { getComponentClasses } from './theme.js';
  import { getSettings } from './index.js';
  import type { IconProp } from '$lib/types/index.js';
  import { asIconData } from '$lib/utils/icons.js';

  export let currentUrl: URL;
  export let path: string;
  export let text: string = '';
  export let icon: IconProp | ComponentProps<Icon> | undefined = undefined;

  let className: string | undefined = undefined;
  export { className as class };

  export let classes: {
    root?: string;
    active?: string;
    icon?: ComponentProps<Icon>['classes'];
  } = {};
  const settingsClasses = getComponentClasses('NavItem');

  const { showDrawer } = getSettings();

  $: isPathActive = path ? isActive(currentUrl, path) : false;
</script>

<a
  {...$$restProps}
  href={url(currentUrl, path)}
  class={cls(
    'NavItem',
    'flex items-center',
    settingsClasses.root,
    classes.root,
    className,
    isPathActive && ['is-active', settingsClasses.active, classes.active]
  )}
  use:scrollIntoView={{
    condition: isPathActive,
    onlyIfNeeded: true,
    delay: 500,
  }}
  on:click
  on:click={() => {
    // Close if use temporary drawer
    if (!$mdScreen) {
      $showDrawer = false;
    }
  }}
>
  {#if $$slots.avatar}
    <slot name="avatar" />
  {/if}

  {#if icon}
    {#if typeof icon === 'function'}
      <!-- Component, such as unplugin-icons -->
      {@const Icon = icon}
      <Icon class={cls('mr-3 shrink-0', settingsClasses.icon)} />
    {:else if typeof icon === 'string' || 'icon' in icon}
      <!-- font path/url/etc or font-awesome IconDefinition -->
      <Icon
        data={asIconData(icon)}
        class={cls('mr-3 shrink-0', settingsClasses.icon)}
        classes={classes.icon}
      />
    {:else}
      <Icon class={cls('mr-3 shrink-0', settingsClasses.icon)} classes={classes.icon} {...icon} />
    {/if}
  {/if}

  {text}

  <slot />
</a>
