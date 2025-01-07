<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';

  import { isActive, url } from '../utils/routing.js';
  import Icon from './Icon.svelte';
  import { scrollIntoView } from '../actions/scroll.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import { mdScreen } from '../stores/matchMedia.js';
  import { getSettings } from './index.js';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  interface Props {
    currentUrl: URL;
    path: string;
    text?: string;
    icon?: string | null;
    classes?: {
      root?: string;
      active?: string;
      icon?: ComponentProps<typeof Icon>['classes'];
    };
    class?: string;
    onclick?: HTMLAnchorAttributes['onclick'];
    avatar?: Snippet;
    children?: Snippet;
  }

  let {
    currentUrl,
    path,
    text = '',
    icon,
    classes = {},
    class: className,
    onclick,
    avatar,
    children,
  }: Props = $props();
  const settingsClasses = getComponentClasses('NavItem');

  const { showDrawer } = getSettings();

  let isPathActive = $derived(path ? isActive(currentUrl, path) : false);
</script>

<a
  href={url(currentUrl, path)}
  class={cls(
    'NavItem',
    'flex items-center',
    settingsClasses.root,
    isPathActive && ['is-active', settingsClasses.active, classes.active],
    classes.root,
    className
  )}
  use:scrollIntoView={{
    condition: isPathActive,
    onlyIfNeeded: true,
    delay: 500,
  }}
  onclick={(e) => {
    onclick?.(e);
    // Close if use temporary drawer
    if (!$mdScreen) {
      $showDrawer = false;
    }
  }}
>
  {#if avatar}
    {@render avatar()}
  {/if}

  {#if icon}
    <Icon
      data={icon}
      class={cls('mr-3 flex-shrink-0', settingsClasses.icon)}
      classes={classes.icon}
    />
  {/if}

  {text}

  {@render children?.()}
</a>
