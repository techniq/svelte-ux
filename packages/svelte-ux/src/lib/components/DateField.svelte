<script lang="ts">
  import { createEventDispatcher, type ComponentProps } from 'svelte';
  import { parse as parseDate, format as formatDate } from 'date-fns';
  import { type DisabledDate } from '../utils/date_types.js';
  import { getComponentSettings, getSettings } from './settings.js';
  import { cls } from '@layerstack/tailwind';

  import Field from './Field.svelte';

  import Input from './Input.svelte';
  import DatePickerField from './DatePickerField.svelte';

  const { format: format_ux } = getSettings();
  const { classes: settingsClasses, defaults } = getComponentSettings('DateField');

  export let name = '';
  export let value: Date | null = null;
  export let format: string | undefined = undefined;
  export let mask: string | undefined = undefined;
  export let replace = 'dmyh';
  export let picker = false;

  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  $: actualFormat = format ?? $format_ux.settings.formats.dates.baseParsing ?? 'MM/dd/yyyy';
  $: actualMask = mask ?? actualFormat.toLowerCase();

  export let classes: {
    root?: string;
    field?: ComponentProps<Field>['classes'];
  } = {};

  // Field props
  export let label = '';
  export let labelPlacement = defaults.labelPlacement;
  export let error = '';
  export let hint = '';
  export let required = false;
  export let disabled = false;
  export let clearable = false;
  export let base = false;
  export let rounded = false;
  export let dense = false;
  export let icon: string | null = null;

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

  $: restProps = { ...defaults, ...$$restProps };
</script>

<Field
  {...restProps}
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
  {labelPlacement}
  on:clear={() => {
    value = null;
    inputValue = '';
    dispatch('change', { value });
  }}
  classes={classes.field}
  class={cls('DateField', settingsClasses.root, classes.root, $$props.class)}
  let:id
>
  <Input
    {required}
    {name}
    value={value ? formatDate(value, actualFormat) : inputValue}
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
        {disabledDates}
        on:change={(e) => {
          value = e.detail;
          dispatch('change', { value });
        }}
        class="p-1 text-surface-content/50"
      />
    {/if}
  </span>
</Field>
