<script lang="ts">
  import { addYears, startOfYear, subYears } from 'date-fns';

  import api from '$lib/components/MonthListByYear.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import MonthListByYear from '$lib/components/MonthListByYear.svelte';
  import Preview from '$lib/components/Preview.svelte';

  let selected = new Date('1982-03-30');
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <MonthListByYear />
</Preview>

<h2>Selected</h2>

<Preview>
  <MonthListByYear
    {selected}
    on:dateChange={(e) => {
      selected = e.detail;
    }}
  />
</Preview>

<h2>Selected w/ Scroll into view</h2>

<Preview>
  <div class="overflow-auto h-64">
  <MonthListByYear
    minDate={subYears(selected, 10)}
    maxDate={addYears(selected, 10)}
    {selected}
    on:dateChange={(e) => {
      selected = e.detail;
    }}
  />
  </div>
</Preview>

<h2>Min / Max date</h2>

<Preview>
  <MonthListByYear
    minDate={startOfYear(subYears(new Date(), 3))}
    maxDate={new Date()}
  />
</Preview>

<h1>API</h1>

<ApiDocs {api} />
