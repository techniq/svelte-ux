<script lang="ts">
  import { isActive, url } from '../utils/routing';

  import Icon from './Icon.svelte';
  import { scrollIntoView } from '../actions/scroll';
  import { getScrollParent } from '../utils/dom';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let currentUrl: URL;
  export let path: string;
  export let text: string = '';
  export let icon: string | null = null;

  export let classes: {
    root?: string;
    indicator?: string;
    icon?: string;
  } = {};
  const theme = getComponentTheme('NavItem');

  $: isPathActive = path ? isActive(currentUrl, path) : false;
</script>

<a
  href={url(currentUrl, path)}
  class={cls(
    'NavItem',
    'flex items-center text-sm p-1 relative',
    isPathActive && 'is-active',
    theme.root,
    classes.root,
    $$props.class
  )}
  use:scrollIntoView={{
    condition: (node) => {
      if (isPathActive) {
        const nodeTop = node.getBoundingClientRect().top;
        const scrollParent = getScrollParent(node);
        const scrollParentHeight = scrollParent?.offsetHeight ?? 0;
        const threshold = 0;
        const isVisible = scrollParentHeight - nodeTop < threshold;
        return isVisible;
      } else {
        return false;
      }
    },
    delay: 500,
  }}
  on:click
>
  {#if isPathActive}
    <div class={cls('absolute left-0 top-0 w-1 h-full', theme.indicator, classes.indicator)} />
  {/if}

  {#if $$slots.avatar}
    <slot name="avatar" />
  {/if}

  {#if icon}
    <Icon path={icon} class={cls('mr-3 flex-shrink-0', theme.icon, classes.icon)} />
  {/if}

  {text}

  <slot />
</a>
