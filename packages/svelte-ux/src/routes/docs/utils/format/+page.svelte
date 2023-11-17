<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import { format } from '$lib/utils/format';
  import { PeriodType } from '$lib/utils/date';
  import Code from '$lib/components/Code.svelte';

  const date = new Date('1982-03-30T00:00:00');
</script>

<h1>Usage</h1>

<Code source={`import { format } from 'svelte-ux';`} language="javascript" class="mb-4" />

<h1>Examples</h1>

<h2>number formats (defaut setup)</h2>

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

<h2>number formats (local setup)</h2>

<span>
  You can customize numbers with the 3rd arg that is an enhanced <b>`Intl.NumberFormatOptions`</b>
  type. You can pass for example locales like <b>fr</b>, <b>de</b>, ... You can also to that
  globally in the <a class="text-accent-500" href="/customization#setup">Setup</a>.
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

<h2>Period formats</h2>

<Preview showCode>
  <div>{format(date, PeriodType.Day)}</div>
  <div>{format(date, PeriodType.Month)}</div>
  <div>{format(date, PeriodType.CalendarYear)}</div>
  <div>{format(date, PeriodType.Day, 'short')}</div>
</Preview>
