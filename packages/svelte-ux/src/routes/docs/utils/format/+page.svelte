<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import { format } from '$lib/utils/format';
  import { PeriodType } from '$lib/utils/date';
  import Code from '$lib/components/Code.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import MenuField from '$lib/components/MenuField.svelte';
  import type { FormatNumberStyle } from '$lib/utils/number';
  import DateField from '$lib/components/DateField.svelte';

  let value = 1234.56;
  let style: FormatNumberStyle = 'decimal';
  let locales: string = 'en';
  let currency: string = 'USD';

  let date = new Date('1982-11-30T00:00:00');
</script>

<h1>Usage</h1>

<Code source={`import { format } from 'svelte-ux';`} language="javascript" class="mb-4" />

<h1>Examples</h1>

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
  <DateField format="dd/MM/yyyy" label="date" bind:value={date}></DateField>

  <MenuField
    label="locale"
    bind:value={locales}
    options={['en', 'de', 'fr', 'jp'].map((value) => ({ label: value, value }))}
  />
</div>

<Preview>
  <div>{format(date, PeriodType.Day, { locales })}</div>
</Preview>

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
  globally in the <a class="text-accent-500" href="/customization#settings">Settings</a>.
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

<h2>Date / Period formats (defaut settings)</h2>

<Preview showCode>
  <div>{format(date, PeriodType.Day)}</div>
  <div>{format(date, PeriodType.Month)}</div>
  <div>{format(date, PeriodType.CalendarYear)}</div>
  <div>{format(date, PeriodType.Day, { variant: 'short' })}</div>
  <div>{format(date, PeriodType.Month, { variant: 'short' })}</div>
  <div>{format(date, PeriodType.CalendarYear, { variant: 'short' })}</div>
</Preview>

<h2>Date / Period formats (local settings)</h2>

<span>
  You can customize numbers with the 3rd arg. You can pass for example locales like <b>fr</b>,
  <b>de</b>, ... You can also to that globally in the
  <a class="text-accent-500" href="/customization#settings">Settings</a>.
</span>

<Preview showCode>
  <div>{format(date, PeriodType.Day, { locales: 'fr' })}</div>
  <div>{format(date, PeriodType.Month, { locales: 'fr' })}</div>
  <div>{format(date, PeriodType.CalendarYear, { locales: 'fr' })}</div>
  <div>{format(date, PeriodType.Day, { variant: 'short', locales: 'fr' })}</div>
  <div>{format(date, PeriodType.Month, { variant: 'short', locales: 'fr' })}</div>
  <div>
    {format(date, PeriodType.CalendarYear, { variant: 'short', locales: 'fr' })}
  </div>
</Preview>
