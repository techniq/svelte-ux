---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import { addYears, startOfYear, subYears } from 'date-fns';

  import api from '$lib/components/MonthListByYear.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import MonthListByYear from '$lib/components/MonthListByYear.svelte';
  import Preview from '$lib/components/Preview.svelte';

  let selected = new Date('1982-03-30');
</script>

# Examples

## Default

<Preview>
  <MonthListByYear />
</Preview>

## Selected

<Preview>
  <MonthListByYear
    {selected}
    on:dateChange={(e) => {
      selected = e.detail;
    }}
  />
</Preview>

## Selected w/ Scroll into view

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

## Min / Max date

<Preview>
  <MonthListByYear
    minDate={startOfYear(subYears(new Date(), 3))}
    maxDate={new Date()}
  />
</Preview>

# API

<ApiDocs {api} />
