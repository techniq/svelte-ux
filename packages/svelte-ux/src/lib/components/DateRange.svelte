<script lang="ts">
  import { isAfter, isBefore, isSameDay } from 'date-fns';

  import {
    PeriodType,
    DayOfWeek,
    getDateFuncsByPeriodType,
    hasDayOfWeek,
    replaceDayOfWeek,
    missingDayOfWeek,
    type DisabledDate,
  } from '../utils/date.js';
  import { getDateRangePresets } from '../utils/dateRange.js';
  import type { DateRange } from '../utils/dateRange.js';
  import { cls } from '@layerstack/tailwind';
  import { omit } from '../utils/object.js';

  import DateSelect from './DateSelect.svelte';
  import MenuField from './MenuField.svelte';
  import ToggleGroup from './ToggleGroup.svelte';
  import ToggleOption from './ToggleOption.svelte';
  import { getComponentClasses } from './theme.js';
  import { mdScreen } from '../stores/matchMedia.js';
  import { getSettings } from './settings.js';

  export let selected: DateRange | null = { from: null, to: null, periodType: null };
  let className: string | undefined = undefined;
  export { className as class };

  /** Period types to show */
  export let periodTypes: PeriodType[] = [
    PeriodType.Day,
    PeriodType.Week,
    PeriodType.BiWeek1,
    // PeriodType.BiWeek2Sun,
    PeriodType.Month,
    PeriodType.Quarter,
    PeriodType.CalendarYear,
    PeriodType.FiscalYearOctober,
  ];
  export let getPeriodTypePresets = getDateRangePresets;

  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  const settingsClasses = getComponentClasses('DateRange');
  const { format, localeSettings } = getSettings();

  let selectedPeriodType = selected?.periodType ?? periodTypes[0];
  let selectedPreset: string | null = null;
  let selectedDayOfWeek: DayOfWeek =
    $format.settings.formats.dates.weekStartsOn ?? DayOfWeek.Sunday;
  let activeDate: 'from' | 'to' = 'from';

  $: periodTypeOptions = periodTypes.map((pt) => {
    const value = adjustPeriodType(pt);
    return {
      label: $format.getPeriodTypeName(value),
      value,
    };
  });

  $: presetOptions = getPeriodTypePresets($localeSettings, selectedPeriodType).map((preset) => {
    return {
      label: preset.label,
      value: getDateRangeStr(preset.value),
      preset,
    };
  });

  /** Get date range (without period type) as string */
  function getDateRangeStr(range: DateRange) {
    return JSON.stringify(omit(range, ['periodType']));
  }

  function onDateChange(date: Date) {
    // Apply date-fns function based on type and from/to.
    let newSelected = { ...selected, periodType: selectedPeriodType };

    const { start, end } = getDateFuncsByPeriodType($localeSettings, selectedPeriodType);

    let newActiveDate: typeof activeDate = activeDate === 'from' ? 'to' : 'from';

    if (activeDate === 'from') {
      newSelected.from = start(date);
      if (selected!.to != null && isAfter(date, selected!.to)) {
        newSelected.to = end(date);
      }
    } else {
      newSelected.to = end(date);
      if (selected!.from != null && isBefore(date, selected!.from)) {
        newSelected.from = start(date);
        newActiveDate = 'to';
      }
    }

    // TODO
    // @ts-expect-error (null / undefined issue...)
    selected = newSelected;
    activeDate = newActiveDate;
  }

  // Expand selection range to match period type (day => month, etc)
  function onPeriodTypeChange(periodType: PeriodType) {
    const { start, end } = getDateFuncsByPeriodType($localeSettings, periodType);
    if (selected!.from) {
      selected!.from = start(selected!.from);
    }
    if (selected!.to) {
      selected!.to = end(selected!.to);
    }
    if (selected!.periodType) {
      selected!.periodType = periodType;
    }
  }

  // Lookup selected preset string value to actual preset
  function onPresetChange(presetValueString: string) {
    const selectedPresetObj = presetOptions.find((o) => o.value === presetValueString)?.preset;
    if (selectedPresetObj) {
      selected = selectedPresetObj.value;
    }
  }

  // Update selection after changing `selectedDayOfWeek`
  $: {
    if (hasDayOfWeek(selectedPeriodType)) {
      const newPeriodType = replaceDayOfWeek(selectedPeriodType, selectedDayOfWeek);

      const newSelected = { ...selected, periodType: newPeriodType };

      // Attempt to maintain selected preset if labels match
      if (selected?.from && selected?.to && selected.periodType) {
        const prevPeriodTypePreset = [
          ...getPeriodTypePresets($localeSettings, selected.periodType),
        ].find(
          (x) =>
            x.value.from &&
            isSameDay(x.value.from, selected!.from!) &&
            x.value.to &&
            isSameDay(x.value.to, selected!.to!)
        );

        if (prevPeriodTypePreset && newPeriodType) {
          const newPeriodTypePreset = [
            ...getPeriodTypePresets($localeSettings, newPeriodType),
          ].find((x) => x.label === prevPeriodTypePreset.label);

          if (newPeriodTypePreset) {
            newSelected.from = newPeriodTypePreset.value.from;
            newSelected.to = newPeriodTypePreset.value.to;
          }
        }
      }

      // TODO
      // @ts-expect-error (null / undefined issue...)
      selected = newSelected;
    }
  }

  function adjustPeriodType(periodType: PeriodType) {
    // Adjust value for currently selected day of week, if needed
    return missingDayOfWeek(periodType)
      ? replaceDayOfWeek(periodType, selectedDayOfWeek) || periodType
      : periodType;
  }

  $: showPeriodTypes = periodTypeOptions.length > 1;
  $: showPresets = presetOptions.length > 0;
  $: showSidebar = showPeriodTypes || showPresets;
