<script lang="ts">
  import { isWithinInterval } from 'date-fns';

  import Button from './Button.svelte';
  import { getDateFuncsByPeriodType } from '../utils/date.js';
  import {
    DateToken,
    PeriodType,
    type CustomIntlDateTimeFormatOptions,
    type SelectedDate,
  } from '../utils/date_types.js';
  import { cls } from '../utils/styles.js';
  import { getComponentSettings, getSettings } from './settings.js';

  const { classes: settingsClasses, defaults } = getComponentSettings('DateButton');

  interface Props {
    date: Date;
    periodType: PeriodType;
    disabled?: boolean;
    selected: SelectedDate;
    hidden?: boolean;
    fade?: boolean;
    format?: CustomIntlDateTimeFormatOptions;
    variant?: any;
    class?: string;
    onDateChange?: (value: Date) => void;
  }

  let {
    date,
    periodType,
    disabled = false,
    selected = $bindable(),
    hidden = false,
    fade = false,
    format = getCustomFormat(periodType),
    variant = defaults.variant,
    class: className,
    onDateChange,
  }: Props = $props();

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

  let isSelected = $derived(
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
          : false
  );

  let isSelectedStart = $derived(
    selected instanceof Date
      ? isSame(date, selected)
      : selected instanceof Array
        ? selected.some((d) => isSame(date, d))
        : selected instanceof Object
          ? // @ts-expect-error
            isSame(date, selected.from ?? selected.to)
          : false
  );

  let isSelectedEnd = $derived(
    selected instanceof Date
      ? isSame(date, selected)
      : selected instanceof Array
        ? selected.some((d) => isSame(date, d))
        : selected instanceof Object
          ? // @ts-expect-error
            isSame(date, selected.to ?? selected.from)
          : false
  );

  let isCurrent = $derived(isSame(date, new Date()));

  let isVerticalSelection = $derived(
    periodType === PeriodType.CalendarYear || periodType === PeriodType.FiscalYearOctober
  );
</script>

<div
  style="--tw-gradient-stops: var(--tw-gradient-from) 50%, var(--tw-gradient-to) 50%"
  class={cls(
    'DateButton',
    'inline-flex items-center justify-center',
    isSelectedStart
      ? '[--tw-gradient-from:transparent]'
      : '[--tw-gradient-from:theme(colors.primary)]',
    isSelectedEnd ? '[--tw-gradient-to:transparent]' : '[--tw-gradient-to:theme(colors.primary)]',
    isSelected && (isVerticalSelection ? 'bg-gradient-to-b' : 'bg-gradient-to-r'),
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
    onclick={() => {
      // Do not set selected date as this is causing issues with controlled selected (ex. date ranges, arrays, etc) / changing from date to { from: ..., to: ... }
      // selected = date;
      onDateChange?.(date);
    }}
  >
    {$format_ux(date, periodType, { custom: format })}
  </Button>
</div>
