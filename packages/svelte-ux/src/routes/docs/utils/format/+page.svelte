<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import { DateToken, PeriodType } from '$lib/utils/date.js';
  import Code from '$lib/components/Code.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import MenuField from '$lib/components/MenuField.svelte';
  import type { FormatNumberStyle } from '$lib/utils/number.js';
  import DatePickerField from '$lib/components/DatePickerField.svelte';
  import { settings } from '$lib/components/settings.js';

  const { locale, format } = settings({});

  let value = 1234.56;
  let style: FormatNumberStyle = 'decimal';
  let currency: Intl.NumberFormatOptions['currency'] | null = 'USD';
  let notation: Intl.NumberFormatOptions['notation'] = 'standard';

  let myDate = new Date('1982-03-30T07:11:00');

  const locales = ['en', 'de', 'fr', 'it', 'es', 'jp', 'zh'];
</script>

<h1>Usage</h1>

<Code
  source={"const { format } = getSettings();\n$format(123.456, 'decimal');"}
  language="javascript"
  class="mb-4"
/>

<h1>Playgrounds</h1>
<h2>Playground numbers</h2>

<div class="grid grid-cols-xs gap-2 mb-2">
  <TextField label="value" bind:value type="decimal" />

  <MenuField
    label="style"
    bind:value={style}
    options={[
      'integer',
      'decimal',
      'currency',
      'currencyRound',
      'percent',
      'percentRound',
      'metric',
    ].map((value) => ({ label: value, value }))}
  />

  <MenuField
    label="currency"
    bind:value={currency}
    options={[null, 'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'MXN'].map((value) => ({
      label: value ?? 'None',
      value,
    }))}
  />

  <MenuField
    label="locale"
    bind:value={$locale}
    options={locales.map((value) => ({ label: value, value }))}
  />

  <MenuField
    label="notation"
    bind:value={notation}
    options={['standard', 'scientific', 'engineering', 'compact'].map((value) => ({
      label: value,
      value,
    }))}
  />
</div>

<Preview>
  <div>{$format(value, style, { currency, notation })}</div>
</Preview>

<h2>Playground dates</h2>

<div class="grid grid-cols-xs gap-2 mb-2">
  <DatePickerField format="dd/MM/yyyy" label="date" bind:value={myDate}></DatePickerField>

  <MenuField
    label="locale"
    bind:value={$locale}
    options={locales.map((value) => ({ label: value, value }))}
  />
</div>

<Preview>
  <div>{$format(myDate, PeriodType.Day)}</div>
</Preview>

<h1>Numbers</h1>

<h2>Number Formats (default settings)</h2>

<Preview showCode>
  <div>{$format(1234.56, 'integer')}</div>
  <div>{$format(1234.56, 'decimal')}</div>
  <div>{$format(1234.56, 'currency')}</div>
  <div>{$format(0.5678, 'percent')}</div>
  <div>{$format(0.5678, 'percentRound')}</div>
  <div>{$format(1_234_567, 'metric')}</div>
  <div>{$format(1_200_000, 'metric')}</div>
  <div>{$format(0.5678, 'percent')}</div>
</Preview>

<h2>number formats (additional options)</h2>

<span>
  You can customize numbers with the 3rd arg that is an enhanced <b>`Intl.NumberFormatOptions`</b> type.
</span>

<Preview showCode>
  <div>{$format(1234.56, 'integer', { maximumSignificantDigits: 2 })}</div>
  <div>{$format(1234.56, 'decimal', { maximumSignificantDigits: 5 })}</div>
  <div>{$format(1234.56, 'currency', { currency: 'EUR' })}</div>
  <div>
    {$format(123_456_789.99, 'currency', { notation: 'compact', maximumSignificantDigits: 3 })}
  </div>
  <div>{$format(0.5678, 'percent', { signDisplay: 'always' })}</div>
  <div>{$format(0.5678, 'percentRound', { signDisplay: 'always' })}</div>
  <div>{$format(1_234_567, 'metric', { minimumSignificantDigits: 12 })}</div>
  <div>{$format(0.5678, 'percent', { fractionDigits: 1 })}</div>
</Preview>

<h1>Dates</h1>

<h2>Custom format</h2>

<div class="grid grid-cols-3 gap-4">
  <div>
    <h3>With format string</h3>
    <Preview>
      {$format(myDate, PeriodType.Custom, {
        custom: 'eee, MMMM do',
      })}
    </Preview>
  </div>
  <div>
    <h3>With descriptive tokens</h3>
    <Preview>
      {$format(myDate, PeriodType.Custom, {
        custom: [DateToken.DayOfWeek_short, DateToken.Month_long, DateToken.DayOfMonth_withOrdinal],
      })}
    </Preview>
  </div>
  <div>
    <h3>With full intl</h3>
    <Preview>
      {$format(myDate, PeriodType.Custom, {
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
      {$format(myDate, PeriodType.Day, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {$format(myDate, PeriodType.Day, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {$format(myDate, PeriodType.Day, {
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
      {$format(myDate, PeriodType.DayTime, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {$format(myDate, PeriodType.DayTime, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {$format(myDate, PeriodType.DayTime, {
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
      {$format(myDate, PeriodType.TimeOnly, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {$format(myDate, PeriodType.TimeOnly, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {$format(myDate, PeriodType.TimeOnly, {
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
      {$format(myDate, PeriodType.Week, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {$format(myDate, PeriodType.Week, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {$format(myDate, PeriodType.Week, {
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
      {$format(myDate, PeriodType.BiWeek1, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {$format(myDate, PeriodType.BiWeek1, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {$format(myDate, PeriodType.BiWeek1, {
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
      {$format(myDate, PeriodType.Month, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {$format(myDate, PeriodType.Month, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {$format(myDate, PeriodType.Month, {
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
      {$format(myDate, PeriodType.Quarter, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {$format(myDate, PeriodType.Quarter, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {$format(myDate, PeriodType.Quarter, {
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
      {$format(myDate, PeriodType.CalendarYear, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {$format(myDate, PeriodType.CalendarYear, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {$format(myDate, PeriodType.CalendarYear, {
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
      {$format(myDate, PeriodType.FiscalYearOctober, {
        variant: 'short',
      })}
    </Preview>
  </div>
  <div>
    <h3>default</h3>
    <Preview>
      {$format(myDate, PeriodType.FiscalYearOctober, {
        // variant: 'default',
      })}
    </Preview>
  </div>
  <div>
    <h3>long</h3>
    <Preview>
      {$format(myDate, PeriodType.FiscalYearOctober, {
        variant: 'long',
      })}
    </Preview>
  </div>
</div>
