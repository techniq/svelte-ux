<script lang="ts">
  /*
    TODO:
      - [ ] Set max-height / overflow on MonthListByYear, YearList
  */
  import { startOfMonth as startOfMonthFunc } from 'date-fns';
  import type { DisabledDate, SelectedDate } from '../utils/date.js';
  import { PeriodType } from '../utils/date.js';

  import Month from './Month.svelte';
  import MonthListByYear from './MonthListByYear.svelte';
  import YearList from './YearList.svelte';
  import type { ComponentProps } from 'svelte';

  interface Props {
    selected?: SelectedDate;
    periodType?: PeriodType;
    activeDate?: 'from' | 'to';
    /**
     * Dates to disable (not selectable)
     */
    disabledDates?: DisabledDate;
    onDateChange?: ComponentProps<typeof YearList>['onDateChange'];
  }

  let {
    selected = $bindable(),
    periodType = PeriodType.Day,
    activeDate = 'from',
    disabledDates,
    onDateChange,
  }: Props = $props();

  let startOfMonth = $derived(
    // @ts-expect-error
    selected?.[activeDate] ? startOfMonthFunc(selected[activeDate]) : undefined
  );
</script>

{#if periodType === PeriodType.Month || periodType === PeriodType.Quarter}
  <MonthListByYear {selected} on:dateChange />
{:else if periodType === PeriodType.CalendarYear}
  <YearList {selected} {disabledDates} {onDateChange} />
{:else if periodType === PeriodType.FiscalYearOctober}
  <!-- dateFuncs={{
        startOfYear: startOfFiscalYear,
        endOfYear: endOfFiscalYear,
        isSameYear: isSameFiscalYear,
        getYear: getFiscalYear,
      }} -->
  <YearList {selected} {disabledDates} {onDateChange} />
{:else}
  <!-- Day, Week, etc -->
  <Month {selected} {disabledDates} {startOfMonth} {onDateChange} />
{/if}
