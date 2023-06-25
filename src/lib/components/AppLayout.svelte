<script context="module">
  import { writable } from 'svelte/store';
  export const showDrawer = writable(true);
</script>

<script lang="ts">
  import Backdrop from './Backdrop.svelte';

  import { mdScreen } from '../stores/matchMedia';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let navWidth = 240;
  export let headerHeight = 64;
  /** Control whether nav should be full height (default) or header should be full width */
  export let headerFullWidth = false;
  $: areas = headerFullWidth ? "'header header' 'aside main'" : "'aside header' 'aside main'";

  export let classes: {
    root?: string;
    aside?: string;
    nav?: string;
  } = {};
  const theme = getComponentTheme('AppLayout');

  let isDesktop = mdScreen;
  $: temporaryDrawer = !$isDesktop;
</script>

<div
  style:--headerHeight="{headerHeight}px"
  style:--drawerWidth="{$showDrawer ? navWidth : 0}px"
  style:--navWidth="{navWidth}px"
  style:--areas={areas}
  class={cls(
    'AppLayout',
    'grid grid-cols-[auto,1fr] grid-rows-[var(--headerHeight),1fr] h-screen',
    theme.root,
    classes.root,
    $$props.class
  )}
>
  <!-- Render backdrop first to fix stacking order with <aside> nav -->
  {#if $showDrawer && temporaryDrawer}
    <Backdrop on:click={() => ($showDrawer = false)} class="z-20" />
  {/if}

  <aside
    class={cls(
      'w-[var(--drawerWidth)] transition-all duration-500 overflow-hidden',
      temporaryDrawer && 'fixed h-full z-30 elevation-10',
      theme.aside,
      classes.aside
    )}
  >
    <nav class={cls('nav h-full overflow-scroll w-[var(--navWidth)]', theme.nav, classes.nav)}>
      <slot name="nav" />
    </nav>
  </aside>

  <slot />
</div>

<style>
  .AppLayout {
    grid-template-areas: var(--areas);
  }

  .AppLayout aside {
    grid-area: aside;
  }

  .AppLayout :global(> header) {
    grid-area: header;
  }

  .AppLayout :global(> main) {
    grid-area: main;
    overflow: auto;
    /* Overlap under header to support background blur */
    margin-top: calc(var(--headerHeight) * -1);
    padding-top: var(--headerHeight);
  }
</style>
