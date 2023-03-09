---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
	import { mdiAccount, mdiCheck, mdiDecagramOutline, mdiLoading, mdiDownload, mdiHeart, mdiCircleMedium, mdiArrowRight } from '@mdi/js';
	import { faUser } from '@fortawesome/free-solid-svg-icons'

	import api from '$lib/components/Icon.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import Icon from '$lib/components/Icon.svelte';
	import Preview from '$lib/components/Preview.svelte';

	const mdiAccountUrl = 'https://api.iconify.design/mdi:account.svg'
</script>

# Examples

## Material Design icons

<Preview>
	<Icon path={mdiAccount} />
	<Icon data={mdiAccount} />
	<Icon svg={'<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>'} />
	<Icon svgUrl="https://api.iconify.design/mdi:account.svg" />
	<Icon>
		<svg width="32" height="32" viewBox="0 0 24 24">
			<path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z" />
		</svg>
	</Icon>
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
	<Icon svgUrl="https://api.iconify.design/mdi:account.svg" size="64px" />
</Preview>

## Color

<Preview>
	<Icon path={mdiAccount} class="text-red-500" />
	<Icon path={mdiAccount} class="text-blue-500" />
	<Icon path={mdiAccount} class="text-green-500" />
	<Icon path={mdiAccount} class="text-black/50" />
	<Icon svgUrl="https://api.iconify.design/mdi:account.svg" class="text-red-500" />
	<Icon svg={'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>'} class="fill-red-500" />
	
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
	<Icon svgUrl="https://api.iconify.design/mdi:account.svg" class="-scale-y-100" />
</Preview>

## Animation

<Preview>
	<Icon path={mdiLoading} class="animate-spin" />
	<Icon path={mdiHeart} class="animate-pulse" />
	<Icon path={mdiCircleMedium} class="animate-ping" />
	<Icon path={mdiDownload} class="animate-bounce" />
</Preview>

# API

<ApiDocs {api} />
