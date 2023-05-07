<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';

  import { dateDisplay } from '$lib/utils/dateDisplay';
  import { PeriodType } from '$lib/utils/date';
</script>

<h1>Examples</h1>

<h2>No format</h2>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'))}
</Preview>

<h2>Custom format</h2>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), { format: 'EEE, MMMM do' })}
</Preview>

<h2>PeriodType Day w/ long (default)</h2>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Day,
  })}
</Preview>

<h3>short</h3>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Day,
    variant: 'short',
  })}
</Preview>

<h2>PeriodType WeekSun w/ long (default)</h2>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.WeekSun,
  })}
</Preview>

<h3>short</h3>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.WeekSun,
    variant: 'short',
  })}
</Preview>

<h2>PeriodType BiWeek1Sun w/ long (default)</h2>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.BiWeek1Sun,
  })}
</Preview>

<h3>short</h3>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.BiWeek1Sun,
    variant: 'short',
  })}
</Preview>

<h2>PeriodType Month w/ long (default)</h2>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Month,
  })}
</Preview>

<h3>short</h3>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Month,
    variant: 'short',
  })}
</Preview>

<h2>PeriodType Quarter w/ long (default)</h2>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Quarter,
  })}
</Preview>

<h3>short</h3>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.Quarter,
    variant: 'short',
  })}
</Preview>

<h2>PeriodType CalendarYear w/ long (default)</h2>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.CalendarYear,
  })}
</Preview>

<h3>short</h3>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.CalendarYear,
    variant: 'short',
  })}
</Preview>

<h2>PeriodType FiscalYearOctober w/ long (default)</h2>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.FiscalYearOctober,
  })}
</Preview>

<h3>short</h3>

<Preview>
  {dateDisplay(new Date('1982-03-30T00:00:00'), {
    periodType: PeriodType.FiscalYearOctober,
    variant: 'short',
  })}
</Preview>
