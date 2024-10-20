<script lang="ts">
  import { PeriodType, getDateFuncsByPeriodType } from '@layerstack/utils';
  import { type DateRange } from '@layerstack/utils/dateRange';
  import { getSettings } from './settings.js';

  export let value: DateRange | null | undefined;

  const { format: format_ux, localeSettings } = getSettings();

  let showToValue = false;
  $: if (value?.to) {
    if (value?.from && value?.periodType) {
      const { isSame } = getDateFuncsByPeriodType($localeSettings, value.periodType);

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

  const getPeriodType = (value: DateRange | null | undefined) => {
    let periodType = value?.periodType ?? PeriodType.Day;
    // Override periodTypes that show ranges for individual values
    switch (periodType) {
      case PeriodType.WeekSun:
      case PeriodType.WeekMon:
      case PeriodType.WeekTue:
      case PeriodType.WeekWed:
      case PeriodType.WeekThu:
      case PeriodType.WeekFri:
      case PeriodType.WeekSat:
      case PeriodType.Week:

      case PeriodType.BiWeek1Sun:
      case PeriodType.BiWeek1Mon:
      case PeriodType.BiWeek1Tue:
      case PeriodType.BiWeek1Wed:
      case PeriodType.BiWeek1Thu:
      case PeriodType.BiWeek1Fri:
      case PeriodType.BiWeek1Sat:
      case PeriodType.BiWeek1:

      case PeriodType.BiWeek2Sun:
      case PeriodType.BiWeek2Mon:
      case PeriodType.BiWeek2Tue:
      case PeriodType.BiWeek2Wed:
      case PeriodType.BiWeek2Thu:
      case PeriodType.BiWeek2Fri:
      case PeriodType.BiWeek2Sat:
      case PeriodType.BiWeek2:
        periodType = PeriodType.Day;
        break;

      case PeriodType.Quarter:
        periodType = PeriodType.Month;
        break;
    }
    return periodType;
  };
</script>

{#if value?.from}
  {$format_ux(value.from, getPeriodType(value), { variant: 'long' })}
{:else}
  <div>&nbsp;</div>
{/if}

{#if value?.to && showToValue}
  <span> - </span>
  {$format_ux(value.to, getPeriodType(value), { variant: 'long' })}
{/if}
