<script lang="ts">
	import { subDays, subMonths } from 'date-fns';

	import Preview from '$lib/components/Preview.svelte';

	import { humanizeDuration } from '$lib/utils/duration';
</script>

## 3 days ago

<Preview>{humanizeDuration({ start: subDays(new Date(), 3) })}</Preview>

## 3 months ago w/ default

<Preview>{humanizeDuration({ start: subMonths(new Date(), 3) })}</Preview>

## 3 months ago w/ long variant

<Preview>
	{humanizeDuration({ start: subMonths(new Date(), 3), variant: 'long' })}
</Preview>
