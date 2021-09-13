<script lang="ts">
	import {
		startOfDay as startOfDayFunc,
		endOfDay as endOfDayFunc,
		startOfMonth as startOfMonthFunc,
		endOfMonth as endOfMonthFunc,
		format,
		addMonths,
		subMonths,
		isSameDay,
		isWithinInterval
	} from 'date-fns';

	import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

	import { getMonthDaysByWeek, PeriodType } from '$lib/utils/date';
	import type { SelectedDate } from '$lib/utils/date';
	import { hasKeyOf } from '$lib/utils/typeGuards';

	import Button from './Button.svelte';
	import DateButton from './DateButton.svelte';
	import Grid from './Grid.svelte';
	import Stack from './Stack.svelte';

	export let selected: SelectedDate | undefined = undefined;

	export let startOfMonth =
		(selected instanceof Date && startOfMonthFunc(selected)) ||
		(selected instanceof Array && selected.length && startOfMonthFunc(selected[0])) ||
		(selected &&
			hasKeyOf<{ from: Date }>(selected, 'from') &&
			selected.from &&
			startOfMonthFunc(selected.from)) ||
		startOfMonthFunc(new Date());

	// TODO: Variable shows error if set to `endOfMonth` maybe due to import
	$: endOfMonth2 = endOfMonthFunc(startOfMonth);
	$: monthDaysByWeek = getMonthDaysByWeek(startOfMonth);

	export let showOutsideDays: boolean | undefined = undefined;
	export let disabledDays: any = undefined; // TODO: Improve types - See isDayDisabled

	$: isDayDisabled = (date: Date) => {
		return disabledDays instanceof Function
			? disabledDays(date)
			: disabledDays instanceof Date
			? isSameDay(date, disabledDays)
			: disabledDays instanceof Array
			? disabledDays.some((d) => isSameDay(date, d))
			: disabledDays instanceof Object
			? isWithinInterval(date, {
					start: startOfDayFunc(disabledDays.from),
					end: endOfDayFunc(disabledDays.to || disabledDays.from)
			  })
			: false;
	};

	$: isDayHidden = (day: Date) => {
		const isCurrentMonth = isWithinInterval(day, {
			start: startOfMonth,
			end: endOfMonth2
		});
		return !isCurrentMonth && !showOutsideDays;
	};

	$: isDayFaded = (day: Date) => {
		const isCurrentMonth = isWithinInterval(day, {
			start: startOfMonth,
			end: endOfMonth2
		});
		return !isCurrentMonth && showOutsideDays;
	};
</script>

<Stack vertical>
	<div class="flex m-2">
		<Button
			icon={mdiChevronLeft}
			class="p-2"
			on:click={() => (startOfMonth = subMonths(startOfMonth, 1))}
		/>
		<div class="flex flex-1 items-center justify-center">
			<span>{format(startOfMonth, 'MMMM yyyy')}</span>
		</div>
		<Button
			icon={mdiChevronRight}
			class="p-2"
			on:click={() => (startOfMonth = addMonths(startOfMonth, 1))}
		/>
	</div>

	<div class="flex">
		{#each monthDaysByWeek[0] as day (day.getDate())}
			<div class="flex-1 text-center">
				<span class="text-xs text-black/50"> {format(day, 'eee')[0]} </span>
			</div>
		{/each}
	</div>

	<Grid columns={7} rowGap={16}>
		{#each monthDaysByWeek as week, weekIndex (weekIndex)}
			{#each week as day (day.valueOf())}
				<DateButton
					date={day}
					periodType={PeriodType.Day}
					bind:selected
					hidden={isDayHidden(day)}
					fade={isDayFaded(day)}
					disabled={isDayDisabled(day)}
					on:dateChange
				/>
			{/each}
		{/each}
	</Grid>
</Stack>
