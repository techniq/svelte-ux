---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
	import { mdiAccount, mdiCheck, mdiDecagramOutline, mdiLoading, mdiDownload, mdiReload, mdiCircleMedium, mdiArrowRight } from '@mdi/js';
	import { faUser } from '@fortawesome/free-solid-svg-icons'

	import api from '$lib/components/Icon.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import Icon from '$lib/components/Icon.svelte';
	import Preview from '$lib/components/Preview.svelte';
</script>

# Examples

## Material Design icons

<Preview>
	<Icon path={mdiAccount} />
	<Icon data={mdiAccount} />
</Preview>

## Font Awesome icons

<Preview>
	<Icon data={faUser} />
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

## Multiple paths

<Preview>
	<Icon path={[mdiDecagramOutline, mdiCheck]} classes={{ path: ['', 'text-blue-500 scale-50 origin-center'] }} />
</Preview>

## Rotate / Scale / Flip

<Preview>
	<Icon path={mdiArrowRight} class="-rotate-45" />
	<Icon path={mdiArrowRight} class="scale-75" />
	<Icon path={mdiArrowRight} class="-scale-x-100" />
	<Icon path={mdiAccount} class="-scale-y-100" />
</Preview>

## Animation

<Preview>
	<Icon path={mdiLoading} class="animate-spin" />
	<Icon path={mdiReload} class="animate-pulse" />
	<Icon path={mdiCircleMedium} class="animate-ping" />
	<Icon path={mdiDownload} class="animate-bounce" />
</Preview>

# API

<ApiDocs {api} />
