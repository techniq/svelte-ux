<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { mdiMenu } from '@mdi/js';

  import Breadcrumb from './Breadcrumb.svelte';
  import Button from './Button.svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import { getSettings } from './index.js';
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string | number | Array<string | number> | Snippet;
    menuIcon?: string | Snippet<[{ toggleMenu: () => void; isMenuOpen: boolean }]> | null;
    class?: string;
    /**
     * Update head / document.title.  Set to false to disable
     */
    head?: boolean;
    children?: Snippet;
    actions?: Snippet;
  }

  let {
    title = '',
    menuIcon = mdiMenu,
    class: className,
    head = true,
    children,
    actions,
  }: Props = $props();

  const { showDrawer } = getSettings();
  const settingsClasses = getComponentClasses('AppBar');

  let titleString = $derived(
    typeof title === 'function'
      ? ''
      : Array.isArray(title)
        ? title.filter((x) => x).join(' › ')
        : title.toString()
  );

  $effect(() => {
    if (BROWSER && head) {
      // Appears to be needed for some reactive updates
      document.title = titleString;
    }
  });

  function toggleMenu() {
    $showDrawer = !$showDrawer;
  }
</script>

<header
  class={cls('AppBar', 'px-4 flex items-center relative z-50', settingsClasses.root, className)}
>
  {#if menuIcon}
    {#if typeof menuIcon === 'function'}
      {@render menuIcon({ toggleMenu, isMenuOpen: $showDrawer })}
    {:else}
      <Button icon={menuIcon} onclick={toggleMenu} class="p-3" />
    {/if}
  {/if}

  {#if typeof title === 'function'}
    {@render title()}
  {:else}
    <div class="ml-2 text-lg font-medium">
      {#if typeof title === 'string' || typeof title === 'number'}
        {title}
      {:else}
        <Breadcrumb items={title} class="gap-2" />
      {/if}
    </div>
  {/if}

  {@render children?.()}

  <div class="flex-1 grid justify-end">
    {@render actions?.()}
  </div>
</header>

<svelte:head>
  {#if head}
    <title>{titleString}</title>
  {/if}
</svelte:head>
