<script lang="ts">
  import { type ComponentProps } from 'svelte';
  import { parse as parseDate, format as formatDate } from 'date-fns';
  import { type DisabledDate } from '../utils/date_types.js';
  import { getComponentSettings, getSettings } from './settings.js';
  import { cls } from '../utils/styles.js';

  import Field from './Field.svelte';

  import Input from './Input.svelte';
  import DatePickerField from './DatePickerField.svelte';

  const { format: format_ux } = getSettings();
  const { classes: settingsClasses, defaults } = getComponentSettings('DateField');

  interface Props {
    name?: string;
    value?: Date | null;
    format?: string;
    mask?: string;
    replace?: string;
    picker?: boolean;
    /**
     * Dates to disable (not selectable)
     */
    disabledDates?: DisabledDate;
    classes?: {
      root?: string;
      field?: ComponentProps<typeof Field>['classes'];
    };
    // Field props
    label?: string;
    labelPlacement?: any;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    base?: boolean;
    rounded?: boolean;
    dense?: boolean;
    icon?: string | null;
    class?: string;
    onChange?: (value?: Date | null) => void;
  }

  let {
    name = '',
    value = $bindable(),
    format,
    mask,
    replace = 'dmyh',
    picker = false,
    disabledDates,
    classes = {},
    label = '',
    labelPlacement = defaults.labelPlacement,
    error = '',
    hint = '',
    required = false,
    disabled = false,
    clearable = false,
    base = false,
    rounded = false,
    dense = false,
    icon,
    class: className,
    onChange,
    ...rest
  }: Props & Omit<ComponentProps<typeof Field>, keyof Props> = $props();

  let inputValue = $state<string>('');

  function onInputChange(_value: string) {
    inputValue = _value;
    const lastValue = value;
    const parsedValue = parseDate(inputValue ?? '', actualFormat, new Date());
    value = isNaN(parsedValue.valueOf()) ? null : parsedValue;
    if (value != lastValue) {
      onChange?.(value);
    }
  }

  let actualFormat = $derived(
    format ?? $format_ux.settings.formats.dates.baseParsing ?? 'MM/dd/yyyy'
  );
  let actualMask = $derived(mask ?? actualFormat.toLowerCase());
  let restProps = $derived({ ...defaults, ...rest });
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
  onClear={() => {
    value = null;
    inputValue = '';
    onChange?.(value);
  }}
  classes={classes.field}
  class={cls('DateField', settingsClasses.root, classes.root, className)}
>
  {#snippet children({ id })}
    <Input
      {required}
      {name}
      value={value ? formatDate(value, actualFormat) : inputValue}
      mask={actualMask}
      {replace}
      {id}
      onChange={onInputChange}
    />
  {/snippet}
  {#snippet append()}
    <span>
      {#if picker}
        <DatePickerField
          iconOnly
          {value}
          {disabledDates}
          onChange={(_value) => {
            value = _value;
            onChange?.(value);
          }}
          class="p-1 text-surface-content/50"
        />
      {/if}
    </span>
  {/snippet}
</Field>
