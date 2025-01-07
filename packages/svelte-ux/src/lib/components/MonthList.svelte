<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { isSameMonth, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

  import { getMonths, PeriodType } from '../utils/date.js';
  import type { DisabledDate, SelectedDate } from '../utils/date.js';
  import DateButton from './DateButton.svelte';

  interface Props {
    year?: number;
    selected?: SelectedDate;
    format?: ComponentProps<typeof DateButton>['format'];
    /**
     * Dates to disable (not selectable)
     */
    disabledDates?: DisabledDate;
    onDateChange?: ComponentProps<typeof DateButton>['onDateChange'];
  }

  let { year, selected, format, disabledDates, onDateChange }: Props = $props();

  let isDateDisabled = $derived((date: Date) => {
    return disabledDates instanceof Function
      ? disabledDates(date)
      : disabledDates instanceof Date
        ? isSameMonth(date, disabledDates)
        : disabledDates instanceof Array
          ? disabledDates.some((d) => isSameMonth(date, d))
          : disabledDates instanceof Object
            ? isWithinInterval(date, {
                start: startOfMonth(disabledDates.from),
                end: endOfMonth(disabledDates.to || disabledDates.from),
              })
            : false;
  });
</script>

<!-- TODO: `bind:selected` not working -->
{#each getMonths(year) ?? [] as month (month.valueOf())}
  <DateButton
    date={month}
    periodType={PeriodType.Month}
    {selected}
    disabled={isDateDisabled(month)}
    {format}
    {onDateChange}
  />
{/each}
