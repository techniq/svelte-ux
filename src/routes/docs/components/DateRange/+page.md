---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import api from '$lib/components/DateRange.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Preview from '$lib/components/Preview.svelte';
  import DateRange from '$lib/components/DateRange.svelte';
  import { PeriodType } from '$lib/utils/date';

  let selected = {
    from: new Date('1982-03-01T00:00:00'),
    to: new Date('1982-03-30T23:59:59'),
    periodType: 10,
  };
  // $: console.log({ selected });
</script>

# Examples

## Default

<Preview>
  <DateRange />
</Preview>

## PeriodType options

<Preview>
  <DateRange
    periodTypeOptions={[
      PeriodType.Month,
      PeriodType.Quarter,
      PeriodType.CalendarYear,
      PeriodType.FiscalYearOctober,
    ]}
  />
</Preview>

## Controlled

<Preview>
  <DateRange bind:selected />
</Preview>

# API

<ApiDocs {api} />
