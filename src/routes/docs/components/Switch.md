<script>
  import { mdiCheck, mdiClose } from '@mdi/js';

  import AppBar from '$lib/components/AppBar.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import Preview from '$lib/components/Preview.svelte';
</script>

## Basic

<Preview>
  <Stack vertical gap={8}>
    <Switch />
    <Switch checked />
  </Stack>
</Preview>

## Icons

<Preview>
  <Stack vertical gap={8}>
    <Switch let:checked>
      {#if checked}
        <Icon path={mdiCheck} class="text-blue-500" size=".8em" />
      {/if}
    </Switch>
    <Switch let:checked>
      {#if checked}
        <Icon path={mdiCheck} class="text-blue-500" size=".8em" />
      {:else}
        <Icon path={mdiClose} class="text-gray-400" size=".8em" />
      {/if}
    </Switch>
  </Stack>
</Preview>

## Disabled

<Preview>
  <Stack vertical gap={8}>
    <Switch disabled />
    <Switch disabled checked />
    <Switch disabled>
      <Icon path={mdiCheck} class="text-black/50" size=".8em" />
    </Switch>
  </Stack>
</Preview>
