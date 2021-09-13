<script lang="ts">
  import Preview from '../components/Preview.svelte';
  import DateRange from '../components/DateRange.svelte';
  import { PeriodType } from '../utils/date';

  let selected = {
    from: new Date('1982-03-01T00:00:00'),
    to: new Date('1982-03-30T23:59:59'),
    periodType: 10,
  };
  // $: console.log({ selected });
</script>

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
