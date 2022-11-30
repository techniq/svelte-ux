---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
	import { subDays, subMonths, subSeconds } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';

	import Duration from '$lib/components/Duration.svelte';
	import { getDuration, humanizeDuration, DurationUnits } from '$lib/utils/duration';
</script>

# Examples

## Duration

<Preview>
	<div class="grid">
		<Duration start={new Date()} />
		<Duration start={new Date()} totalUnits={1} />
		<Duration start={new Date()} totalUnits={2} />
		<Duration start={new Date()} totalUnits={2} minUnits={DurationUnits.Second} />
		<Duration start={new Date()} minUnits={DurationUnits.Minute} />
		<Duration start={subSeconds(new Date(), 55)} totalUnits={1} />
	</div>
</Preview>

## Fixed range

<Preview>
	<Duration start={subDays(new Date(), 3)} end={subDays(new Date(), 1)} />
</Preview>

## Explicit duration

<Preview>
	<Duration duration={{ milliseconds: 54321 }} />
</Preview>

# Utils

## humanizeDuration

### date

<Preview>
	<div>{humanizeDuration({ start: subDays(new Date(), 3) })}</div>
	<div>{humanizeDuration({ start: subMonths(new Date(), 3) })}</div>
	<div>{humanizeDuration({ start: subMonths(new Date(), 3), variant: 'long' })}</div>
</Preview>

### string

<Preview>
	<div>{humanizeDuration({ start: '1982-03-30' })}</div>
	<div>{humanizeDuration({ start: '2021-01-01', end: '2021-01-07' })}</div>
	<div>{humanizeDuration({ start: '1982-03-30', totalUnits: 2 })}</div>
	<div>{humanizeDuration({ start: '1982-03-30', minUnits: DurationUnits.Hour })}</div>
</Preview>

### duration

<Preview>
	<div>{humanizeDuration({ duration: { milliseconds: 300 } })}</div>
	<div>{humanizeDuration({ duration: { hours: 1, minutes: 30 } })}</div>
	<div>{humanizeDuration({ duration: { days: 5, hours: 26 } })}</div>
</Preview>

## getDuration

<Preview>{JSON.stringify(getDuration(subDays(new Date(), 3)), null, 2)}</Preview>
