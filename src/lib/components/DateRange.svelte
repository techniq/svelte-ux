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

  let selectedDayOfWeek: DayOfWeek = DayOfWeek.SUN;
  let activeDate: 'from' | 'to' = 'from';

  function onDateChange(date: Date) {
    // Apply date-fns function based on type and from/to.
    let newSelected = { ...selected };

    // console.log('onDateChange', date);

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

<div class="grid grid-cols-[2fr,3fr] gap-2 bg-gray-100">
  <div class="col-start-2">
    <ToggleGroup contained bind:value={activeDate}>
      <div class="options w-full border">
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
      </div>
    </ToggleGroup>
  </div>

  <div class="grid gap-2">
    <div>
      <div class="text-xs text-black/50 uppercase" style="margin-top: -22px; margin-bottom: 4px;">
        Type
      </div>
      <ToggleGroup
        contained
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
        vertical
      >
        <div class="options flex flex-col w-full border">
          {#each periodTypeOptions ?? [] as pt}
            <ToggleOption value={adjustPeriodType(pt)} class="flex-1">
              {getPeriodTypeName(adjustPeriodType(pt))}
            </ToggleOption>
          {/each}
        </div>
      </ToggleGroup>

      {#if selected.periodType}
        <div class="text-xs text-black/50 uppercase mb-1 mt-4">Presets</div>
        <ToggleGroup contained bind:value={selected} vertical>
          <div class="options flex flex-col w-full border">
            {#each getDateRangePresets(selected.periodType) ?? [] as preset}
              <ToggleOption value={preset.value} class="flex-1">{preset.label}</ToggleOption>
            {/each}
          </div>
        </ToggleGroup>
      {/if}

      {#if selected.periodType && hasDayOfWeek(selected.periodType)}
        <div class="text-xs text-black/50 uppercase mb-1 mt-4">Start day of week</div>
        <ToggleGroup contained bind:value={selectedDayOfWeek}>
          <div class="options flex w-full border">
            <ToggleOption value={DayOfWeek.SUN} class="flex-1">Sun</ToggleOption>
            <ToggleOption value={DayOfWeek.MON} class="flex-1">Mon</ToggleOption>
            <ToggleOption value={DayOfWeek.TUE} class="flex-1">Tue</ToggleOption>
            <ToggleOption value={DayOfWeek.WED} class="flex-1">Wed</ToggleOption>
            <ToggleOption value={DayOfWeek.THU} class="flex-1">Thu</ToggleOption>
            <ToggleOption value={DayOfWeek.FRI} class="flex-1">Fri</ToggleOption>
            <ToggleOption value={DayOfWeek.SAT} class="flex-1">Sat</ToggleOption>
          </div>
        </ToggleGroup>
      {/if}
    </div>
  </div>

  <div class="bg-white border rounded">
    <DateSelect
      {selected}
      periodType={selected?.periodType}
      on:dateChange={(e) => onDateChange(e.detail)}
      {activeDate}
    />
  </div>
</div>
