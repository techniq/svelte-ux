<script lang="ts">
  import { intervalOffset, startOfInterval } from '@layerstack/utils';

  import { YearList } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let selected = new Date('1982-03-30');
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <YearList />
</Preview>

<h2>Selected</h2>

<Preview>
  <YearList
    {selected}
    on:dateChange={(e) => {
      selected = e.detail;
    }}
  />
</Preview>

<h2>Selected w/ Scroll into view</h2>

<Preview>
  <div class="overflow-auto h-64">
    <YearList
      minDate={intervalOffset('year', selected, -10)}
      maxDate={intervalOffset('year', selected, 10)}
      {selected}
      on:dateChange={(e) => {
        selected = e.detail;
      }}
    />
  </div>
</Preview>

<h2>Min / Max date</h2>

<Preview>
  <YearList
    minDate={startOfInterval('year', intervalOffset('year', new Date(), -3))}
    maxDate={new Date()}
  />
</Preview>
