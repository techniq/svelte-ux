<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import {
    addYears,
    subYears,
    isSameYear,
    isWithinInterval,
    startOfYear,
    endOfYear,
  } from 'date-fns';
  import { type DisabledDate, type SelectedDate, PeriodType } from '@layerstack/utils';
  import { getMinSelectedDate, getMaxSelectedDate } from '@layerstack/utils/date';

  import Button from './Button.svelte';
  import DateButton from './DateButton.svelte';

  export let selected: SelectedDate = undefined;
  export let minDate: Date | undefined = undefined;
  export let maxDate: Date | undefined = undefined;
  export let format: ComponentProps<DateButton>['format'] = undefined;

  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  let minYear: number;
  $: minYear =
    minYear ??
    (minDate
      ? minDate.getFullYear()
      : subYears(getMinSelectedDate(selected) || new Date(), 2).getFullYear());

  let maxYear: number;
  $: maxYear =
    maxYear ??
    (maxDate
      ? maxDate.getFullYear()
      : addYears(getMaxSelectedDate(selected) || new Date(), 2).getFullYear());

  $: years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i) ?? [];

  // TODO: Scroll into view not typically centered
  $: selectedYear = (getMinSelectedDate(selected) || new Date()).getFullYear();

  $: isDateDisabled = (date: Date) => {
    return disabledDates instanceof Function
      ? disabledDates(date)
      : disabledDates instanceof Date
        ? isSameYear(date, disabledDates)
        : disabledDates instanceof Array
          ? disabledDates.some((d) => isSameYear(date, d))
          : disabledDates instanceof Object
            ? isWithinInterval(date, {
                start: startOfYear(disabledDates.from),
                end: endOfYear(disabledDates.to || disabledDates.from),
              })
            : false;
  };
</script>

<div class="grid">
  <Button on:click={() => (minYear -= 1)} class="border-b">More</Button>

  <div class="grid p-2">
    {#each years.map((year) => new Date(year, 0, 1)) as year (year.valueOf())}
      <DateButton
        date={year}
        periodType={PeriodType.CalendarYear}
        bind:selected
        disabled={isDateDisabled(year)}
        {format}
        on:dateChange
      />
    {/each}
  </div>

  <Button on:click={() => (maxYear += 1)} class="border-t">More</Button>
</div>
