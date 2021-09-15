<script lang="ts">
	import { isSameMonth, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

	import { getMonths, PeriodType } from '../utils/date';
	import type { SelectedDate } from '../utils/date';
	import DateButton from './DateButton.svelte';

	export let year: number | undefined = undefined;
	export let selected: SelectedDate | undefined = undefined;
	export let format: string | undefined = undefined;
	export let disabledMonths: any = undefined; // TODO: Improve types - See isMonthDisabled

	$: isMonthDisabled = (date: Date) => {
		return disabledMonths instanceof Function
			? disabledMonths(date)
			: disabledMonths instanceof Date
			? isSameMonth(date, disabledMonths)
			: disabledMonths instanceof Array
			? disabledMonths.some((d) => isSameMonth(date, d))
			: disabledMonths instanceof Object
			? isWithinInterval(date, {
					start: startOfMonth(disabledMonths.from),
					end: endOfMonth(disabledMonths.to || disabledMonths.from)
			  })
			: false;
	};
</script>

<!-- TODO: `bind:selected` not working -->
{#each getMonths(year) ?? [] as month (month.valueOf())}
	<DateButton
		date={month}
		periodType={PeriodType.Month}
		{selected}
		disabled={isMonthDisabled(month)}
		{format}
		on:dateChange
	/>
{/each}
