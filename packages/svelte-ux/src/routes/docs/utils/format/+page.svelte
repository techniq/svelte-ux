<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import { format } from '$lib/utils/format';
  import { DateToken, PeriodType } from '$lib/utils/date';
  import Code from '$lib/components/Code.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import MenuField from '$lib/components/MenuField.svelte';
  import type { FormatNumberStyle } from '$lib/utils/number';
  import DatePickerField from '$lib/components/DatePickerField.svelte';
  import { getSettings } from '$lib/components/settings';

  const settings = getSettings();

  let value = 1234.56;
  let style: FormatNumberStyle = 'decimal';
  let locales: string = 'en';
  let currency: string = 'USD';

  let myDate = new Date('1982-03-30T07:11:00');
</script>

<h1>Usage</h1>

<Code source={`import { format } from 'svelte-ux';`} language="javascript" class="mb-4" />

<h1>Playgrounds</h1>
<h2>Playground numbers</h2>

<div class="grid grid-cols-xs gap-2 mb-2">
  <TextField label="number" bind:value type="decimal" />

  <MenuField
    label="locale"
    bind:value={locales}
    options={['en', 'de', 'fr', 'jp'].map((value) => ({ label: value, value }))}
  />

  <MenuField
    label="style"
    bind:value={style}
    options={['integer', 'decimal', 'currency', 'percent', 'percentRound', 'metric'].map(
      (value) => ({ label: value, value })
    )}
  />

  <MenuField
    label="currency"
    bind:value={currency}
    options={['USD', 'EUR', 'GBP', 'JPY'].map((value) => ({ label: value, value }))}
  />
</div>

<Preview>
  <div>{format(value, style, { locales, currency })}</div>
</Preview>

<h2>Playground dates</h2>

<div class="grid grid-cols-xs gap-2 mb-2">
  <DatePickerField format="dd/MM/yyyy" label="date" bind:value={myDate}></DatePickerField>

  <MenuField
    label="locale"
    bind:value={locales}
    options={['en', 'de', 'fr', 'jp'].map((value) => ({ label: value, value }))}
  />
</div>

<Preview>
  <div>{format(myDate, PeriodType.Day, { locales })}</div>
</Preview>

<h1>Numbers</h1>

<h2>number formats (defaut settings)</h2>

<Preview showCode>
  <div>{format(1234.56, 'integer')}</div>
  <div>{format(1234.56, 'decimal')}</div>
  <div>{format(1234.56, 'currency')}</div>
  <div>{format(0.5678, 'percent')}</div>
  <div>{format(0.5678, 'percentRound')}</div>
  <div>{format(1_234_567, 'metric', { minimumSignificantDigits: 5 })}</div>
  <div>{format(1_200_000, 'metric')}</div>
  <div>{format(0.5678, 'percent', { fractionDigits: 1 })}</div>
</Preview>

<h2>number formats (local settings)</h2>

<span>
  You can customize numbers with the 3rd arg that is an enhanced <b>`Intl.NumberFormatOptions`</b>
  type. You can pass for example locales like <b>fr</b>, <b>de</b>, ... You can also to that
  globally in the <a class="text-primary" href="/customization#settings">Settings</a>.
</span>

<Preview showCode>
  <div>{format(1234.56, 'integer', { locales: 'fr' })}</div>
  <div>{format(1234.56, 'decimal', { locales: 'fr' })}</div>
  <div>{format(1234.56, 'currency', { locales: 'fr', currency: 'EUR' })}</div>
  <div>{format(0.5678, 'percent', { locales: 'fr' })}</div>
  <div>{format(0.5678, 'percentRound', { locales: 'fr' })}</div>
  <div>{format(1_234_567, 'metric', { locales: 'fr', minimumSignificantDigits: 5 })}</div>
  <div>{format(1_200_000, 'metric', { locales: 'fr' })}</div>
  <div>{format(0.5678, 'percent', { locales: 'fr', fractionDigits: 1 })}</div>
</Preview>

<h1>Dates</h1>

<h2>Custom format</h2>

<div class="grid grid-cols-3 gap-4">
  <div>
    <h3>With random string</h3>
    <Preview>
      {format(myDate, PeriodType.Custom, {
        custom: 'eee, MMMM do',
      })}
    </Preview>
  </div>
  <div>
    <h3>With descriptive tokens</h3>
    <Preview>
      {format(myDate, PeriodType.Custom, {
        custom: [DateToken.DayOfWeek_short, DateToken.Month_long, DateToken.DayOfMonth_withOrdinal],
      })}
    </Preview>
  </div>
  <div>
    <h3>With full intl</h3>
    <Preview>
      {format(myDate, PeriodType.Custom, {
        custom: { weekday: 'short', month: 'long', day: 'numeric', withOrdinal: true },
      })}
    </Preview>
  </div>
</div>

