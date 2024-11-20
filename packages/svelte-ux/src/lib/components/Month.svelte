<script lang="ts">
  import {
    startOfDay as startOfDayFunc,
    endOfDay as endOfDayFunc,
    startOfMonth as startOfMonthFunc,
    endOfMonth as endOfMonthFunc,
    addMonths,
    isSameDay,
    isWithinInterval,
  } from 'date-fns';
  import { type SelectedDate, PeriodType, hasKeyOf } from '@layerstack/utils';
  import { getMonthDaysByWeek } from '@layerstack/utils/date';

  import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

  import Button from './Button.svelte';
  import DateButton from './DateButton.svelte';
  import { getSettings } from './settings.js';
  import MonthListByYear from './MonthListByYear.svelte';

  export let selected: SelectedDate = undefined;

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

  type DisabledDate = ((date: Date) => boolean) | Date | Date[] | { from: Date; to: Date };

  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  $: isDateDisabled = (date: Date) => {
    return disabledDates instanceof Function
      ? disabledDates(date)
      : disabledDates instanceof Date
        ? isSameDay(date, disabledDates)
        : disabledDates instanceof Array
          ? disabledDates.some((d) => isSameDay(date, d))
          : disabledDates instanceof Object
            ? isWithinInterval(date, {
                start: startOfDayFunc(disabledDates.from),
                end: endOfDayFunc(disabledDates.to || disabledDates.from),
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

  let showMonthSelect = false;
</script>

{#if showMonthSelect}
  <div class="max-h-[350px] overflow-auto">
    <MonthListByYear
      selected={startOfMonth}
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
        icon={mdiChevronLeft}
        class="p-2"
        on:click={() => (startOfMonth = addMonths(startOfMonth, -1))}
      />

      <div class="flex flex-1 items-center justify-center">
        <Button on:click={() => (showMonthSelect = true)}>
          {$format(startOfMonth, PeriodType.MonthYear)}
        </Button>
      </div>

      <Button
        icon={mdiChevronRight}
        class="p-2"
        on:click={() => (startOfMonth = addMonths(startOfMonth, 1))}
      />
    </div>
  {/if}

  <div class="grid grid-cols-7">
    {#each monthDaysByWeek[0] ?? [] as day (day.getDate())}
      <div class="text-center">
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
          disabled={isDateDisabled(day)}
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
