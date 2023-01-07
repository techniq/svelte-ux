---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
	import api from '$lib/components/Paginate.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Preview from '$lib/components/Preview.svelte';

	const items = Array(100).fill().map((x, i) => ({ name: `Item: ${i + 1}`}))
</script>

# Examples

## Default

<Preview>
	<div class="h-[400px] p-1 overflow-auto">
		<InfiniteScroll {items} let:item>
			<ListItem title={item.name} />
		</InfiniteScroll>
	</div>
</Preview>

## Per page

<Preview>
	<div class="h-[400px] p-1 overflow-auto">
		<InfiniteScroll {items} perPage={5} let:item>
			<ListItem title={item.name} />
		</InfiniteScroll>
	</div>
</Preview>

# API

<ApiDocs {api} />
