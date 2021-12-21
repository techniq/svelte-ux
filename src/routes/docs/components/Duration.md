---
component: $component
filename: $filename
---

<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';

	import { getDuration, humanizeDuration } from '$lib/utils/duration';
</script>

## Duration

<Preview>{JSON.stringify(getDuration(subDays(new Date(), 3)), null, 2)}</Preview>

## Humanize Duration

<Preview>
	<div>{humanizeDuration({ start: subDays(new Date(), 3) })}</div>
	<div>{humanizeDuration({ start: subMonths(new Date(), 3) })}</div>
	<div>{humanizeDuration({ start: subMonths(new Date(), 3), variant: 'long' })}</div>
</Preview>

## Humanize Duration (string)

<Preview>
	<div>{humanizeDuration({ start: '1982-03-30' })}</div>
	<div>{humanizeDuration({ start: '2021-01-01', end: '2021-01-07' })}</div>
</Preview>
