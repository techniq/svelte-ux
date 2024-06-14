<script lang="ts">
	import { Checkbox, Radio, selectionStore } from 'svelte-ux';
	import Preview from '$lib/components/Preview.svelte';

  const data = Array.from({ length: 5 }).map((_,i) => {
    return {
      id: i + 1
    }
  });

  const selection = selectionStore()
  const selection2 = selectionStore({ initial: [3,4,5]})
  const selection3 = selectionStore({ all: data.map(d => d.id)});
  const selection4 = selectionStore({ single: true });
  const selection5 = selectionStore({ max: 3 });
</script>

<h1>Usage</h1>

<h2>Max</h2>

```js
const selection = selectionStore({ max: 3 });
```

<Preview>
  {#each data as d}
    <div>
      <Checkbox checked={$selection5.isSelected(d.id)} on:change={() => $selection5.toggleSelected(d.id)} disabled={$selection5.isDisabled(d.id)}>
        {d.id}
      </Checkbox>
    </div>
  {/each}
  selected: {JSON.stringify($selection5.selected)}
</Preview>

<h2>Basic</h2>

```js
const selection = selectionStore();
```

<Preview>
  {#each data as d}
    <div>
      <Checkbox checked={$selection.isSelected(d.id)} on:change={() => $selection.toggleSelected(d.id)}>
        {d.id}
      </Checkbox>
    </div>
  {/each}
  selected: {JSON.stringify($selection.selected)}
</Preview>

<h2>Initial selection</h2>

```js
const selection2 = selectionStore({ initial: [1, 2, 3] });
```

<Preview>
  {#each data as d}
    <div>
      <Checkbox checked={$selection2.isSelected(d.id)} on:change={() => $selection2.toggleSelected(d.id)}>
        {d.id}
      </Checkbox>
    </div>
  {/each}
  selected: {JSON.stringify($selection2.selected)}
</Preview>

<h2>Select all</h2>

```js
const selection3 = selectionStore({ all: data.map((d) => d.id) });
```

<Preview>
  <Checkbox checked={$selection3.isAnySelected()} indeterminate={!$selection3.isAllSelected()} on:change={() => $selection3.toggleAll()}>
    Select all
  </Checkbox>
  {#each data as d}
    <div>
      <Checkbox checked={$selection3.isSelected(d.id)} on:change={() => $selection3.toggleSelected(d.id)}>
        {d.id}
      </Checkbox>
    </div>
  {/each}
  selected: {JSON.stringify($selection3.selected)}
</Preview>

<h2>Single</h2>

```js
const selection4 = selectionStore({ single: true });
```

<Preview>
  {#each data as d}
    <div>
      <Radio group={$selection4.selected} value={d.id} on:change={() => $selection4.toggleSelected(d.id)}>
        {d.id}
      </Radio>
    </div>
  {/each}
  selected: {JSON.stringify($selection4.selected)}
</Preview>
