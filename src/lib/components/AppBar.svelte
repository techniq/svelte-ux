<script lang="ts">
  import { mdiMenu } from '@mdi/js';

  import { showDrawer } from './AppLayout.svelte';
  import Breadcrumb from './Breadcrumb.svelte';
  import Button from './Button.svelte';
  import { browser } from '../utils/env';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let title: string | number | Array<string | number> = '';

  /**
   * Update head / document.title.  Set to false to disable
   */
  export let head = true;

  const theme = getComponentTheme('AppBar');

  $: titleString = Array.isArray(title) ? title.filter((x) => x).join(' › ') : title.toString();

  $: if (browser && head) {
    // Appears to be needed for some reactive updates
    document.title = titleString;
  }
</script>

<header
  class={cls(
    'AppBar',
    'h-16 px-4 bg-accent-500 text-white flex items-center shadow-md relative',
    theme.class,
    $$restProps.class
  )}
>
  <Button icon={mdiMenu} on:click={() => ($showDrawer = !$showDrawer)} class="p-3" />
  <div class="ml-2 text-lg">
    {#if typeof title === 'string' || typeof title === 'number'}
      {title}
    {:else}
      <Breadcrumb items={title} class="gap-2" />
    {/if}
  </div>

  <slot />

  <div class="flex-1 grid justify-end">
    <slot name="actions" />
  </div>
</header>

<svelte:head>
  {#if head}
    <title>{titleString}</title>
  {/if}
</svelte:head>
