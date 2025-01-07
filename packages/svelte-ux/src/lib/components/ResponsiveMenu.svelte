<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import { matchMediaWidth } from '../stores/matchMedia.js';
  import Drawer from './Drawer.svelte';
  import Menu from './Menu.svelte';
  import { cls } from '../utils/styles.js';

  interface Props {
    open?: boolean;
    screenWidth?: number; // md+
    menuProps?: ComponentProps<typeof Menu>;
    drawerProps?: ComponentProps<typeof Drawer>;
    class?: string;
    onClose?: () => void;
    children?: Snippet<[{ open: boolean }]>;
  }

  let {
    open = $bindable(true),
    screenWidth = 768,
    menuProps,
    drawerProps,
    class: className,
    onClose,
    children,
  }: Props = $props();

  const isLargeScreen = matchMediaWidth(screenWidth);
</script>

{#if $isLargeScreen}
  <!-- Default explicitClose={true} to match Drawer behavior -->
  <Menu
    bind:open
    {onClose}
    explicitClose
    {...menuProps}
    class={cls('ResponsiveMenu', className, menuProps?.class)}
  >
    {@render children?.({ open })}
  </Menu>
{:else}
  <Drawer
    bind:open
    placement="bottom"
    {onClose}
    {...drawerProps}
    class={cls('ResponsiveMenu', className, drawerProps?.class)}
  >
    {@render children?.({ open })}
  </Drawer>
{/if}
