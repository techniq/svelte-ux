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
  <Selection>
    {#snippet children({ selected, isSelected, toggleSelected })}
      {#each data as d}
        <div>
          <Checkbox checked={isSelected(d.id)} onChange={() => toggleSelected(d.id)}>
            {d.id}
          </Checkbox>
        </div>
      {/each}
      selected: {JSON.stringify(selected)}
    {/snippet}
  </Selection>
</Preview>

<h2>Initial selection</h2>

<Preview>
  <Selection initial={[1, 2, 3]}>
    {#snippet children({ selected, isSelected, toggleSelected })}
      {#each data as d}
        <div>
          <Checkbox checked={isSelected(d.id)} onChange={() => toggleSelected(d.id)}>
            {d.id}
          </Checkbox>
        </div>
      {/each}
      selected: {JSON.stringify(selected)}
    {/snippet}
  </Selection>
</Preview>

<h2>Select all</h2>

<Preview>
  <Selection all={data.map((d) => d.id)}>
    {#snippet children({
      isAnySelected,
      isAllSelected,
      toggleAll,
      selected,
      isSelected,
      toggleSelected,
    })}
      <Checkbox
        checked={isAnySelected()}
        indeterminate={!isAllSelected()}
        onChange={() => toggleAll()}
      >
        Select all
      </Checkbox>
      {#each data as d}
        <div>
          <Checkbox checked={isSelected(d.id)} onChange={() => toggleSelected(d.id)}>
            {d.id}
          </Checkbox>
        </div>
      {/each}
      selected: {JSON.stringify(selected)}
    {/snippet}
  </Selection>
</Preview>

<h2>Select all (paginated)</h2>

<Preview>
  <Paginate data={data2} perPage={5}>
    {#snippet children({ pagination, pageData })}
      <Selection all={pageData.map((d) => d.id)}>
        {#snippet children({
          selected,
          isAnySelected,
          isAllSelected,
          toggleAll,
          isSelected,
          toggleSelected,
          clear,
        })}
          <Checkbox
            checked={isAnySelected()}
            indeterminate={!isAllSelected()}
            onChange={() => toggleAll()}
          >
            Select all
          </Checkbox>
          {#each pageData as d}
            <div>
              <Checkbox checked={isSelected(d.id)} onChange={() => toggleSelected(d.id)}>
                {d.id}
              </Checkbox>
            </div>
          {/each}
          {#if pageData.length > 0}
            <Pagination paginationStore={pagination} />
          {/if}
          selected: {JSON.stringify(selected)}
          <Button onclick={() => clear()}>clear</Button>
        {/snippet}
      </Selection>
    {/snippet}
  </Paginate>
</Preview>

<h2>Single</h2>

<Preview>
  <Selection single>
    {#snippet children({ selected, toggleSelected })}
      {#each data as d}
        <div>
          <Radio group={selected} value={d.id} onchange={() => toggleSelected(d.id)}>
            {d.id}
          </Radio>
        </div>
      {/each}
      selected: {JSON.stringify(selected)}
    {/snippet}
  </Selection>
</Preview>

<h2>change event</h2>

<Preview>
  <Selection onChange={(value) => console.log(value)}>
    {#snippet children({ selected, isSelected, toggleSelected })}
      {#each data as d}
        <div>
          <Checkbox checked={isSelected(d.id)} onChange={() => toggleSelected(d.id)}>
            {d.id}
          </Checkbox>
        </div>
      {/each}
      selected: {JSON.stringify(selected)}
    {/snippet}
  </Selection>
</Preview>
