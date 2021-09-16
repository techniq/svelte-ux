<script lang="ts">
  import { mdiMenu } from '@mdi/js';

  import { showDrawer } from './AppLayout.svelte';
  import Breadcrumb from './Breadcrumb.svelte';
  import Button from './Button.svelte';

  export let title: string | number | Array<string | number> = '';
</script>

<header class="h-16 px-4 bg-blue-500 text-white flex items-center shadow-md relative">
  <Button icon={mdiMenu} on:click={() => ($showDrawer = !$showDrawer)} class="p-3" />
  <div class="ml-2 text-lg">
    {#if typeof title === 'string' || typeof title === 'number'}
      {title}
    {:else}
      <Breadcrumb items={title} />
    {/if}
  </div>

  <slot />

  <div class="flex-1 grid justify-end">
    <slot name="actions" />
  </div>
</header>
