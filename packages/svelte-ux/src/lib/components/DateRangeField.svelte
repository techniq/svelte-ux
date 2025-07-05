<script lang="ts">
  import { createEventDispatcher, type ComponentProps } from 'svelte';
  import { PeriodType, getDateFuncsByPeriodType, type DisabledDate } from '@layerstack/utils';
  import {
    getDateRangePresets,
    type DateRange as DateRangeType,
  } from '@layerstack/utils/dateRange';
  import { cls } from '@layerstack/tailwind';

  import Button from './Button.svelte';
  import DateRange from './DateRange.svelte';
  import DateRangeDisplay from './DateRangeDisplay.svelte';
  import Dialog from './Dialog.svelte';
  import Field from './Field.svelte';
  import Menu from './Menu.svelte';
  import MenuItem from './MenuItem.svelte';

  import { getComponentSettings, getSettings } from './settings.js';

  const dispatch = createEventDispatcher();
  const { format, localeSettings, icons } = getSettings();
  const { classes: settingsClasses, defaults } = getComponentSettings('DateRangeField');

  const _defaultValue: DateRangeType = {
    from: null,
    to: null,
    periodType: null,
  };

  export let value: DateRangeType = _defaultValue;
  export let stepper: boolean = false;
  export let center: boolean = false;
  export let periodTypes: PeriodType[] = [
    PeriodType.Day,
    PeriodType.Week,
    PeriodType.BiWeek1,
    // PeriodType.BiWeek2,
    PeriodType.Month,
    PeriodType.Quarter,
    PeriodType.CalendarYear,
    PeriodType.FiscalYearOctober,
  ];
  export let getPeriodTypePresets = getDateRangePresets;

  /**
   * Quick presets to show in menu
   */
  export let quickPresets: { label: string; value: DateRangeType }[] = [];

  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  export let classes: {
    field?: ComponentProps<Field>['classes'];
    dialog?: ComponentProps<Dialog>['classes'];
  } = {};

  // Field props
  export let label: string | null = null;
  // export let value = '';
  export let error = '';
  export let hint = '';
  export let disabled = false;
  export let clearable = false;
  export let base = false;
  export let rounded = false;
  export let dense = false;
  export let icon: string | null = null;

  let showDialog = false;
  let showQuickPresetsMenu = false;

  let currentValue = value;

  $: restProps = { ...defaults, ...$$restProps };
</script>

<Field
  label={label ?? (value.periodType ? $format.getPeriodTypeName(value.periodType) : '')}
  {icon}
  {error}
  {hint}
  {disabled}
  {base}
  {rounded}
  {dense}
  {center}
  classes={classes.field}
  let:id
  {...restProps}
>
  <span slot="prepend" class="flex items-center">
    <slot name="prepend" />

    {#if stepper}
      <Button
        icon={icons.chevronLeft}
        class="p-2"
        on:click={() => {
          if (value && value.from && value.to && value.periodType) {
            const { difference, start, end, add } = getDateFuncsByPeriodType(
              $localeSettings,
              value.periodType
            );
            const offset = difference(value.from, value.to) - 1;
            value = {
              from: start(add(value.from, offset)),
              to: end(add(value.to, offset)),
              periodType: value.periodType,
            };
            dispatch('change', value);
          }
        }}
      />
    {/if}
  </span>

  <button
    type="button"
    class={cls(
      'text-sm whitespace-nowrap w-full focus:outline-hidden',
      center ? 'text-center' : 'text-left'
    )}
    on:click={() => {
      if (quickPresets.length > 0) {
        showQuickPresetsMenu = !showQuickPresetsMenu;
      } else {
        showDialog = true;
      }
    }}
    {id}
  >
    <DateRangeDisplay {value} />
  </button>

  <div slot="append" class="flex items-center">
    {#if clearable && (value?.periodType || value?.from || value?.to)}
      <Button
        icon={icons.close}
        class="text-surface-content/50 p-1"
        on:click={() => {
          value = _defaultValue;
          dispatch('clear');
          dispatch('change', value);
        }}
      />
    {/if}

    <slot name="append" />

    {#if stepper}
      <Button
        icon={icons.chevronRight}
        class="p-2"
        on:click={() => {
          if (value && value.from && value.to && value.periodType) {
            const { difference, start, end, add } = getDateFuncsByPeriodType(
              $localeSettings,
              value.periodType
            );
            const offset = difference(value.to, value.from) + 1;
            value = {
              from: start(add(value.from, offset)),
              to: end(add(value.to, offset)),
              periodType: value.periodType,
            };
            dispatch('change', value);
          }
        }}
      />
    {/if}
  </div>

  <svelte:fragment slot="root">
    <Menu classes={{ menu: 'p-1' }} bind:open={showQuickPresetsMenu} matchWidth>
      {#each quickPresets as preset}
        <MenuItem
          on:click={() => {
            value = preset.value;
            dispatch('change', preset.value);
          }}
        >
          {preset.label}
        </MenuItem>
      {/each}

      <div class="h-px bg-surface-content/20 my-1"></div>

      <MenuItem
        on:click={() => {
          showDialog = true;
        }}
      >
        Custom...
      </MenuItem>
    </Menu>
  </svelte:fragment>
</Field>

<Dialog
  classes={{
    ...classes.dialog,
    dialog: cls('max-h-[90vh] grid grid-rows-[auto_1fr_auto]', classes.dialog?.dialog),
  }}
  bind:open={showDialog}
>
  <div class="flex flex-col justify-center bg-primary text-primary-content px-6 h-24">
    <div class="text-sm opacity-50">
      {currentValue.periodType ? $format.getPeriodTypeName(currentValue.periodType) : ''}&nbsp;
    </div>
    <div class="text-xl sm:text-2xl">
      <DateRangeDisplay value={currentValue} />
    </div>
  </div>

  <div class="p-2 border-b overflow-auto">
    <DateRange
      bind:selected={currentValue}
      {periodTypes}
      {getPeriodTypePresets}
      {disabledDates}
      class="h-full"
    />
  </div>

  <div slot="actions" class="flex items-center gap-2">
    <Button
      icon={icons.check}
      on:click={() => {
        showDialog = false;
        value = currentValue;
        dispatch('change', value);
      }}
      color="primary"
      variant="fill"
    >
      {$localeSettings.dictionary.Ok}
    </Button>

    <Button
      on:click={() => {
        showDialog = false;
        currentValue = value;
      }}
    >
      {$localeSettings.dictionary.Cancel}
    </Button>
  </div>
</Dialog>
