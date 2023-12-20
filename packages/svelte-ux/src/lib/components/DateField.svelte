<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { parse as parseDate, format as formatDate } from 'date-fns';

  import Field from './Field.svelte';

  import Input from './Input.svelte';
  import DatePickerField from './DatePickerField.svelte';
  import { getComponentTheme } from './theme';

  export let value: Date = null;
  export let format = 'MM/dd/yyyy';
  export let mask = format.toLowerCase();
  export let replace = 'dmyh';
  export let picker = false;

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

  const theme = getComponentTheme('DateField');

  let inputValue = '';

  const dispatch = createEventDispatcher();

  function onInputChange(e) {
    inputValue = e.detail.value;
    const lastValue = value;
    const parsedValue = parseDate(inputValue, format, new Date());
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
    inputValue = null;
    dispatch('change', { value });
  }}
  let:id
>
  <Input
    value={value ? formatDate(value, format) : inputValue}
    {mask}
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
