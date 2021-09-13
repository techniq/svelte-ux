<script lang="ts">
  import Preview from '$lib/components/Preview.svelte';
  import DatePickerField from '$lib/components/DatePickerField.svelte';

  import { PeriodType } from '$lib/utils/date';

  let value = new Date();
</script>

## Default

<Preview>
  <DatePickerField />
</Preview>

## Controlled

<Preview>
  <DatePickerField bind:value />
</Preview>

## Stepper w/ default (day)

<Preview>
  <DatePickerField bind:value stepper />
</Preview>

## Stepper w/ month

<Preview>
  <DatePickerField periodType={PeriodType.Month} bind:value stepper />
</Preview>

## Stepper w/ rounded & filled

<Preview>
  <DatePickerField bind:value stepper rounded filled />
</Preview>

## Stepper w/ rounded & filled & center

<Preview>
  <DatePickerField bind:value stepper rounded filled center />
</Preview>

## Icon only

<Preview>
  <DatePickerField iconOnly />
</Preview>
