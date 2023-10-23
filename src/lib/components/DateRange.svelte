<script lang="ts">
  import { format, isAfter, isBefore, isSameDay } from 'date-fns';

  import {
    PeriodType,
    DayOfWeek,
    getDateFuncsByPeriodType,
    hasDayOfWeek,
    replaceDayOfWeek,
    getPeriodTypeName,
  } from '../utils/date';
  import { getDateRangePresets } from '../utils/dateRange';
  import type { DateRange } from '../utils/dateRange';

  import DateSelect from './DateSelect.svelte';
  import ToggleGroup from './ToggleGroup.svelte';
  import ToggleOption from './ToggleOption.svelte';
  import DateField from './DateField.svelte';
  import { cls } from '$lib/utils/styles';
  import { getComponentTheme } from './theme';

  export let selected: DateRange = { from: null, to: null, periodType: null };
  export let periodTypeOptions: PeriodType[] = [
    PeriodType.Day,
    PeriodType.WeekSun,
    PeriodType.BiWeek1Sun,
    // PeriodType.BiWeek2Sun,
    PeriodType.Month,
    PeriodType.Quarter,
    PeriodType.CalendarYear,
    PeriodType.FiscalYearOctober,
  ];

  const theme = getComponentTheme('DateRange');

  let selectedDayOfWeek: DayOfWeek = DayOfWeek.SUN;
  let activeDate: 'from' | 'to' = 'from';

  function onDateChange(date: Date) {
    // Apply date-fns function based on type and from/to.
    let newSelected = { ...selected };

    const { start, end } = getDateFuncsByPeriodType(selected.periodType);

    let newActiveDate: typeof activeDate = activeDate === 'from' ? 'to' : 'from';

    if (activeDate === 'from') {
      newSelected.from = start(date);
      if (selected.to != null && isAfter(date, selected.to)) {
        newSelected.to = end(date);
      }
    } else {
      newSelected.to = end(date);
      if (selected.from != null && isBefore(date, selected.from)) {
        newSelected.from = start(date);
        newActiveDate = 'to';
      }
    }

    selected = newSelected;
    activeDate = newActiveDate;
  }

  // Update selection after changing `selectedDayOfWeek`
  $: {
    if (selected.periodType && hasDayOfWeek(selected.periodType)) {
      const newPeriodType = replaceDayOfWeek(selected.periodType, selectedDayOfWeek);

      const newSelected = { ...selected, periodType: newPeriodType };

      // Attempt to maintain selected preset if labels match
      if (selected.from && selected.to && selected.periodType) {
        const prevPeriodTypePreset = [...getDateRangePresets(selected.periodType)].find(
          (x) =>
            x.value.from &&
            isSameDay(x.value.from, selected.from) &&
            x.value.to &&
            isSameDay(x.value.to, selected.to)
        );

        if (prevPeriodTypePreset && newPeriodType) {
          const newPeriodTypePreset = [...getDateRangePresets(newPeriodType)].find(
            (x) => x.label === prevPeriodTypePreset.label
          );

          if (newPeriodTypePreset) {
            newSelected.from = newPeriodTypePreset.value.from;
            newSelected.to = newPeriodTypePreset.value.to;
          }
        }
      }

      selected = newSelected;
    }
  }

  function adjustPeriodType(periodType: PeriodType) {
    // Adjust value for currently selected day of week
    return hasDayOfWeek(periodType)
      ? replaceDayOfWeek(periodType, selectedDayOfWeek) || periodType
      : periodType;
  }
</script>

<div class={cls('DateRange grid grid-cols-[2fr,3fr] gap-2', theme.root, $$props.class)}>
  <div class="col-start-2">
    <ToggleGroup bind:value={activeDate} variant="outline" inset class="bg-white">
      <ToggleOption value="from" class="flex-1">
        <div class="text-xs text-black/50">Start</div>
        {#if selected.from}
          <div class="font-medium">{format(selected.from, 'M/d/yyyy')}</div>
        {:else}
          <div class="italic">Empty</div>
        {/if}
        <!-- <div class="p-1">
            <DateField
              label="Start"
              value={selected.from}
              on:change={(e) => {
                // Ignore null / incomplete dates
                if (e.detail.value) {
                  selected.from = e.detail.value;
                }
              }}
              dense
            />
          </div> -->
      </ToggleOption>

      <ToggleOption value="to" class="flex-1">
        <div class="text-xs text-black/50">End</div>
        {#if selected.to}
          <div class="font-medium">{format(selected.to, 'M/d/yyyy')}</div>
        {:else}
          <div class="italic">Empty</div>
        {/if}
        <!-- <div class="p-1">
            <DateField
              label="End"
              value={selected.to}
              on:change={(e) => {
                // Ignore null / incomplete dates
                if (e.detail.value) {
                  selected.to = e.detail.value;
                }
              }}
              dense
            />
          </div> -->
      </ToggleOption>
    </ToggleGroup>
  </div>

  <div class="grid gap-2">
    <div>
      <div class="text-xs text-black/50 uppercase mb-1 -mt-5">Type</div>
      <ToggleGroup
        bind:value={selected.periodType}
        on:change={(e) => {
          // Expand selection range to match period type (day => month, etc)
          const { start, end } = getDateFuncsByPeriodType(e.detail.value);
          if (selected.from) {
            selected.from = start(selected.from);
          }
          if (selected.to) {
            selected.to = end(selected.to);
          }
        }}
        variant="outline"
        inset
        vertical
        class="bg-white"
      >
        {#each periodTypeOptions ?? [] as pt}
          <ToggleOption value={adjustPeriodType(pt)}>
            {getPeriodTypeName(adjustPeriodType(pt))}
          </ToggleOption>
        {/each}
      </ToggleGroup>

      {#if selected.periodType}
        <div class="text-xs text-black/50 uppercase mb-1 mt-4">Presets</div>
        <ToggleGroup bind:value={selected} variant="outline" inset vertical class="bg-white">
          {#each getDateRangePresets(selected.periodType) ?? [] as preset}
            <ToggleOption value={preset.value}>{preset.label}</ToggleOption>
          {/each}
        </ToggleGroup>
      {/if}

      {#if selected.periodType && hasDayOfWeek(selected.periodType)}
        <div class="text-xs text-black/50 uppercase mb-1 mt-4">Start day of week</div>
        <ToggleGroup
          bind:value={selectedDayOfWeek}
          variant="outline"
          inset
          classes={{ root: 'bg-white', option: 'px-0' }}
        >
          <ToggleOption value={DayOfWeek.SUN}>Sun</ToggleOption>
          <ToggleOption value={DayOfWeek.MON}>Mon</ToggleOption>
          <ToggleOption value={DayOfWeek.TUE}>Tue</ToggleOption>
          <ToggleOption value={DayOfWeek.WED}>Wed</ToggleOption>
          <ToggleOption value={DayOfWeek.THU}>Thu</ToggleOption>
          <ToggleOption value={DayOfWeek.FRI}>Fri</ToggleOption>
          <ToggleOption value={DayOfWeek.SAT}>Sat</ToggleOption>
        </ToggleGroup>
      {/if}
    </div>
  </div>

  <div class="bg-white border rounded overflow-auto">
    <DateSelect
      {selected}
      periodType={selected?.periodType}
      on:dateChange={(e) => onDateChange(e.detail)}
      {activeDate}
    />
  </div>
</div>
