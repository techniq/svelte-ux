<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { parse as parseDate } from 'date-fns';
  import { PeriodType } from '../utils';
  import { getSettings } from './settings';

  import Field from './Field.svelte';

  import Input from './Input.svelte';
  import DatePickerField from './DatePickerField.svelte';
  import { getComponentClasses } from './theme';

  const { format: format_ux } = getSettings();

  export let value: Date | null = null;
  export let format: string | undefined = undefined;
  export let mask: string | undefined = undefined;
  export let replace = 'dmyh';
  export let picker = false;

  $: actualFormat = format ?? $format_ux.settings.formats.dates.baseParsing ?? 'MM/dd/yyyy';
  $: actualMask = mask ?? actualFormat.toLowerCase();

  // Field props
  export let label = '';
  export let error = '';
  export let hint = '';
  export let disabled = false;
  export let clearable = false;
  export let base = false;
  export let rounded = false;
  export let dense = false;
  export let icon: string | null = null;

  const settingsClasses = getComponentClasses('DateField');

  let inputValue: string | undefined = '';

  const dispatch = createEventDispatcher();

  function onInputChange(e: any) {
    inputValue = e.detail.value;
    const lastValue = value;
    const parsedValue = parseDate(inputValue ?? '', actualFormat, new Date());
    value = isNaN(parsedValue.valueOf()) ? null : parsedValue;
    if (value != lastValue) {
      dispatch('change', { value });
    }
  }
</script>

<Field
  {label}
  {value}
  {icon}
  {error}
  {hint}
  {disabled}
  {base}
  {rounded}
  {dense}
  {clearable}
  on:clear={() => {
    value = null;
    inputValue = undefined;
    dispatch('change', { value });
  }}
  let:id
>
  <Input
    value={value ? $format_ux(value, PeriodType.Day, { custom: actualFormat }) : inputValue}
    mask={actualMask}
    {replace}
    {id}
    on:change={onInputChange}
  />
  <span slot="append">
    {#if picker}
      <DatePickerField
        iconOnly
        {value}
        on:change={(e) => {
          value = e.detail;
          dispatch('change', { value });
        }}
        class="p-1 text-surface-content/50"
      />
    {/if}
  </span>
</Field>