<h2>PeriodType Day</h2>

<div class="grid grid-cols-3 gap-4">
  <div>
    <h3>short</h3>
    <Preview>
      {format(myDate, PeriodType.Day, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {format(myDate, PeriodType.Day, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {format(myDate, PeriodType.Day, {
        variant: 'long',
      })}
    </Preview>
  </div>
</div>

<h2>PeriodType DayTime</h2>

<div class="grid grid-cols-3 gap-4">
  <div>
    <h3>short</h3>
    <Preview>
      {format(myDate, PeriodType.DayTime, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {format(myDate, PeriodType.DayTime, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {format(myDate, PeriodType.DayTime, {
        variant: 'long',
      })}
    </Preview>
  </div>
</div>

<h2>PeriodType TimeOnly</h2>

<div class="grid grid-cols-3 gap-4">
  <div>
    <h3>short</h3>
    <Preview>
      {format(myDate, PeriodType.TimeOnly, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {format(myDate, PeriodType.TimeOnly, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {format(myDate, PeriodType.TimeOnly, {
        variant: 'long',
      })}
    </Preview>
  </div>
</div>

<h2>PeriodType Week</h2>
<span>
  It will take your default <b>weekStartsOn</b>
  <a class="text-accent-500" href="/customization#settings">settings</a>, if you want to be
  specific, you can also use
  <b>PeriodType.WeekSun</b>
</span>
<div class="grid grid-cols-3 gap-4">
  <div>
    <h3>short</h3>
    <Preview>
      {format(myDate, PeriodType.Week, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {format(myDate, PeriodType.Week, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {format(myDate, PeriodType.Week, {
        variant: 'long',
      })}
    </Preview>
  </div>
</div>

<h2>PeriodType BiWeek1</h2>
<span>
  It will take your default <b>weekStartsOn</b>
  <a class="text-accent-500" href="/customization#settings">settings</a>, if you want to be
  specific, you can also use
  <b>PeriodType.BiWeek1Sun</b>
</span>
<div class="grid grid-cols-3 gap-4">
  <div>
    <h3>short</h3>
    <Preview>
      {format(myDate, PeriodType.BiWeek1, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {format(myDate, PeriodType.BiWeek1, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {format(myDate, PeriodType.BiWeek1, {
        variant: 'long',
      })}
    </Preview>
  </div>
</div>

<h2>PeriodType Month</h2>

<div class="grid grid-cols-3 gap-4">
  <div>
    <h3>short</h3>
    <Preview>
      {format(myDate, PeriodType.Month, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {format(myDate, PeriodType.Month, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {format(myDate, PeriodType.Month, {
        variant: 'long',
      })}
    </Preview>
  </div>
</div>

<h2>PeriodType Quarter</h2>

<div class="grid grid-cols-3 gap-4">
  <div>
    <h3>short</h3>
    <Preview>
      {format(myDate, PeriodType.Quarter, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {format(myDate, PeriodType.Quarter, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {format(myDate, PeriodType.Quarter, {
        variant: 'long',
      })}
    </Preview>
  </div>
</div>

<h2>PeriodType CalendarYear</h2>

<div class="grid grid-cols-3 gap-4">
  <div>
    <h3>short</h3>
    <Preview>
      {format(myDate, PeriodType.CalendarYear, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {format(myDate, PeriodType.CalendarYear, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {format(myDate, PeriodType.CalendarYear, {
        variant: 'long',
      })}
    </Preview>
  </div>
</div>

<h2>PeriodType FiscalYearOctober</h2>

<div class="grid grid-cols-3 gap-4">
  <div>
    <h3>short</h3>
    <Preview>
      {format(myDate, PeriodType.FiscalYearOctober, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {format(myDate, PeriodType.FiscalYearOctober, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {format(myDate, PeriodType.FiscalYearOctober, {
        variant: 'long',
      })}
    </Preview>
  </div>
</div>

<h2>Date / Period formats (local settings)</h2>

<span>
  You can customize numbers with the 3rd arg. You can pass for example locales like <b>fr</b>,
  <b>de</b>, ... You can also to that globally in the
  <a class="text-accent-500" href="/customization#settings">Settings</a>.
</span>

<Preview showCode>
  <div>{format(myDate, PeriodType.Day, { locales: 'fr' })}</div>
  <div>{format(myDate, PeriodType.Month, { locales: 'fr' })}</div>
  <div>{format(myDate, PeriodType.CalendarYear, { locales: 'fr' })}</div>
  <div>{format(myDate, PeriodType.Day, { variant: 'short', locales: 'fr' })}</div>
  <div>{format(myDate, PeriodType.Month, { variant: 'short', locales: 'fr' })}</div>
  <div>
    {format(myDate, PeriodType.CalendarYear, { variant: 'short', locales: 'fr' })}
  </div>
</Preview>
