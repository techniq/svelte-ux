<script>
  import { mdiCheck, mdiClose } from '@mdi/js';

  import api from '$lib/components/Switch.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import AppBar from '$lib/components/AppBar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import Preview from '$lib/components/Preview.svelte';

  let checked = null;
</script>

# Examples

## Basic

<Preview>
  <div class="grid gap-2">
    <Switch />
    <Switch checked />
  </div>
</Preview>

## Icons

<Preview>
  <div class="grid gap-2">
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
  </div>
</Preview>

## Disabled

<Preview>
  <div class="grid gap-2">
    <Switch disabled />
    <Switch disabled checked />
    <Switch disabled>
      <Icon path={mdiCheck} class="text-black/50" size=".8em" />
    </Switch>
  </div>
</Preview>

## checked={null}

<Preview>
  <Switch bind:checked />
  <Button on:click={() => checked = null} size="sm">reset</Button>
</Preview>

## Size

<Preview>
  <div class="grid gap-2">
    <Switch size="sm" />
    <Switch size="md" />
    <Switch size="lg" />
  </div>
</Preview>

## Color

<Preview>
  <div class="inline-grid grid-cols-[auto,auto] gap-2">
    <Switch color="red" />
    <Switch checked color="red" />
    <Switch color="green" />
    <Switch checked color="green" />
    <Switch color="purple" />
    <Switch checked color="purple" />
  </div>
</Preview>

## Custom classes

<Preview>
  <div class="grid gap-2">
    <Switch color="green" classes={{ switch: 'data-[checked=false]:bg-red-500 data-[checked=false]:border-red-500' }} />
    <Switch classes={{ switch: 'bg-white border-gray-400', toggle: 'data-[checked=false]:bg-red-500 data-[checked=true]:bg-green-500' }} />
  </div>
</Preview>

# API

<ApiDocs {api} />
