<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { isWithinInterval } from 'date-fns';

  import { cls } from '@layerstack/tailwind';
  import {
    DateToken,
    PeriodType,
    type CustomIntlDateTimeFormatOptions,
    type SelectedDate,
    getDateFuncsByPeriodType,
  } from '@layerstack/utils';

  import Button from './Button.svelte';
  import { getComponentSettings, getSettings } from './settings.js';

  const dispatch = createEventDispatcher();

  const { classes: settingsClasses, defaults } = getComponentSettings('DateButton');

  export let date: Date;
  export let periodType: PeriodType;
  export let disabled: boolean = false;
  export let selected: SelectedDate;
  export let hidden: boolean = false;
  export let fade: boolean = false;
  export let format: CustomIntlDateTimeFormatOptions | undefined = getCustomFormat(periodType);
  export let variant = defaults.variant;
  let className: string | undefined = undefined;
  export { className as class };

  const { format: format_ux, localeSettings } = getSettings();

  function getCustomFormat(periodType: PeriodType) {
    switch (periodType) {
      case PeriodType.Day:
        return DateToken.DayOfMonth_numeric;
      default:
        // returning undefined will use the default format of PeriodType
        return undefined;
    }
  }

  const { start, end, isSame } = getDateFuncsByPeriodType($localeSettings, periodType);

  $: isSelected =
    selected instanceof Date
      ? isSame(date, selected)
      : selected instanceof Array
        ? selected.some((d) => isSame(date, d))
        : selected instanceof Object
          ? selected.from
            ? isWithinInterval(date, {
                start: start(selected.from),
                end: end(selected.to ?? selected.from),
              })
            : false
          : false;

  $: isSelectedStart =
    selected instanceof Date
      ? isSame(date, selected)
      : selected instanceof Array
        ? selected.some((d) => isSame(date, d))
        : selected instanceof Object
          ? // @ts-expect-error
            isSame(date, selected.from ?? selected.to)
          : false;

  $: isSelectedEnd =
    selected instanceof Date
      ? isSame(date, selected)
      : selected instanceof Array
        ? selected.some((d) => isSame(date, d))
        : selected instanceof Object
          ? // @ts-expect-error
            isSame(date, selected.to ?? selected.from)
          : false;

  $: isCurrent = isSame(date, new Date());

  $: isVerticalSelection =
    periodType === PeriodType.CalendarYear || periodType === PeriodType.FiscalYearOctober;
</script>

<div
  class={cls(
    'DateButton',
    'inline-flex items-center justify-center',
    isSelectedStart ? 'from-transparent' : 'from-primary',
    isSelectedEnd ? 'to-transparent' : 'to-primary',
    isSelected &&
      (isVerticalSelection ? 'bg-linear-to-b from-50% to-50%' : 'bg-linear-to-r from-50% to-50%'),
    hidden && 'opacity-0 pointer-events-none',
    settingsClasses.root,
    className
  )}
>
  <Button
    class={cls(
      'w-8 h-8 rounded-full text-xs transition-none',
      periodType != PeriodType.Day && 'flex-1',
      (disabled || fade) && 'opacity-25',
      isCurrent ? 'font-bold' : 'font-normal'
    )}
    variant={isSelected ? 'fill' : (variant ?? 'default')}
    color={isSelected || isCurrent ? 'primary' : 'default'}
    {disabled}
    on:click={() => {
      // Do not set selected date as this is causing issues with controlled selected (ex. date ranges, arrays, etc) / changing from date to { from: ..., to: ... }
      // selected = date;
      dispatch('dateChange', date);
    }}
  >
    {$format_ux(date, periodType, { custom: format })}
  </Button>
</div>
