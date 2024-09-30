<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { cls } from '@layerstack/tailwind';
  import { mdScreen } from '@layerstack/svelte-stores';

  import Backdrop from './Backdrop.svelte';
  import { getComponentClasses } from './theme.js';
  import { getSettings } from './index.js';

  export let navWidth = 240;
  export let headerHeight = 64;

  /** Control whether header should be full width (deafult) or nav should be full height */
  export let headerPosition: 'full' | 'inset' = 'full';

  export let classes: {
    root?: string;
    aside?: string;
    nav?: string;
  } = {};

  const settingsClasses = getComponentClasses('AppLayout');
  const { showDrawer } = getSettings();
  $: temporaryDrawer = BROWSER ? !$mdScreen : false;
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
    $$props.class
  )}
>
  <slot />

  <!-- Render backdrop first to fix stacking order with <aside> nav -->
  {#if $showDrawer && temporaryDrawer}
    <Backdrop on:click={() => ($showDrawer = false)} class="z-50" />
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
      <slot name="nav" />
    </nav>
  </aside>
</div>
