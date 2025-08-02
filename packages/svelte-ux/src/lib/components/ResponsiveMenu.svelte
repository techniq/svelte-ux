<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import { matchMediaWidth } from '@layerstack/svelte-stores';
  import { cls } from '@layerstack/tailwind';

  import Drawer from './Drawer.svelte';
  import Menu from './Menu.svelte';

  export let open = true;
  export let screenWidth = 768; // md+

  export let menuProps: ComponentProps<Menu> | undefined = undefined;
  export let drawerProps: ComponentProps<Drawer> | undefined = undefined;

  let className: string | undefined = undefined;
  export { className as class };

  const isLargeScreen = matchMediaWidth(screenWidth);
</script>

{#if $isLargeScreen}
  <!-- Default explicitClose={true} to match Drawer behavior -->
  <Menu
    bind:open
    on:close
    explicitClose
    {...menuProps}
    class={cls('ResponsiveMenu', className, menuProps?.class)}
  >
    <slot {open} />
  </Menu>
{:else}
  <Drawer
    bind:open
    placement="bottom"
    on:close
    {...drawerProps}
    class={cls('ResponsiveMenu', className, drawerProps?.class)}
  >
    <slot {open} />
  </Drawer>
{/if}
