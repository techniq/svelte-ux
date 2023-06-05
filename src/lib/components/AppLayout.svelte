<script context="module">
  import { writable } from 'svelte/store';
  export const showDrawer = writable(true);
</script>

<script lang="ts">
  import Backdrop from './Backdrop.svelte';

  import { mdScreen } from '../stores/matchMedia';
  import { cls } from '../utils/styles';

  export let navWidth = 240;
  /** Use areas="'header header' 'aside main'" for full-width header */
  export let areas = "'aside header' 'aside main'";

  export let classes: {
    root?: string;
    aside?: string;
    nav?: string;
  } = {};

  let isDesktop = mdScreen;
  $: temporaryDrawer = !$isDesktop;
</script>

<div
  class={cls(
    'layout grid grid-cols-[auto,1fr] grid-rows-[64px,1fr] h-screen',
    classes.root,
    $$props.class
  )}
  style:--drawerWidth="{$showDrawer ? navWidth : 0}px"
  style:--navWidth="{navWidth}px"
  style:--areas={areas}
>
  <!-- Render backdrop first to fix stacking order with <aside> nav -->
  {#if $showDrawer && temporaryDrawer}
    <Backdrop on:click={() => ($showDrawer = false)} class="z-20" />
  {/if}

  <aside
    class={cls(
      'w-[var(--drawerWidth)] transition-all duration-500 overflow-hidden',
      temporaryDrawer && 'fixed h-full z-30 elevation-10',
      classes.aside
    )}
  >
    <nav class={cls('nav h-full overflow-scroll bg-[#282b31] w-[var(--navWidth)]', classes.nav)}>
      <slot name="nav" />
    </nav>
  </aside>

  <slot />
</div>

<style>
  /* .container is used by tailwind */
  .layout {
    grid-template-areas: var(--areas);
  }

  aside {
    grid-area: aside;
  }

  .layout :global(> header) {
    grid-area: header;
  }

  .layout :global(> main) {
    grid-area: main;
    overflow: auto;
  }
</style>
