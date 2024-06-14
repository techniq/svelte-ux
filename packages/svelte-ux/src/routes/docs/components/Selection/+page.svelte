<script lang="ts">
  import { Button, Checkbox, Paginate, Pagination, Radio, Selection } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  const data = Array.from({ length: 5 }).map((_, i) => {
    return {
      id: i + 1,
    };
  });
  const data2 = Array.from({ length: 50 }).map((_, i) => {
    return {
      id: i + 1,
    };
  });
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <Selection let:selected let:isSelected let:toggleSelected>
    {#each data as d}
      <div>
        <Checkbox checked={isSelected(d.id)} on:change={() => toggleSelected(d.id)}>
          {d.id}
        </Checkbox>
      </div>
    {/each}
    selected: {JSON.stringify(selected)}
  </Selection>
</Preview>

<h2>Initial selection</h2>

<Preview>
  <Selection initial={[1, 2, 3]} let:selected let:isSelected let:toggleSelected>
    {#each data as d}
      <div>
        <Checkbox checked={isSelected(d.id)} on:change={() => toggleSelected(d.id)}>
          {d.id}
        </Checkbox>
      </div>
    {/each}
    selected: {JSON.stringify(selected)}
  </Selection>
</Preview>

<h2>Select all</h2>

<Preview>
  <Selection
    all={data.map((d) => d.id)}
    let:isAnySelected
    let:isAllSelected
    let:toggleAll
    let:selected
    let:isSelected
    let:toggleSelected
  >
    <Checkbox
      checked={isAnySelected()}
      indeterminate={!isAllSelected()}
      on:change={() => toggleAll()}
    >
      Select all
    </Checkbox>
    {#each data as d}
      <div>
        <Checkbox checked={isSelected(d.id)} on:change={() => toggleSelected(d.id)}>
          {d.id}
        </Checkbox>
      </div>
    {/each}
    selected: {JSON.stringify(selected)}
  </Selection>
</Preview>

<h2>Select all (paginated)</h2>

<Preview>
  <Paginate data={data2} perPage={5} let:pagination let:pageData>
    <Selection
      all={pageData.map((d) => d.id)}
      let:selected
      let:isAnySelected
      let:isAllSelected
      let:toggleAll
      let:isSelected
      let:toggleSelected
      let:clear
    >
      <Checkbox
        checked={isAnySelected()}
        indeterminate={!isAllSelected()}
        on:change={() => toggleAll()}
      >
        Select all
      </Checkbox>
      {#each pageData as d}
        <div>
          <Checkbox checked={isSelected(d.id)} on:change={() => toggleSelected(d.id)}>
            {d.id}
          </Checkbox>
        </div>
      {/each}
      {#if pageData.length > 0}
        <Pagination {pagination} />
      {/if}
      selected: {JSON.stringify(selected)}
      <Button on:click={() => clear()}>clear</Button>
    </Selection>
  </Paginate>
</Preview>

<h2>Single</h2>

<Preview>
  <Selection single let:selected let:toggleSelected>
    {#each data as d}
      <div>
        <Radio group={selected} value={d.id} on:change={() => toggleSelected(d.id)}>
          {d.id}
        </Radio>
      </div>
    {/each}
    selected: {JSON.stringify(selected)}
  </Selection>
</Preview>
