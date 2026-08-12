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
  /** Use UTC boundaries rather than local ones, for both period math and display */
  export let utc = false;
  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  $: monthInterval = utc ? ('utcMonth' as const) : ('month' as const);

  // `getMonths()` builds *local* month starts. In UTC mode they have to be built from UTC
  // fields instead, or flooring them with `utcMonth` lands in the neighbouring month.
  $: months = utc
    ? Array.from(
        { length: 12 },
        (_, i) => new Date(Date.UTC(year ?? new Date().getUTCFullYear(), i, 1))
      )
    : getMonths(year);

  $: isDateDisabled = (date: Date) => {
    return disabledDates instanceof Function
      ? disabledDates(date)
      : disabledDates instanceof Date
        ? isSameInterval(monthInterval, date, disabledDates)
        : disabledDates instanceof Array
          ? disabledDates.some((d) => isSameInterval(monthInterval, date, d))
          : disabledDates instanceof Object
            ? isDateWithin(date, {
                start: startOfInterval(monthInterval, disabledDates.from),
                end: endOfInterval(monthInterval, disabledDates.to || disabledDates.from),
              })
            : false;
  };
</script>

<!-- TODO: `bind:selected` not working -->
{#each months ?? [] as month (month.valueOf())}
  <DateButton
    date={month}
    periodType={PeriodType.Month}
    {selected}
    disabled={isDateDisabled(month)}
    {format}
    {utc}
    on:dateChange
  />
{/each}
