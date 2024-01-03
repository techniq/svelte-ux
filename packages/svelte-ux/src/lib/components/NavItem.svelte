<script lang="ts">
  import { isActive, url } from '../utils/routing';

  import Icon from './Icon.svelte';
  import { scrollIntoView } from '../actions/scroll';
  import { getScrollParent } from '../utils/dom';
  import { cls } from '../utils/styles';
  import { getComponentClasses } from './theme';
  import { showDrawer } from './AppLayout.svelte';
  import { mdScreen } from '../stores/matchMedia';

  export let currentUrl: URL;
  export let path: string;
  export let text: string = '';
  export let icon: string | null = null;

  export let classes: {
    root?: string;
    active?: string;
    icon?: string;
  } = {};
  const settingsClasses = getComponentClasses('NavItem');

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
    <Icon path={icon} class={cls('mr-3 flex-shrink-0', settingsClasses.icon, classes.icon)} />
  {/if}

  {text}

  <slot />
</a>
