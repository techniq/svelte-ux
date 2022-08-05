---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import { mdiCheck, mdiClose } from '@mdi/js';

  import api from '$lib/components/Switch.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import AppBar from '$lib/components/AppBar.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import Preview from '$lib/components/Preview.svelte';
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

## Size

<Preview>
  <div class="grid gap-2">
    <Switch size="sm" />
    <Switch size="md" />
    <Switch size="lg" />
  </div>
</Preview>

# API

<ApiDocs {api} />
