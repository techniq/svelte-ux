<script lang="ts">
	import api from '$lib/components/Lazy.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import Lazy from '$lib/components/Lazy.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Preview from '$lib/components/Preview.svelte';

	const items = Array(100).fill().map((x, i) => ({ name: `Item: ${i + 1}`}))
</script>

# Examples

## Default

<Preview>
	<div class="h-[400px] p-1 overflow-auto">
		{#each items as item}
			<Lazy height="40px" class="group">
				<ListItem title={item.name} list="group" />
			</Lazy>
		{/each}
	</div>
</Preview>

# API

<ApiDocs {api} />
