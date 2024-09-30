<script lang="ts">
  /*
    TODO:
      - [ ] Set max-height / overflow on MonthListByYear, YearList
  */
  import { startOfMonth as startOfMonthFunc } from 'date-fns';
  import { PeriodType, type DisabledDate, type SelectedDate } from '@layerstack/utils';

  import Month from './Month.svelte';
  import MonthListByYear from './MonthListByYear.svelte';
  import YearList from './YearList.svelte';

  export let selected: SelectedDate = null;
  export let periodType: PeriodType = PeriodType.Day;
  export let activeDate: 'from' | 'to' = 'from';

  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  // @ts-expect-error
  $: startOfMonth = selected?.[activeDate] ? startOfMonthFunc(selected[activeDate]) : undefined;
</script>

{#if periodType === PeriodType.Month || periodType === PeriodType.Quarter}
  <MonthListByYear {selected} on:dateChange />
{:else if periodType === PeriodType.CalendarYear}
  <YearList {selected} {disabledDates} on:dateChange />
{:else if periodType === PeriodType.FiscalYearOctober}
  <!-- dateFuncs={{
        startOfYear: startOfFiscalYear,
        endOfYear: endOfFiscalYear,
        isSameYear: isSameFiscalYear,
        getYear: getFiscalYear,
      }} -->
  <YearList {selected} {disabledDates} on:dateChange />
{:else}
  <!-- Day, Week, etc -->
  <Month {selected} {disabledDates} {startOfMonth} on:dateChange />
{/if}
