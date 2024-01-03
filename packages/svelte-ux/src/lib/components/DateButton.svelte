<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { isWithinInterval } from 'date-fns';

  import Button from './Button.svelte';
  import { DateToken, getDateFuncsByPeriodType, PeriodType } from '../utils/date';
  import type { SelectedDate } from '../utils/date';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';
  import { format as format_ux } from '../utils';

  const dispatch = createEventDispatcher();

  export let date: Date;
  export let periodType: PeriodType;
  export let disabled: boolean = false;
  export let selected: SelectedDate;
  export let hidden: boolean = false;
  export let fade: boolean = false;
  export let format = getCustomFormat(periodType);

  const theme = getComponentTheme('DateButton');

  function getCustomFormat(periodType: PeriodType) {
    switch (periodType) {
      case PeriodType.Day:
        return DateToken.DayOfMonth_numeric;
      default:
        // returning undefined will use the default format of PeriodType
        return undefined;
    }
  }

  const { start, end, isSame } = getDateFuncsByPeriodType(periodType);

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
          ? isSame(date, selected.from ?? selected.to)
          : false;

  $: isSelectedEnd =
    selected instanceof Date
      ? isSame(date, selected)
      : selected instanceof Array
        ? selected.some((d) => isSame(date, d))
        : selected instanceof Object
          ? isSame(date, selected.to ?? selected.from)
          : false;

  $: isCurrent = isSame(date, new Date());

  $: isVerticalSelection =
    periodType === PeriodType.CalendarYear || periodType === PeriodType.FiscalYearOctober;
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
    theme.root,
    $$props.class
  )}
>
  <Button
    class={cls(
      'w-8 h-8 rounded-full text-xs transition-none',
      periodType != PeriodType.Day && 'flex-1',
      (disabled || fade) && 'opacity-25',
      isCurrent ? 'font-bold' : 'font-normal'
    )}
    variant={isSelected ? 'fill' : 'default'}
    color={isSelected || isCurrent ? 'primary' : 'default'}
    {disabled}
    on:click={() => {
      // Do not set selected date as this is causing issues with controlled selected (ex. date ranges, arrays, etc) / changing from date to { from: ..., to: ... }
      // selected = date;
      dispatch('dateChange', date);
    }}
  >
    {format_ux(date, periodType, { custom: format })}
  </Button>
</div>
