<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { isSameMonth, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';
  import { type DisabledDate, type SelectedDate, PeriodType } from '@layerstack/utils';
  import { getMonths } from '@layerstack/utils/date';

  import DateButton from './DateButton.svelte';

  export let year: number | undefined = undefined;
  export let selected: SelectedDate = undefined;
  export let format: ComponentProps<DateButton>['format'] = undefined;
  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  $: isDateDisabled = (date: Date) => {
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
  };
</script>

<!-- TODO: `bind:selected` not working -->
{#each getMonths(year) ?? [] as month (month.valueOf())}
  <DateButton
    date={month}
    periodType={PeriodType.Month}
    {selected}
    disabled={isDateDisabled(month)}
    {format}
    on:dateChange
  />
{/each}
