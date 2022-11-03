---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import api from '$lib/components/Selection.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Checkbox from '$lib/components/Checkbox.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Radio from '$lib/components/Radio.svelte';
  import Selection from '$lib/components/Selection.svelte';

	const items = Array.from({ length: 5 }).map((_,i) => {
    return {
      id: i + 1
    }
  });
</script>

# Examples

## Basic

<Preview>
	<Selection let:selected let:isSelected let:toggleSelected>
		{#each items as item}
			<div>
				<Checkbox checked={isSelected(item.id)} on:change={() => toggleSelected(item.id)}>
					{item.id}
				</Checkbox>
			</div>
		{/each}
		result: {JSON.stringify(selected)}
	</Selection>
</Preview>

## Initial selection

<Preview>
	<Selection initial={[1,2,3]} let:selected let:isSelected let:toggleSelected>
		{#each items as item}
			<div>
				<Checkbox checked={isSelected(item.id)} on:change={() => toggleSelected(item.id)}>
					{item.id}
				</Checkbox>
			</div>
		{/each}
		result: {JSON.stringify(selected)}
	</Selection>
</Preview>

## Select all

<Preview>
	<Selection all={items.map((item) => item.id)} let:isAnySelected let:isPartialSelected let:toggleAll let:selected let:isSelected let:toggleSelected>
	  <Checkbox checked={isAnySelected()} indeterminate={isPartialSelected()} on:change={() => toggleAll()}>
			Select all
		</Checkbox>
		{#each items as item}
			<div>
				<Checkbox checked={isSelected(item.id)} on:change={() => toggleSelected(item.id)}>
					{item.id}
				</Checkbox>
			</div>
		{/each}
		result: {JSON.stringify(selected)}
	</Selection>
</Preview>

## Single

<Preview>
	<Selection single let:selected let:toggleSelected>
		{#each items as item}
			<div>
				<Radio group={selected[0]} value={item.id} on:change={() => toggleSelected(item.id)}>
					{item.id}
				</Radio>
			</div>
		{/each}
		result: {JSON.stringify(selected)}
	</Selection>
</Preview>

# API

<ApiDocs {api} />
