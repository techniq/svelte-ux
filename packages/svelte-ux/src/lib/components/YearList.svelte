<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import {
    type DisabledDate,
    type SelectedDate,
    PeriodType,
    intervalOffset,
    isSameInterval,
    startOfInterval,
    endOfInterval,
    isDateWithin,
  } from '@layerstack/utils';
  import { getMinSelectedDate, getMaxSelectedDate } from '@layerstack/utils/date';

  import Button from './Button.svelte';
  import DateButton from './DateButton.svelte';

  export let selected: SelectedDate = undefined;
  export let minDate: Date | undefined = undefined;
  export let maxDate: Date | undefined = undefined;
  export let format: ComponentProps<DateButton>['format'] = undefined;
  /** Use UTC boundaries rather than local ones, for both period math and display */
  export let utc = false;

  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  $: yearInterval = utc ? ('utcYear' as const) : ('year' as const);
  $: getYear = (date: Date) => (utc ? date.getUTCFullYear() : date.getFullYear());

  let minYear: number;
  $: minYear =
    minYear ??
    (minDate
      ? getYear(minDate)
      : getYear(intervalOffset(yearInterval, getMinSelectedDate(selected) || new Date(), -2)));

  let maxYear: number;
  $: maxYear =
    maxYear ??
    (maxDate
      ? getYear(maxDate)
      : getYear(intervalOffset(yearInterval, getMaxSelectedDate(selected) || new Date(), 2)));

  $: years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i) ?? [];

  // TODO: Scroll into view not typically centered
  $: selectedYear = getYear(getMinSelectedDate(selected) || new Date());

  // In UTC mode the year starts have to be built from UTC fields, or flooring them with
  // `utcYear` lands in the neighbouring year.
  $: yearDates = years.map((year) => (utc ? new Date(Date.UTC(year, 0, 1)) : new Date(year, 0, 1)));

  $: isDateDisabled = (date: Date) => {
    return disabledDates instanceof Function
      ? disabledDates(date)
      : disabledDates instanceof Date
        ? isSameInterval(yearInterval, date, disabledDates)
        : disabledDates instanceof Array
          ? disabledDates.some((d) => isSameInterval(yearInterval, date, d))
          : disabledDates instanceof Object
            ? isDateWithin(date, {
                start: startOfInterval(yearInterval, disabledDates.from),
                end: endOfInterval(yearInterval, disabledDates.to || disabledDates.from),
              })
            : false;
  };
</script>

<div class="grid">
  <Button on:click={() => (minYear -= 1)} class="border-b">More</Button>

  <div class="grid p-2">
    {#each yearDates as year (year.valueOf())}
      <DateButton
        date={year}
        periodType={PeriodType.CalendarYear}
        bind:selected
        disabled={isDateDisabled(year)}
        {format}
        {utc}
        on:dateChange
      />
    {/each}
  </div>

  <Button on:click={() => (maxYear += 1)} class="border-t">More</Button>
</div>
