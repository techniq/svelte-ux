---
component: $component
filename: $filename
---

<script lang="ts">
	import { mdiAccount } from '@mdi/js';

	import api from '$lib/components/Icon.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import Icon from '$lib/components/Icon.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

# Examples

## Material design icons

<Preview>
	<Icon path={mdiAccount} />
</Preview>

## Sizes

<Preview>
	<Icon path={mdiAccount} size="8px" />
	<Icon path={mdiAccount} size="1em" />
	<Icon path={mdiAccount} size="1.5em" />
	<Icon path={mdiAccount} size="2em" />
	<Icon path={mdiAccount} size="2.5em" />
	<Icon path={mdiAccount} size="3em" />
	<Icon path={mdiAccount} size="64px" />
</Preview>

## Color

<Preview>
	<Icon path={mdiAccount} class="text-red-500" />
	<Icon path={mdiAccount} class="text-blue-500" />
	<Icon path={mdiAccount} class="text-green-500" />
	<Icon path={mdiAccount} class="text-black/50" />
</Preview>

# API

<ApiDocs {api} />
