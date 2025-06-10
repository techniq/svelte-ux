<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import {
    type DisabledDate,
    type SelectedDate,
    PeriodType,
    isSameInterval,
    startOfInterval,
    endOfInterval,
    isDateWithin,
  } from '@layerstack/utils';
  import { getMonths } from '@layerstack/utils/date';

  import DateButton from './DateButton.svelte';

  export let year: number | undefined = undefined;
  export let selected: SelectedDate = undefined;
  export let format: ComponentProps<DateButton>['format'] = 'MMM'; // Use short month by default.  TODO: Change to `variant`
  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  $: isDateDisabled = (date: Date) => {
    return disabledDates instanceof Function
      ? disabledDates(date)
      : disabledDates instanceof Date
        ? isSameInterval('month', date, disabledDates)
        : disabledDates instanceof Array
          ? disabledDates.some((d) => isSameInterval('month', date, d))
          : disabledDates instanceof Object
            ? isDateWithin(date, {
                start: startOfInterval('month', disabledDates.from),
                end: endOfInterval('month', disabledDates.to || disabledDates.from),
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
