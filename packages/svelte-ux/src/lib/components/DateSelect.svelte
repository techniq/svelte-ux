<script lang="ts">
  /*
    TODO:
      - [ ] Set max-height / overflow on MonthListByYear, YearList
  */
  import {
    PeriodType,
    type DisabledDate,
    type SelectedDate,
    startOfInterval,
  } from '@layerstack/utils';

  import Month from './Month.svelte';
  import MonthListByYear from './MonthListByYear.svelte';
  import YearList from './YearList.svelte';

  export let selected: SelectedDate = null;
  export let periodType: PeriodType = PeriodType.Day;
  export let activeDate: 'from' | 'to' = 'from';
  /** Use UTC boundaries rather than local ones, for both period math and display */
  export let utc = false;

  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  // @ts-expect-error
  $: startOfMonth = selected?.[activeDate]
    ? // @ts-expect-error
      startOfInterval(utc ? 'utcMonth' : 'month', selected[activeDate])
    : undefined;
</script>

{#if periodType === PeriodType.Month || periodType === PeriodType.Quarter}
  <MonthListByYear {selected} {utc} on:dateChange />
{:else if periodType === PeriodType.CalendarYear}
  <YearList {selected} {disabledDates} {utc} on:dateChange />
{:else if periodType === PeriodType.FiscalYearOctober}
  <!-- dateFuncs={{
        startOfYear: startOfFiscalYear,
        endOfYear: endOfFiscalYear,
        isSameYear: isSameFiscalYear,
        getYear: getFiscalYear,
      }} -->
  <YearList {selected} {disabledDates} {utc} on:dateChange />
{:else}
  <!-- Day, Week, etc -->
  <Month {selected} {disabledDates} {startOfMonth} {utc} on:dateChange />
{/if}
