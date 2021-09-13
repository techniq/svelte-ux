<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { mdiCalendar, mdiChevronLeft, mdiChevronRight } from '@mdi/js';

	import Button from './Button.svelte';
	import Field from './Field.svelte';
	import Dialog from './Dialog.svelte';
	import { getDateFuncsByPeriodType, PeriodType } from '$lib/utils/date';
	import DateSelect from './DateSelect.svelte';
	import { dateDisplay } from '$lib/utils/dateDisplay';

	const dispatch = createEventDispatcher();

	export let value: Date | null = null;
	export let periodType: PeriodType = PeriodType.Day;
	export let iconOnly: boolean = false;
	export let stepper: boolean = false;

	// Field props
	export let label: string | null = null;
	// export let value = '';
	export let error = '';
	export let hint = '';
	export let disabled = false;
	// export let clearable = false;
	export let base = false;
	export let rounded = false;
	export let filled = false;
	export let dense = false;
	export let icon: string | null = null;
	export let center = false;

	let open: boolean = false;

	// let format: string = 'EEE, MMM d';
	// Show "Day of Week", "Year", etc based on perioType (see DayStepper, MonthStepper)
	let primaryFormat = '';
	let secondaryFormat = '';

	$: switch (periodType) {
		case PeriodType.Month:
			primaryFormat = 'MMMM';
			secondaryFormat = 'yyyy';
			break;
		case PeriodType.Day:
		default:
			primaryFormat = 'MMMM do, yyyy';
			secondaryFormat = 'eeee';
	}

	$: currentValue = value;
</script>

<div>
	<Dialog bind:open>
		<div class="flex flex-col justify-center bg-accent-500 text-white px-6 h-24">
			<div class="text-sm text-white/50">
				{dateDisplay(currentValue, { format: secondaryFormat })}
			</div>
			<div class="text-3xl text-white">
				{dateDisplay(currentValue, { format: primaryFormat })}
			</div>
		</div>

		<div class="p-2 w-80">
			<DateSelect
				bind:selected={currentValue}
				{periodType}
				on:dateChange={(e) => (currentValue = e.detail)}
			/>
		</div>

		<div slot="actions">
			<Button
				on:click={() => {
					open = false;
					value = currentValue;
					dispatch('change', value);
				}}
				class="text-blue-500 hover:bg-blue-500">OK</Button
			>
			<Button
				on:click={() => {
					open = false;
					currentValue = value;
				}}>Cancel</Button
			>
		</div>
	</Dialog>

	{#if iconOnly}
		<Button icon={mdiCalendar} on:click={() => (open = true)} />
	{:else}
		<Field
			label={label ?? dateDisplay(value, { format: secondaryFormat })}
			icon={icon ?? center ? undefined : mdiCalendar}
			{error}
			{hint}
			{disabled}
			{base}
			{rounded}
			{filled}
			{dense}
			{center}
			let:id
		>
			<span slot="prepend">
				{#if stepper}
					<Button
						icon={mdiChevronLeft}
						class="p-2"
						on:click={() => {
							if (value && periodType) {
								const { add } = getDateFuncsByPeriodType(periodType);
								value = add(value, -1);
								dispatch('change', value);
							}
						}}
					/>
				{/if}
			</span>

			<button
				class="text-sm whitespace-nowrap w-full focus:outline-none"
				style="text-align: inherit"
				on:click={() => (open = true)}
				{id}
			>
				{dateDisplay(value, { format: primaryFormat })}
			</button>

			<div slot="append">
				{#if stepper}
					<Button
						icon={mdiChevronRight}
						class="p-2"
						on:click={() => {
							if (value && periodType) {
								const { add } = getDateFuncsByPeriodType(periodType);
								value = add(value, 1);
								dispatch('change', value);
							}
						}}
					/>
				{/if}
			</div>
		</Field>
	{/if}
</div>
