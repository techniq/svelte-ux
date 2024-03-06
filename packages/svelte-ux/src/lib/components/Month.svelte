<script lang="ts">
  // import { fade, slide } from 'svelte/transition';
  // import { fly } from '../utils/transition';
  import {
    startOfDay as startOfDayFunc,
    endOfDay as endOfDayFunc,
    startOfMonth as startOfMonthFunc,
    endOfMonth as endOfMonthFunc,
    addMonths,
    isSameDay,
    isWithinInterval,
  } from 'date-fns';

  import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

  import { getMonthDaysByWeek, PeriodType } from '../utils/date';
  import type { SelectedDate } from '../utils/date';
  import { hasKeyOf } from '../types/typeGuards';

  import Button from './Button.svelte';
  import DateButton from './DateButton.svelte';
  import { getSettings } from './settings.js';

  export let selected: SelectedDate | undefined = undefined;

  export let startOfMonth =
    (selected instanceof Date && startOfMonthFunc(selected)) ||
    (selected instanceof Array && selected.length && startOfMonthFunc(selected[0])) ||
    (selected &&
      hasKeyOf<{ from: Date }>(selected, 'from') &&
      selected.from &&
      startOfMonthFunc(selected.from)) ||
    startOfMonthFunc(new Date());

  const { format } = getSettings();
  $: dateFormat = $format.settings.formats.dates;

  $: endOfMonth = endOfMonthFunc(startOfMonth);
  $: monthDaysByWeek = getMonthDaysByWeek(startOfMonth, dateFormat.weekStartsOn);

  /**
   * Hide controls and date.  Useful to control externally
   */
  export let hideControls = false;

  /**
   * Show days before and after selected month
   */
  export let showOutsideDays: boolean | undefined = undefined;

  /**
   * Day(s) to disable (not selectable)
   */
  export let disabledDays: any = undefined; // TODO: Improve types - See isDayDisabled

  $: isDayDisabled = (date: Date) => {
    return disabledDays instanceof Function
      ? disabledDays(date)
      : disabledDays instanceof Date
        ? isSameDay(date, disabledDays)
        : disabledDays instanceof Array
          ? disabledDays.some((d) => isSameDay(date, d))
          : disabledDays instanceof Object
            ? isWithinInterval(date, {
                start: startOfDayFunc(disabledDays.from),
                end: endOfDayFunc(disabledDays.to || disabledDays.from),
              })
            : false;
  };

  $: isDayHidden = (day: Date) => {
    const isCurrentMonth = isWithinInterval(day, {
      start: startOfMonth,
      end: endOfMonth,
    });
    return !isCurrentMonth && !showOutsideDays;
  };

  $: isDayFaded = (day: Date) => {
    const isCurrentMonth = isWithinInterval(day, {
      start: startOfMonth,
      end: endOfMonth,
    });
    return !isCurrentMonth && showOutsideDays;
  };
</script>

{#if !hideControls}
  <div class="flex m-2">
    <Button
      icon={mdiChevronLeft}
      class="p-2"
      on:click={() => (startOfMonth = addMonths(startOfMonth, -1))}
    />

    <div class="flex flex-1 items-center justify-center">
      <span>{$format(startOfMonth, PeriodType.MonthYear)}</span>
    </div>

    <Button
      icon={mdiChevronRight}
      class="p-2"
      on:click={() => (startOfMonth = addMonths(startOfMonth, 1))}
    />
  </div>
{/if}

<div class="flex">
  {#each monthDaysByWeek[0] ?? [] as day (day.getDate())}
    <div class="flex-1 text-center">
      <span class="text-xs text-surface-content/50">
        {$format(day, PeriodType.Day, { custom: 'eee' })}
      </span>
    </div>
  {/each}
</div>

<div class="grid grid-cols-7 grid-rows-6 gap-y-4">
  {#each monthDaysByWeek ?? [] as week, weekIndex (weekIndex)}
    {#each week ?? [] as day (day.valueOf())}
      <DateButton
        date={day}
        periodType={PeriodType.Day}
        bind:selected
        hidden={isDayHidden(day)}
        fade={isDayFaded(day)}
        disabled={isDayDisabled(day)}
        on:dateChange
      />
    {/each}
  {/each}
</div>

<!-- 
  TODO: Transition
    - [ ] Detect direction and set +/- accordingly (left-to-right or right-to-left)
    - [ ] Fix changing period types on DateRange (|local not a workaround)
-->
<!-- <div class="grid overflow-hidden">
  {#key startOfMonth.valueOf()}
    <div
      class="col-span-full row-span-full grid grid-cols-7 grid-rows-6 gap-y-4"
      in:fly|local={{ x: '-100%' }}
      out:fly|local={{ x: '100%' }}
    >
      {#each monthDaysByWeek ?? [] as week, weekIndex (weekIndex)}
        {#each week ?? [] as day (day.valueOf())}
          <DateButton
            date={day}
            periodType={PeriodType.Day}
            bind:selected
            hidden={isDayHidden(day)}
            fade={isDayFaded(day)}
            disabled={isDayDisabled(day)}
            on:dateChange
          />
        {/each}
      {/each}
    </div>
  {/key}
</div> -->
