---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Radio from '$lib/components/Radio.svelte';

	import selectionStore from '$lib/stores/selectionStore';

  const items = Array.from({ length: 5 }).map((_,i) => {
    return {
      id: i + 1
    }
  });

  const selection = selectionStore()
  const selection2 = selectionStore({ initial: [3,4,5]})
  const selection3 = selectionStore({ all: items.map(item => item.id)});
  const selection4 = selectionStore({ single: true });
</script>

## Basic

```js
const selection = selectionStore();
```

<Preview>
  {#each items as item}
    <div>
      <Checkbox checked={$selection.isSelected(item.id)} on:change={() => $selection.toggleSelected(item.id)}>
        {item.id}
      </Checkbox>
    </div>
  {/each}
  selected: {JSON.stringify($selection.selected)}
</Preview>

## Initial selection

```js
const selection2 = selectionStore({ initial: [1, 2, 3] });
```

<Preview>
  {#each items as item}
    <div>
      <Checkbox checked={$selection2.isSelected(item.id)} on:change={() => $selection2.toggleSelected(item.id)}>
        {item.id}
      </Checkbox>
    </div>
  {/each}
  selected: {JSON.stringify($selection2.selected)}
</Preview>

## Select all

```js
const selection3 = selectionStore({ all: items.map((item) => item.id) });
```

<Preview>
  <Checkbox checked={$selection3.isAnySelected()} indeterminate={!$selection3.isAllSelected()} on:change={() => $selection3.toggleAll()}>
    Select all
  </Checkbox>
  {#each items as item}
    <div>
      <Checkbox checked={$selection3.isSelected(item.id)} on:change={() => $selection3.toggleSelected(item.id)}>
        {item.id}
      </Checkbox>
    </div>
  {/each}
  selected: {JSON.stringify($selection3.selected)}
</Preview>

## Single

```js
const selection4 = selectionStore({ single: true });
```

<Preview>
  {#each items as item}
    <div>
      <Radio group={$selection4.selected} value={item.id} on:change={() => $selection4.toggleSelected(item.id)}>
        {item.id}
      </Radio>
    </div>
  {/each}
  selected: {JSON.stringify($selection4.selected)}
</Preview>
