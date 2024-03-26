<script lang="ts">
  import { subDays, subMonths } from 'date-fns';

  import Preview from '$lib/components/Preview.svelte';

  import { getDuration, humanizeDuration, DurationUnits } from '$lib/utils/duration.js';
</script>

<h1>Examples</h1>

<h2>humanizeDuration()</h2>

<h3>Date</h3>

<Preview>
  <div>{humanizeDuration({ start: subDays(new Date(), 3) })}</div>
  <div>{humanizeDuration({ start: subMonths(new Date(), 3) })}</div>
  <div>{humanizeDuration({ start: subMonths(new Date(), 3), variant: 'long' })}</div>
</Preview>

<h3>string</h3>

<Preview>
  <div>{humanizeDuration({ start: '1982-03-30' })}</div>
  <div>{humanizeDuration({ start: '2021-01-01', end: '2021-01-07' })}</div>
  <div>{humanizeDuration({ start: '1982-03-30', totalUnits: 2 })}</div>
  <div>{humanizeDuration({ start: '1982-03-30', minUnits: DurationUnits.Hour })}</div>
</Preview>

<h3>duration object</h3>

<Preview>
  <div>{humanizeDuration({ duration: { milliseconds: 300 } })}</div>
  <div>{humanizeDuration({ duration: { hours: 1, minutes: 30 } })}</div>
  <div>{humanizeDuration({ duration: { days: 5, hours: 26 } })}</div>
</Preview>

<h3>Leap year comparison</h3>

<Preview>
  <div>{humanizeDuration({ start: new Date('2023-02-28'), end: new Date('2023-03-01') })}</div>
  <div>{humanizeDuration({ start: new Date('2024-02-28'), end: new Date('2024-03-01') })}</div>
</Preview>

<h2>getDuration()</h2>

<Preview class="whitespace-pre">
  {JSON.stringify(getDuration(subDays(new Date(), 3)), null, 2)}
</Preview>
