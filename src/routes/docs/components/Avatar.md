---
component: $component
filename: $filename
---

<script>
  import { mdiAccount } from '@mdi/js';

  import api from '$lib/components/Avatar.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import AppBar from '$lib/components/AppBar.svelte';
  import Avatar from '$lib/components/Avatar.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Preview from '$lib/components/Preview.svelte';
</script>

# Examples

## Default

<Preview>
  <Avatar>A</Avatar>
</Preview>

## Color

<Preview>
  <Avatar class="bg-blue-500 text-white font-bold">A</Avatar>
</Preview>

## Border

<Preview>
  <Avatar class="border">A</Avatar>
</Preview>

## Size

<Preview>
  <Avatar class="bg-blue-500 text-white font-bold text-xs" size="sm">sm</Avatar>
  <Avatar class="bg-blue-500 text-white font-bold" size="md">md</Avatar>
  <Avatar class="bg-blue-500 text-white font-bold" size="lg">lg</Avatar>
</Preview>

## Icon (prop)

<Preview>
  <Avatar class="bg-blue-500 text-white" icon={mdiAccount} />
</Preview>

## Icon (slot)

<Preview>
  <Avatar class="bg-blue-500">
    <Icon path={mdiAccount} class="text-white" />
  </Avatar>
</Preview>

# API

<ApiDocs {api} />
