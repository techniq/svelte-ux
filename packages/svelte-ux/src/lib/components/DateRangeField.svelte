<script lang="ts">
  import { type ComponentProps, type Snippet } from 'svelte';
  import { mdiCheck, mdiChevronLeft, mdiChevronRight, mdiClose } from '@mdi/js';

  import Button from './Button.svelte';
  import DateRange from './DateRange.svelte';
  import DateRangeDisplay from './DateRangeDisplay.svelte';
  import Dialog from './Dialog.svelte';
  import Field from './Field.svelte';

  import { PeriodType, getDateFuncsByPeriodType, type DisabledDate } from '../utils/date.js';
  import { getDateRangePresets, type DateRange as DateRangeType } from '../utils/dateRange.js';
  import { cls } from '../utils/styles.js';
  import { getComponentSettings, getSettings } from './settings.js';

  const { format, localeSettings } = getSettings();
  const { defaults } = getComponentSettings('DateRangeField');

  const _defaultValue: DateRangeType = {
    from: null,
    to: null,
    periodType: null,
  };

  interface Props {
    value?: DateRangeType;
    stepper?: boolean;
    center?: boolean;
    periodTypes?: PeriodType[];
    getPeriodTypePresets?: typeof getDateRangePresets;
    /**
     * Dates to disable (not selectable)
     */
    disabledDates?: DisabledDate;
    classes?: {
      field?: ComponentProps<typeof Field>['classes'];
      dialog?: ComponentProps<typeof Dialog>['classes'];
    };
    // Field props
    label?: string | null;
    error?: string;
    hint?: string;
    disabled?: boolean;
    clearable?: boolean;
    base?: boolean;
    rounded?: boolean;
    dense?: boolean;
    icon?: string | null;
    onChange?: (value?: DateRangeType) => void;
    onClear?: () => void;
    prepend?: Snippet;
    append?: Snippet;
  }

  let {
    value = $bindable(_defaultValue),
    stepper = false,
    center = false,
    periodTypes = [
      PeriodType.Day,
      PeriodType.Week,
      PeriodType.BiWeek1,
      // PeriodType.BiWeek2,
      PeriodType.Month,
      PeriodType.Quarter,
      PeriodType.CalendarYear,
      PeriodType.FiscalYearOctober,
    ],
    getPeriodTypePresets = getDateRangePresets,
    disabledDates,
    classes = {},
    label,
    error = '',
    hint = '',
    disabled = false,
    clearable = false,
    base = false,
    rounded = false,
    dense = false,
    icon,
    onChange,
    onClear,
    prepend: prependRender,
    append: appendRender,
    ...rest
  }: Props & Omit<ComponentProps<typeof Field>, keyof Props> = $props();

  let open: boolean = $state(false);

  let currentValue = $state(value);

  let restProps = $derived({ ...defaults, ...rest });
</script>

<Field
  label={label ?? (value.periodType ? $format.getPeriodTypeName(value.periodType) : '')}
  {icon}
  {error}
  {hint}
  {disabled}
  {base}
  {rounded}
  {dense}
  {center}
  classes={classes.field}
  {...restProps}
>
  {#snippet prepend()}
    <span class="flex items-center">
      {@render prependRender?.()}

      {#if stepper}
        <Button
          icon={mdiChevronLeft}
          class="p-2"
          onclick={() => {
            if (value && value.from && value.to && value.periodType) {
              const { difference, start, end, add } = getDateFuncsByPeriodType(
                $localeSettings,
                value.periodType
              );
              const offset = difference(value.from, value.to) - 1;
              value = {
                from: start(add(value.from, offset)),
                to: end(add(value.to, offset)),
                periodType: value.periodType,
              };
              onChange?.(value);
            }
          }}
        />
      {/if}
    </span>
  {/snippet}

  {#snippet children({ id })}
    <button
      type="button"
      class={cls(
        'text-sm whitespace-nowrap w-full focus:outline-none',
        center ? 'text-center' : 'text-left'
      )}
      onclick={() => (open = true)}
      {id}
    >
      <DateRangeDisplay {value} />
    </button>
  {/snippet}
  {#snippet append()}
    <div class="flex items-center">
      {#if clearable && (value?.periodType || value?.from || value?.to)}
        <Button
          icon={mdiClose}
          class="text-surface-content/50 p-1"
          onclick={() => {
            value = _defaultValue;
            onClear?.();
            onChange?.(value);
          }}
        />
      {/if}

      {@render appendRender?.()}

      {#if stepper}
        <Button
          icon={mdiChevronRight}
          class="p-2"
          onclick={() => {
            if (value && value.from && value.to && value.periodType) {
              const { difference, start, end, add } = getDateFuncsByPeriodType(
                $localeSettings,
                value.periodType
              );
              const offset = difference(value.to, value.from) + 1;
              value = {
                from: start(add(value.from, offset)),
                to: end(add(value.to, offset)),
                periodType: value.periodType,
              };
              onChange?.(value);
            }
          }}
        />
      {/if}
    </div>
  {/snippet}
</Field>

<Dialog
  classes={{
    ...classes.dialog,
    dialog: cls('max-h-[90vh] grid grid-rows-[auto,1fr,auto]', classes.dialog?.dialog),
  }}
  bind:open
>
  <div class="flex flex-col justify-center bg-primary text-primary-content px-6 h-24">
    <div class="text-sm opacity-50">
      {currentValue.periodType ? $format.getPeriodTypeName(currentValue.periodType) : ''}&nbsp;
    </div>
    <div class="text-xl sm:text-2xl">
      <DateRangeDisplay value={currentValue} />
    </div>
  </div>

  <div class="p-2 border-b overflow-auto">
    <DateRange
      bind:selected={currentValue}
      {periodTypes}
      {getPeriodTypePresets}
      {disabledDates}
      class="h-full"
    />
  </div>

  {#snippet actions()}
    <div class="flex items-center gap-2">
      <Button
        icon={mdiCheck}
        onclick={() => {
          open = false;
          value = currentValue;
          onChange?.(value);
        }}
        color="primary"
        variant="fill"
      >
        {$localeSettings.dictionary.Ok}
      </Button>

      <Button
        onclick={() => {
          open = false;
          currentValue = value;
        }}
      >
        {$localeSettings.dictionary.Cancel}
      </Button>
    </div>
  {/snippet}
</Dialog>
