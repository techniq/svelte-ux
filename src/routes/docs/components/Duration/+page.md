<script lang="ts">
	import { subDays, subMonths, subSeconds } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';

	import Duration from '$lib/components/Duration.svelte';
	import { getDuration, humanizeDuration, DurationUnits } from '$lib/utils/duration';
</script>

<h1>Examples</h1>

<h2>Duration</h2>

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

<h2>Fixed range</h2>

<Preview>
	<Duration start={subDays(new Date(), 3)} end={subDays(new Date(), 1)} />
</Preview>

<h2>Explicit duration</h2>

<Preview>
	<Duration duration={{ milliseconds: 54321 }} />
</Preview>

<h1>Utils</h1>

<h2>humanizeDuration</h2>

<h3>date</h3>

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

<h3>duration</h3>

<Preview>
	<div>{humanizeDuration({ duration: { milliseconds: 300 } })}</div>
	<div>{humanizeDuration({ duration: { hours: 1, minutes: 30 } })}</div>
	<div>{humanizeDuration({ duration: { days: 5, hours: 26 } })}</div>
</Preview>

<h2>getDuration</h2>

<Preview>{JSON.stringify(getDuration(subDays(new Date(), 3)), null, 2)}</Preview>
