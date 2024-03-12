<script lang="ts">
  import Backdrop from './Backdrop.svelte';

  import { mdScreen } from '../stores/matchMedia.js';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import { browser } from '../utils/env.js';
  import { getSettings } from './index.js';

  export let navWidth = 240;
  export let headerHeight = 64;

  /** Control whether nav should be full height (default) or header should be full width */
  export let headerPosition: 'full' | 'inset' = 'full';

  /** Overlap `main` under header using negative top margin with positive top padding to support background blur */
  export let overlapHeader = false;

  $: areas =
    headerPosition === 'full' ? "'header header' 'aside main'" : "'aside header' 'aside main'";

  export let classes: {
    root?: string;
    aside?: string;
    nav?: string;
  } = {};
  const settingsClasses = getComponentClasses('AppLayout');

  const { showDrawer } = getSettings();

  $: temporaryDrawer = browser ? !$mdScreen : false;
</script>

<div
  style:--headerHeight="{headerHeight}px"
  style:--drawerWidth="{$showDrawer ? navWidth : 0}px"
  style:--navWidth="{navWidth}px"
  style:--areas={areas}
  class={cls(
    'AppLayout',
    'grid grid-cols-[auto,1fr] grid-rows-[var(--headerHeight),1fr] h-screen',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
  class:overlapHeader
>
  <slot />

  <!-- Render backdrop first to fix stacking order with <aside> nav -->
  {#if $showDrawer && temporaryDrawer}
    <Backdrop on:click={() => ($showDrawer = false)} class="z-50" />
  {/if}

  <aside
    class={cls(
      'w-[var(--drawerWidth)] transition-all duration-500 overflow-hidden',
      temporaryDrawer && 'fixed h-full z-50 elevation-10',
      settingsClasses.aside,
      classes.aside
    )}
  >
    <nav
      class={cls('nav h-full overflow-auto w-[var(--navWidth)]', settingsClasses.nav, classes.nav)}
    >
      <slot name="nav" />
    </nav>
  </aside>
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
  }

  /* Overlap under header to support background blur */
  .AppLayout.overlapHeader :global(> main) {
    margin-top: calc(var(--headerHeight) * -1);
    padding-top: var(--headerHeight);
  }
</style>