</script>

<div
  class={cls(
    'DateRange grid gap-2',
    'w-[min(90vw,384px)]',
    showSidebar && 'md:w-[640px] md:grid-cols-[2fr,3fr]',
    settingsClasses.root,
    className
  )}
>
  <div class={cls(showSidebar && 'md:col-start-2')}>
    <ToggleGroup bind:value={activeDate} variant="outline" inset class="bg-surface-100">
      <ToggleOption value="from" class="flex-1">
        <div class="text-xs text-surface-content/50">{$localeSettings.dictionary.Date.Start}</div>
        {#if selected?.from}
          <div class="font-medium">{$format(selected.from, PeriodType.Day)}</div>
        {:else}
          <div class="italic">{$localeSettings.dictionary.Date.Empty}</div>
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
        <div class="text-xs text-surface-content/50">{$localeSettings.dictionary.Date.End}</div>
        {#if selected?.to}
          <div class="font-medium">{$format(selected.to, PeriodType.Day)}</div>
        {:else}
          <div class="italic">{$localeSettings.dictionary.Date.Empty}</div>
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

  {#if showSidebar}
    <div class="flex flex-col gap-2 md:gap-4 md:-mt-5">
      {#if showPeriodTypes}
        {#if $mdScreen}
          <div>
            <div class="text-xs text-surface-content/50 uppercase mb-1">Type</div>
            <ToggleGroup
              bind:value={selectedPeriodType}
              on:change={(e) => onPeriodTypeChange(e.detail.value)}
              variant="outline"
              inset
              vertical
            >
              {#each periodTypeOptions as option}
                <ToggleOption value={option.value}>
                  {option.label}
                </ToggleOption>
              {/each}
            </ToggleGroup>
          </div>
        {:else}
          <MenuField
            label="Type"
            bind:value={selectedPeriodType}
            options={periodTypeOptions}
            on:change={(e) => onPeriodTypeChange(e.detail.value)}
          />
        {/if}
      {/if}

      {#if showPresets}
        {#key selectedPeriodType}
          {#if $mdScreen}
            <div>
              <div class="text-xs text-surface-content/50 uppercase mb-1">Presets</div>
              <ToggleGroup bind:value={selectedPreset} variant="outline" inset vertical>
                {#each presetOptions as option}
                  <ToggleOption
                    value={option.value}
                    on:click={() => {
                      onPresetChange(option.value);
                    }}
                  >
                    {option.label}
                  </ToggleOption>
                {/each}
              </ToggleGroup>
            </div>
          {:else}
            <MenuField
              label="Presets"
              bind:value={selectedPreset}
              options={presetOptions}
              on:change={(e) => {
                onPresetChange(e.detail.value);
              }}
            />
          {/if}
        {/key}
      {/if}

      {#if hasDayOfWeek(selectedPeriodType)}
        <div>
          <div class="text-xs text-surface-content/50 uppercase mb-1">Start day of week</div>
          <ToggleGroup
            bind:value={selectedDayOfWeek}
            variant="outline"
            inset
            classes={{ root: 'bg-surface-100', option: 'px-0' }}
          >
            {#each [DayOfWeek.Sunday, DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday, DayOfWeek.Saturday] as day}
              <ToggleOption value={day}>{$format.getDayOfWeekName(day)}</ToggleOption>
            {/each}
          </ToggleGroup>
        </div>
      {/if}
    </div>
  {/if}

  <div class="bg-surface-100 border rounded overflow-auto">
    <DateSelect
      {selected}
      periodType={selectedPeriodType}
      {activeDate}
      {disabledDates}
      on:dateChange={(e) => onDateChange(e.detail)}
    />
  </div>
</div>
