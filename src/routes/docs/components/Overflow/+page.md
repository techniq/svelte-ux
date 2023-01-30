---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
	import api from '$lib/components/Overflow.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import Button from '$lib/components/Button.svelte';
	import Overflow from '$lib/components/Overflow.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	let overflowItems = 1;
	const text = 'This is really long text used to demonstrate overflow.'
</script>

# Examples

## Default

<Preview>
	<Button class="border" on:click={() => overflowItems += 1}>+ item</Button>
	<Button class="border" on:click={() => overflowItems -= overflowItems > 1 ? 1 : 0}>- item</Button>
	<Overflow class="w-1/2 h-[200px] overflow-hidden" let:overflowX let:overflowY>
		<div>overflowX: {overflowX}</div>
		<div>overflowY: {overflowY}</div>
		<div class="whitespace-nowrap border border-black/20 rounded-lg bg-white">
			{#each { length: overflowItems } as _}
				<div>Resize the window to see text truncate and watch values</div>
			{/each}
		</div>
	</Overflow>
</Preview>

## Conditional tooltip

<Preview>
	<Overflow class="w-1/2 truncate border" let:overflowX>
	{#if overflowX}
		<Tooltip title={text}>{text}</Tooltip>
	{:else}
		{text}
	{/if}
	</Overflow>
</Preview>

# API

<ApiDocs {api} />
