<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';

	import { getDuration, humanizeDuration } from '$lib/utils/duration';
</script>

## Duration

<Preview>{JSON.stringify(getDuration(subDays(new Date(), 3)), null, 2)}</Preview>

## Humanize Duration (3 days ago)

<Preview>{humanizeDuration({ start: subDays(new Date(), 3) })}</Preview>

## Humanize Duration (3 months ago)

<Preview>{humanizeDuration({ start: subMonths(new Date(), 3) })}</Preview>

## Humanize Duration (3 months ago w/ long variant)

<Preview>
	{humanizeDuration({ start: subMonths(new Date(), 3), variant: 'long' })}
</Preview>
