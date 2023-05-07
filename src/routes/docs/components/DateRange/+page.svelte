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

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <DateRange />
</Preview>

<h2>PeriodType options</h2>

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

<h2>Controlled</h2>

<Preview>
  <DateRange bind:selected />
</Preview>

<h1>API</h1>

<ApiDocs {api} />
