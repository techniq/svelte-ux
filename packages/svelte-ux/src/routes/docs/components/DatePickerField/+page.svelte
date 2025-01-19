<script lang="ts">
  import { mdiCalendar } from '@mdi/js';

  import { Button, DatePickerField } from 'svelte-ux';
  import { PeriodType } from '@layerstack/utils';

  import Preview from '$lib/components/Preview.svelte';

  let value = new Date();
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
  <DatePickerField icon={mdiCalendar} bind:value />
</Preview>

<h2>Label</h2>

<Preview>
  <DatePickerField label="Date of Birth" icon={mdiCalendar} bind:value />
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
