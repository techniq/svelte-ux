<script lang="ts">
  import { addYears, startOfYear, subYears } from 'date-fns';

  import Preview from '$lib/components/Preview.svelte';
  import YearList from '$lib/components/YearList.svelte';

  let selected = new Date('1982-03-30');
</script>

## Default

<Preview>
  <YearList />
</Preview>

## Selected

<Preview>
  <YearList
    {selected}
    on:dateChange={(e) => {
      selected = e.detail;
    }}
  />
</Preview>

## Selected w/ Scroll into view

<Preview>
  <div class="overflow-auto h-64">
  <YearList
    minDate={subYears(selected, 10)}
    maxDate={addYears(selected, 10)}
    {selected}
    on:dateChange={(e) => {
      selected = e.detail;
    }}
  />
  </div>
</Preview>

## Min / Max date

<Preview>
  <YearList
    minDate={startOfYear(subYears(new Date(), 3))}
    maxDate={new Date()}
  />
</Preview>
