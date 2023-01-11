<script context="module">
  import { writable } from 'svelte/store';
  export const showDrawer = writable(true);
</script>

<script>
  import Backdrop from './Backdrop.svelte';

  import matchMedia from '../stores/matchMedia';
  import cssVars from '../actions/cssVars';
  import { cls } from '../utils/styles';

  export let navWidth = 240;

  let isMobile = matchMedia('screen and (max-width: 768px)');
  $: temporaryDrawer = $isMobile;

  $: styleVars = {
    drawerWidth: $showDrawer ? `${navWidth}px` : '0',
    navWidth: navWidth + 'px',
  };
</script>

<div class="layout grid h-screen" use:cssVars={styleVars}>
  <!-- Render backdrop first to fix stacking order with <aside> nav -->
  {#if $showDrawer && temporaryDrawer}
    <Backdrop on:click={() => ($showDrawer = false)} class="z-20" />
  {/if}

  <aside
    class={cls(
      'w-[var(--drawerWidth)] transition-all duration-500 overflow-hidden',
      temporaryDrawer && 'fixed h-full z-30 temporary'
    )}
  >
    <nav class="nav h-full overflow-scroll bg-[#282b31] w-[var(--navWidth)]">
      <slot name="nav" />
    </nav>
  </aside>

  <slot />
</div>

<style lang="postcss">
  /* .container is used by tailwind */
  .layout {
    grid-template-columns: auto 1fr;
    grid-template-rows: 64px 1fr;
    grid-template-areas:
      'aside header'
      'aside main';
  }

  aside {
    grid-area: aside;
  }

  aside.temporary {
    box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14),
      0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  }

  .layout :global(> header) {
    grid-area: header;
  }

  .layout :global(> main) {
    grid-area: main;
    overflow: auto;
  }
</style>
