<script lang="ts">
  import { formatDate, PeriodType, getDateFuncsByPeriodType } from '../utils/date';
  import type { DateRange } from '../utils/dateRange';

  import { dateDisplay } from '../utils/dateDisplay';

  export let value: DateRange | null | undefined;
  export let variant: Parameters<typeof formatDate>[2] = undefined;
  export let format: string = undefined;
  export let utc: boolean = undefined;

  let showToValue = false;
  $: if (value?.to) {
    if (value?.from && value?.periodType) {
      const { isSame } = getDateFuncsByPeriodType(value.periodType);

      switch (value.periodType) {
        case PeriodType.Day:
        case PeriodType.Month:
        case PeriodType.CalendarYear:
        case PeriodType.FiscalYearOctober:
          showToValue = !isSame(value.from, value.to);
          break;
        default:
          // Always show "to" value for week and quarter
          showToValue = true;
      }
    } else {
      showToValue = true;
    }
  }

  $: periodType = value?.periodType;

  // Override periodTypes that show ranges for individual values
  $: switch (periodType) {
    case PeriodType.WeekSun:
    case PeriodType.WeekMon:
    case PeriodType.WeekTue:
    case PeriodType.WeekWed:
    case PeriodType.WeekThu:
    case PeriodType.WeekFri:
    case PeriodType.WeekSat:

    case PeriodType.BiWeek1Sun:
    case PeriodType.BiWeek1Mon:
    case PeriodType.BiWeek1Tue:
    case PeriodType.BiWeek1Wed:
    case PeriodType.BiWeek1Thu:
    case PeriodType.BiWeek1Fri:
    case PeriodType.BiWeek1Sat:

    case PeriodType.BiWeek2Sun:
    case PeriodType.BiWeek2Mon:
    case PeriodType.BiWeek2Tue:
    case PeriodType.BiWeek2Wed:
    case PeriodType.BiWeek2Thu:
    case PeriodType.BiWeek2Fri:
    case PeriodType.BiWeek2Sat:
      periodType = PeriodType.Day;
      break;

    case PeriodType.Quarter:
      periodType = PeriodType.Month;
      break;
  }
</script>

{#if value?.from}
  {dateDisplay(value.from, { periodType, format, variant, utc })}
{:else}
  <div class="italic">Empty</div>
{/if}

{#if value?.to && showToValue}
  <span> - </span>
  {dateDisplay(value.to, { periodType, format, variant, utc })}
{/if}
