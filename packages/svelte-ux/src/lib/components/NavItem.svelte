<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import { isActive, url } from '../utils/routing.js';
  import Icon from './Icon.svelte';
  import { scrollIntoView } from '../actions/scroll.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import { mdScreen } from '../stores/matchMedia.js';
  import { getSettings } from './index.js';

  export let currentUrl: URL;
  export let path: string;
  export let text: string = '';
  export let icon: string | null = null;

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
  href={url(currentUrl, path)}
  class={cls(
    'NavItem',
    'flex items-center',
    settingsClasses.root,
    isPathActive && ['is-active', settingsClasses.active, classes.active],
    classes.root,
    $$props.class
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
    <Icon
      data={icon}
      class={cls('mr-3 flex-shrink-0', settingsClasses.icon)}
      classes={classes.icon}
    />
  {/if}

  {text}

  <slot />
</a>
