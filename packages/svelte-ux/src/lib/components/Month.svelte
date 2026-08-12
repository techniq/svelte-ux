<script lang="ts">
  import {
    type SelectedDate,
    PeriodType,
    hasKeyOf,
    startOfInterval,
    endOfInterval,
    intervalOffset,
  } from '@layerstack/utils';
  import { getMonthDaysByWeek, isDateWithin, isSameInterval } from '@layerstack/utils/date';

  import Button from './Button.svelte';
  import DateButton from './DateButton.svelte';
  import { getSettings } from './settings.js';
  import MonthListByYear from './MonthListByYear.svelte';

  export let selected: SelectedDate = undefined;

  /**
   * Use UTC boundaries rather than local ones, for both period math and display.
   *
   * Declared before `startOfMonth` so that prop's default value can read it.
   */
  export let utc = false;

  const monthInterval = utc ? ('utcMonth' as const) : ('month' as const);
  const dayInterval = utc ? ('utcDay' as const) : ('day' as const);

  export let startOfMonth =
    (selected instanceof Date && startOfInterval(monthInterval, selected)) ||
    (selected instanceof Array && selected.length && startOfInterval(monthInterval, selected[0])) ||
    (selected &&
      hasKeyOf<{ from: Date }>(selected, 'from') &&
      selected.from &&
      startOfInterval(monthInterval, selected.from)) ||
    startOfInterval(monthInterval, new Date());

  const { format, icons } = getSettings();
  $: dateFormat = $format.settings.formats.dates;

  $: endOfMonth = endOfInterval(monthInterval, startOfMonth);
  $: monthDaysByWeek = getMonthDaysByWeek(startOfMonth, dateFormat.weekStartsOn, { utc });

  /**
   * Hide controls and date.  Useful to control externally
   */
  export let hideControls = false;

  /**
   * Show days before and after selected month
   */
  export let showOutsideDays: boolean | undefined = undefined;

  type DisabledDate = ((date: Date) => boolean) | Date | Date[] | { from: Date; to: Date };

  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  $: isDateDisabled = (date: Date) => {
    return disabledDates instanceof Function
      ? disabledDates(date)
      : disabledDates instanceof Date
        ? isSameInterval(dayInterval, date, disabledDates)
        : disabledDates instanceof Array
          ? disabledDates.some((d) => isSameInterval(dayInterval, date, d))
          : disabledDates instanceof Object
            ? isDateWithin(date, {
                start: startOfInterval(dayInterval, disabledDates.from),
                end: endOfInterval(dayInterval, disabledDates.to || disabledDates.from),
              })
            : false;
  };

  $: isDayHidden = (day: Date) => {
    const isCurrentMonth = isDateWithin(day, {
      start: startOfMonth,
      end: endOfMonth,
    });
    return !isCurrentMonth && !showOutsideDays;
  };

  $: isDayFaded = (day: Date) => {
    const isCurrentMonth = isDateWithin(day, {
      start: startOfMonth,
      end: endOfMonth,
    });
    return !isCurrentMonth && showOutsideDays;
  };

  let showMonthSelect = false;
</script>

{#if showMonthSelect}
  <div class="max-h-[350px] overflow-auto">
    <MonthListByYear
      selected={startOfMonth}
      {utc}
      on:dateChange={(e) => {
        startOfMonth = e.detail;
        showMonthSelect = false;
      }}
    />
  </div>
{:else}
  {#if !hideControls}
    <div class="flex m-2">
      <Button
        icon={icons.chevronLeft}
        class="p-2"
        on:click={() => (startOfMonth = intervalOffset(monthInterval, startOfMonth, -1))}
      />

      <div class="flex flex-1 items-center justify-center">
        <Button on:click={() => (showMonthSelect = true)}>
          {$format(startOfMonth, PeriodType.MonthYear, { utc })}
        </Button>
      </div>

      <Button
        icon={icons.chevronRight}
        class="p-2"
        on:click={() => (startOfMonth = intervalOffset(monthInterval, startOfMonth, 1))}
      />
    </div>
  {/if}

  <div class="grid grid-cols-7">
    {#each monthDaysByWeek[0] ?? [] as day (day.getDate())}
      <div class="text-center">
        <span class="text-xs text-surface-content/50">
          {$format(day, PeriodType.Day, { custom: 'eee', utc })}
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
          disabled={isDateDisabled(day)}
          {utc}
          on:dateChange
        />
      {/each}
    {/each}
  </div>
{/if}

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
