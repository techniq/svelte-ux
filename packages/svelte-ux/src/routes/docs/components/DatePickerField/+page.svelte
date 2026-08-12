<script lang="ts">
  import LucideCalendar from '~icons/lucide/calendar.svelte';

  import { Button, DatePickerField, Switch } from 'svelte-ux';
  import { PeriodType } from '@layerstack/utils';

  import Preview from '$lib/components/Preview.svelte';

  let value = new Date();

  let valueUtc: Date | null = null;
  let utcValue = false;

  // Day before US DST starts (2026-03-08), to verify stepping across the transition
  let valueDst: Date | null = new Date('2026-03-07T00:00:00Z');
  let utcDst = false;

  const iso = (date: Date | null) => date?.toISOString() ?? '(none)';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <DatePickerField />
</Preview>

<h2>Controlled</h2>

<Preview>
  <DatePickerField bind:value />
</Preview>

<h2>Icon</h2>

<Preview>
  <DatePickerField icon={LucideCalendar} bind:value />
</Preview>

<h2>Label</h2>

<Preview>
  <DatePickerField label="Date of Birth" icon={LucideCalendar} bind:value />
</Preview>

<h2>Stepper w/ default (day)</h2>

<Preview>
  <DatePickerField bind:value stepper />
</Preview>

<h2>Stepper w/ month</h2>

<Preview>
  <DatePickerField periodType={PeriodType.Month} bind:value stepper />
</Preview>

<h2>Stepper w/ rounded</h2>

<Preview>
  <DatePickerField bind:value stepper rounded />
</Preview>

<h2>Stepper w/ rounded & center</h2>

<Preview>
  <DatePickerField bind:value stepper rounded center />
</Preview>

<h2>Icon only</h2>

<Preview>
  <DatePickerField iconOnly />
</Preview>

<h2>Label only</h2>

<Preview>
  <DatePickerField label="Start Date" />
</Preview>

<h2>Clearable</h2>

<Preview>
  <DatePickerField label="Start Date" clearable />
</Preview>

<h2>within form</h2>

<Preview>
  <form
    on:submit={(e) => {
      e.preventDefault();
      // @ts-expect-error
      const formData = new FormData(e.target);
      alert(formData.get('start_date'));
    }}
  >
    <DatePickerField label="Start Date" name="start_date" clearable />
    <Button type="submit">Submit</Button>
  </form>
</Preview>

<h2>UTC</h2>

<h3>Selected value</h3>

<div class="text-sm text-surface-content/60 mb-2">
  With <code>utc</code>, the picker and the displayed value use UTC calendar days, so picking a day
  produces UTC midnight (<code>T00:00:00.000Z</code>) instead of local midnight.
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcValue} size="md" /> utc
  </label>

  <!-- utc is read when the nested calendar is created, so re-create on toggle -->
  {#key utcValue}
    <DatePickerField label="Date" icon={LucideCalendar} utc={utcValue} bind:value={valueUtc} />
  {/key}

  <div class="text-sm text-surface-content/50 mt-3">{iso(valueUtc)}</div>
</Preview>

<h3>Stepper across a DST transition</h3>

<div class="text-sm text-surface-content/60 mb-2">
  Starting at <code>2026-03-07T00:00:00Z</code> (US DST starts Mar 8), step forward a few days. With
  <code>utc</code> every step stays on <code>T00:00:00.000Z</code>, while local steps keep local
  midnight and shift their UTC offset by an hour after the transition.
</div>

<Preview>
  <label class="flex items-center gap-2 text-sm w-fit mb-3">
    <Switch bind:checked={utcDst} size="md" /> utc
  </label>

  {#key utcDst}
    <DatePickerField utc={utcDst} bind:value={valueDst} stepper />
  {/key}

  <div class="text-sm text-surface-content/50 mt-3">{iso(valueDst)}</div>
</Preview>
