<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { matchMediaWidth } from '../stores/matchMedia';
  import Drawer from './Drawer.svelte';
  import Menu from './Menu.svelte';

  export let open = true;
  export let screenWidth = 768; // md+

  export let menuProps: ComponentProps<Menu> | undefined = undefined;
  export let drawerProps: ComponentProps<Drawer> | undefined = undefined;

  const isLargeScreen = matchMediaWidth(screenWidth);
</script>

{#if $isLargeScreen}
  <!-- Default explicitClose={true} to match Drawer behavior -->
  <Menu bind:open on:close explicitClose class="ResponsiveMenu" {...menuProps}>
    <slot {open} />
  </Menu>
{:else}
  <Drawer bind:open placement="bottom" on:close class="ResponsiveMenu" {...drawerProps}>
    <slot {open} />
  </Drawer>
{/if}
