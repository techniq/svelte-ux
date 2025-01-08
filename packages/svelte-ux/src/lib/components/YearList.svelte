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

  import Button from './Button.svelte';
  import DateButton from './DateButton.svelte';

  import { getMinSelectedDate, getMaxSelectedDate, PeriodType } from '../utils/date.js';
  import type { DisabledDate, SelectedDate } from '../utils/date.js';

  interface Props {
    selected?: SelectedDate;
    minDate?: Date;
    maxDate?: Date;
    format?: ComponentProps<typeof DateButton>['format'];
    onDateChange?: ComponentProps<typeof DateButton>['onDateChange'];
    /**
     * Dates to disable (not selectable)
     */
    disabledDates?: DisabledDate;
  }

  let {
    selected = $bindable(),
    minDate,
    maxDate,
    format,
    onDateChange,
    disabledDates,
  }: Props = $props();

  let minYear = $state() as number;
  $effect(() => {
    minYear =
      minYear ??
      (minDate
        ? minDate.getFullYear()
        : subYears(getMinSelectedDate(selected) || new Date(), 2).getFullYear());
  });

  let maxYear = $state() as number;
  $effect(() => {
    maxYear =
      maxYear ??
      (maxDate
        ? maxDate.getFullYear()
        : addYears(getMaxSelectedDate(selected) || new Date(), 2).getFullYear());
  });

  let years = $derived(
    Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i) ?? []
  );

  // TODO: Scroll into view not typically centered
  let selectedYear = $derived((getMinSelectedDate(selected) || new Date()).getFullYear());

  let isDateDisabled = $derived((date: Date) => {
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
  });
</script>

<div class="grid">
  <Button onclick={() => (minYear -= 1)} class="border-b">More</Button>

  <div class="grid p-2">
    {#each years.map((year) => new Date(year, 0, 1)) as year (year.valueOf())}
      <DateButton
        date={year}
        periodType={PeriodType.CalendarYear}
        bind:selected
        disabled={isDateDisabled(year)}
        {format}
        {onDateChange}
      />
    {/each}
  </div>

  <Button onclick={() => (maxYear += 1)} class="border-t">More</Button>
</div>
