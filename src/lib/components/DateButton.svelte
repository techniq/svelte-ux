<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { format as dateFormat, isWithinInterval } from 'date-fns';

  import Button from './Button.svelte';
  import { getDateFuncsByPeriodType, PeriodType } from '../utils/date';
  import type { SelectedDate } from '../utils/date';
  import { cls } from '../utils/styles';

  const dispatch = createEventDispatcher();

  export let date: Date;
  export let periodType: PeriodType;
  export let disabled: boolean = false;
  export let selected: SelectedDate;
  export let hidden: boolean = false;
  export let fade: boolean = false;
  export let format = getDefaultFormat(periodType);

  function getDefaultFormat(periodType: PeriodType) {
    switch (periodType) {
      case PeriodType.CalendarYear:
      case PeriodType.FiscalYearOctober:
        return 'yyyy';
      case PeriodType.Month:
        return 'MMM';
      case PeriodType.Day:
        return 'd';
      default:
        return 'MM/dd/yyyy';
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
    'inline-flex items-center justify-center',
    isSelectedStart
      ? '[--tw-gradient-from:transparent]'
      : '[--tw-gradient-from:theme(colors.accent.500)]',
    isSelectedEnd
      ? '[--tw-gradient-to:transparent]'
      : '[--tw-gradient-to:theme(colors.accent.500)]',
    isSelected && (isVerticalSelection ? 'bg-gradient-to-b' : 'bg-gradient-to-r'),
    hidden && 'opacity-0 pointer-events-none'
  )}
>
  <Button
    class={cls(
      'w-8 h-8 rounded-full text-xs',
      periodType != PeriodType.Day && 'flex-1',
      (disabled || fade) && 'opacity-25',
      isCurrent ? 'font-bold' : 'font-normal'
    )}
    variant={isSelected ? 'filled' : 'text'}
    color={isSelected || isCurrent ? 'accent' : 'default'}
    {disabled}
    on:click={() => {
      // Do not set selected date as this is causing issues with controlled selected (ex. date ranges, arrays, etc) / changing from date to { from: ..., to: ... }
      // selected = date;
      dispatch('dateChange', date);
    }}
  >
    {dateFormat(date, format)}
  </Button>
</div>
