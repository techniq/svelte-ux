<script lang="ts">
  import type { Snippet } from 'svelte';
  import { BROWSER } from 'esm-env';
  import Backdrop from './Backdrop.svelte';

  import { mdScreen } from '../stores/matchMedia.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import { getSettings } from './index.js';

  interface Props {
    navWidth?: number;
    headerHeight?: number;
    /** Control whether header should be full width (deafult) or nav should be full height */
    headerPosition?: 'full' | 'inset';
    classes?: {
      root?: string;
      aside?: string;
      nav?: string;
    };
    class?: string;
    children?: Snippet;
    nav?: Snippet;
  }

  let {
    navWidth = 240,
    headerHeight = 64,
    headerPosition = 'full',
    classes = {},
    class: className,
    children,
    nav,
  }: Props = $props();

  const settingsClasses = getComponentClasses('AppLayout');
  const { showDrawer } = getSettings();
  let temporaryDrawer = $derived(BROWSER ? !$mdScreen : false);
</script>

<div
  style:--headerHeight="{headerHeight}px"
  style:--drawerWidth="{$showDrawer ? navWidth : 0}px"
  style:--navWidth="{navWidth}px"
  class={cls(
    'AppLayout',
    '[&>header]:fixed [&>header]:top-0 [&>header]:h-[var(--headerHeight)] [&>header]:transition-all',
    headerPosition === 'full' || temporaryDrawer
      ? '[&>header]:w-full'
      : '[&>header]:w-[calc(100%-var(--drawerWidth))] [&>header]:left-[var(--drawerWidth)] [&>header]:duration-500',
    '[&>main]:md:ml-[var(--drawerWidth)] [&>main]:mt-[var(--headerHeight)] [&>main]:transition-[margin] [&>main]:duration-500',
    /* Fix scrolling offset for headings (h1, ...) or other elements with an id set (`<a href="#id">`) */
    '[:where(&_[id])]:scroll-m-[var(--headerHeight)]',
    settingsClasses.root,
    classes.root,
    className
  )}
>
  {@render children?.()}

  <!-- Render backdrop first to fix stacking order with <aside> nav -->
  {#if $showDrawer && temporaryDrawer}
    <Backdrop onClick={() => ($showDrawer = false)} class="z-50" />
  {/if}

  <aside
    class={cls(
      'fixed top-0 h-[calc(100%-var(--headerHeight))] w-[var(--drawerWidth)] transition-all duration-500 overflow-hidden',
      !BROWSER && 'max-md:hidden', // hide drawer during SSR on <md viewports (which is same result once hydrated)
      temporaryDrawer
        ? 'fixed h-full z-50 elevation-10'
        : headerPosition === 'full'
          ? 'mt-[var(--headerHeight)]'
          : '',
      settingsClasses.aside,
      classes.aside
    )}
  >
    <nav
      class={cls(
        'nav h-full overflow-auto overscroll-contain w-[var(--navWidth)]',
        settingsClasses.nav,
        classes.nav
      )}
    >
      {@render nav?.()}
    </nav>
  </aside>
</div>
