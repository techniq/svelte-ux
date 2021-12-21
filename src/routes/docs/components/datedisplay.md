---
component: $component
filename: $filename
---

<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';

  import { dateDisplay } from '$lib/utils/dateDisplay';
  import { PeriodType } from '$lib/utils/date';
</script>

## No format

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'))}
</Preview>

## Custom format

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), { format: 'EEE, MMMM do' })}
</Preview>

## PeriodType Day w/ long (default)

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Day,
  })}
</Preview>

### short

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Day,
    variant: 'short',
  })}
</Preview>

## PeriodType WeekSun w/ long (default)

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.WeekSun,
  })}
</Preview>

### short

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.WeekSun,
    variant: 'short',
  })}
</Preview>

## PeriodType BiWeek1Sun w/ long (default)

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.BiWeek1Sun,
  })}
</Preview>

### short

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.BiWeek1Sun,
    variant: 'short',
  })}
</Preview>

## PeriodType Month w/ long (default)

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Month,
  })}
</Preview>

### short

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Month,
    variant: 'short',
  })}
</Preview>

## PeriodType Quarter w/ long (default)

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Quarter,
  })}
</Preview>

### short

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Quarter,
    variant: 'short',
  })}
</Preview>

## PeriodType CalendarYear w/ long (default)

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.CalendarYear,
  })}
</Preview>

### short

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.CalendarYear,
    variant: 'short',
  })}
</Preview>

## PeriodType FiscalYearOctober w/ long (default)

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.FiscalYearOctober,
  })}
</Preview>

### short

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.FiscalYearOctober,
    variant: 'short',
  })}
</Preview>
