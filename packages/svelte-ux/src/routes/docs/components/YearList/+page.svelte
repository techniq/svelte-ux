<script lang="ts">
  import { addYears, startOfYear, subYears } from 'date-fns';

  import { YearList } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';

  let selected = $state(new Date('1982-03-30'));
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
    onDateChange={(value) => {
      selected = value;
    }}
  />
</Preview>

<h2>Selected w/ Scroll into view</h2>

<Preview>
  <div class="overflow-auto h-64">
    <YearList
      minDate={subYears(selected, 10)}
      maxDate={addYears(selected, 10)}
      {selected}
      onDateChange={(value) => {
        selected = value;
      }}
    />
  </div>
</Preview>

<h2>Min / Max date</h2>

<Preview>
  <YearList minDate={startOfYear(subYears(new Date(), 3))} maxDate={new Date()} />
</Preview>
