<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { format as dateFormat, isWithinInterval } from 'date-fns';

	import cssVars from '../actions/cssVars';
	import { getDateFuncsByPeriodType, PeriodType } from '../utils/date';
	import type { SelectedDate } from '../utils/date';

	const dispatch = createEventDispatcher();

	export let date: Date;
	export let periodType: PeriodType;
	export let disabled: boolean = false;
	export let selected: SelectedDate;
	export let hidden: boolean = false;
	export let fade: boolean = false;
	export let format = getDefaultFormat(periodType);

	function getDefaultFormat(periodType: PeriodType) {
		switch (periodType) {
			case PeriodType.CalendarYear:
			case PeriodType.FiscalYearOctober:
				return 'yyyy';
			case PeriodType.Month:
				return 'MMM';
			case PeriodType.Day:
				return 'd';
			default:
				return 'MM/dd/yyyy';
		}
	}

	const { start, end, isSame } = getDateFuncsByPeriodType(periodType);

	$: isSelected =
		selected instanceof Date
			? isSame(date, selected)
			: selected instanceof Array
			? selected.some((d) => isSame(date, d))
			: selected instanceof Object
			? selected.from
				? isWithinInterval(date, {
						start: start(selected.from),
						end: end(selected.to ?? selected.from)
				  })
				: false
			: false;

	$: isSelectedStart =
		selected instanceof Date
			? isSame(date, selected)
			: selected instanceof Array
			? selected.some((d) => isSame(date, d))
			: selected instanceof Object
			? isSame(date, selected.from ?? selected.to)
			: false;

	$: isSelectedEnd =
		selected instanceof Date
			? isSame(date, selected)
			: selected instanceof Array
			? selected.some((d) => isSame(date, d))
			: selected instanceof Object
			? isSame(date, selected.to ?? selected.from)
			: false;

	$: isCurrent = isSame(date, new Date());

	$: gradientFromColor = isSelectedStart ? 'transparent' : 'var(--color-accent-500)';
	$: gradientToColor = isSelectedEnd ? 'transparent' : 'var(--color-accent-500)';
	$: styleVars = {
		'tw-gradient-stops': `${gradientFromColor} 50%, ${gradientToColor} 50%`
	};

	$: isVerticalSelection =
		periodType === PeriodType.CalendarYear || periodType === PeriodType.FiscalYearOctober;
</script>

<div
	class="inline-flex items-center justify-center"
	class:bg-gradient-to-r={isSelected && !isVerticalSelection}
	class:bg-gradient-to-b={isSelected && isVerticalSelection}
	class:opacity-0={hidden}
	class:pointer-events-none={hidden}
	use:cssVars={styleVars}
>
	<!-- TODO: Use <Button base>, although doesn't support `class:...` -->
	<button
		class="w-8 h-8 rounded-full flex items-center justify-center text-xs
      cursor-pointer hover:bg-black/5 hover:text-black
      focus:outline-none"
		class:flex-1={periodType != PeriodType.Day}
		class:bg-accent-500={isSelected}
		class:text-black={!isSelected}
		class:text-white={isSelected}
		class:text-accent-500={!isSelected && isCurrent && !disabled}
		class:text-opacity-25={fade}
		class:font-bold={isCurrent}
		class:disabled
		{disabled}
		on:click={() => {
			selected = date;
			dispatch('dateChange', date);
		}}
	>
		{dateFormat(date, format)}
	</button>
</div>

<style lang="postcss">
	.disabled {
		@apply opacity-25 pointer-events-none cursor-default;
	}
</style>
