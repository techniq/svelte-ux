<script lang="ts">
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
  import type { SelectedDate } from '../utils/date.js';

  export let selected: SelectedDate | undefined = undefined;
  export let minDate: Date | undefined = undefined;
  export let maxDate: Date | undefined = undefined;
  export let format: string | undefined = undefined;
  export let disabledYears: any = undefined; // TODO: Improve types - See isYearDisabled

  $: minYear =
    minYear ??
    (minDate
      ? minDate.getFullYear()
      : subYears(getMinSelectedDate(selected) || new Date(), 2).getFullYear());

  $: maxYear =
    maxYear ??
    (maxDate
      ? maxDate.getFullYear()
      : addYears(getMaxSelectedDate(selected) || new Date(), 2).getFullYear());

  $: years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i) ?? [];

  // TODO: Scroll into view not typically centered
  $: selectedYear = (getMinSelectedDate(selected) || new Date()).getFullYear();

  $: isYearDisabled = (date: Date) => {
    return disabledYears instanceof Function
      ? disabledYears(date)
      : disabledYears instanceof Date
        ? isSameYear(date, disabledYears)
        : disabledYears instanceof Array
          ? disabledYears.some((d) => isSameYear(date, d))
          : disabledYears instanceof Object
            ? isWithinInterval(date, {
                start: startOfYear(disabledYears.from),
                end: endOfYear(disabledYears.to || disabledYears.from),
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
        disabled={isYearDisabled(year)}
        {format}
        on:dateChange
      />
    {/each}
  </div>

  <Button on:click={() => (maxYear += 1)} class="border-t">More</Button>
</div>
