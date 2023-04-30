<script>
  import api from '$lib/components/Selection.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Paginate from '$lib/components/Paginate.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import Radio from '$lib/components/Radio.svelte';
  import Selection from '$lib/components/Selection.svelte';

	const items = Array.from({ length: 5 }).map((_,i) => {
    return {
      id: i + 1
    }
  });
	const manyItems = Array.from({ length: 50 }).map((_,i) => {
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
		selected: {JSON.stringify(selected)}
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
		selected: {JSON.stringify(selected)}
	</Selection>
</Preview>

## Select all

<Preview>
	<Selection all={items.map((item) => item.id)} let:isAnySelected let:isAllSelected let:toggleAll let:selected let:isSelected let:toggleSelected>
	  <Checkbox checked={isAnySelected()} indeterminate={!isAllSelected()} on:change={() => toggleAll()}>
			Select all
		</Checkbox>
		{#each items as item}
			<div>
				<Checkbox checked={isSelected(item.id)} on:change={() => toggleSelected(item.id)}>
					{item.id}
				</Checkbox>
			</div>
		{/each}
		selected: {JSON.stringify(selected)}
	</Selection>
</Preview>

## Select all (paginated)

<Preview>
	<Paginate items={manyItems} perPage={5} let:pagination let:pageItems>
		<Selection all={pageItems.map((item) => item.id)} let:selected let:isAnySelected let:isAllSelected let:toggleAll let:isSelected let:toggleSelected let:clear>
			<Checkbox checked={isAnySelected()} indeterminate={!isAllSelected()} on:change={() => toggleAll()}>
				Select all
			</Checkbox>
			{#each pageItems as item}
				<div>
					<Checkbox checked={isSelected(item.id)} on:change={() => toggleSelected(item.id)}>
						{item.id}
					</Checkbox>
				</div>
			{/each}
			{#if pageItems.length > 0}
				<Pagination {pagination} />
			{/if}
			selected: {JSON.stringify(selected)}
			<Button on:click={() => clear()}>clear</Button>
		</Selection>
	</Paginate>
</Preview>

## Single

<Preview>
	<Selection single let:selected let:toggleSelected>
		{#each items as item}
			<div>
				<Radio group={selected} value={item.id} on:change={() => toggleSelected(item.id)}>
					{item.id}
				</Radio>
			</div>
		{/each}
		selected: {JSON.stringify(selected)}
	</Selection>
</Preview>

# API

<ApiDocs {api} />
