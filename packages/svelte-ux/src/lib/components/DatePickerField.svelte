<script lang="ts">
  import { slide } from 'svelte/transition';
  import { mdiCalendar, mdiCheck, mdiChevronLeft, mdiChevronRight, mdiClose } from '@mdi/js';

  import Button from './Button.svelte';
  import Field from './Field.svelte';
  import Dialog from './Dialog.svelte';
  import {
    DateToken,
    getDateFuncsByPeriodType,
    PeriodType,
    type DisabledDate,
  } from '../utils/date.js';
  import DateSelect from './DateSelect.svelte';
  import { getComponentSettings, getSettings } from './settings.js';
  import type { ComponentProps } from 'svelte';
  import type { LabelPlacement } from '$lib/types/index.js';

  const { defaults } = getComponentSettings('DatePickerField');

  interface Props {
    name?: string;
    value?: Date | null;
    periodType?: PeriodType;
    iconOnly?: boolean;
    stepper?: boolean;
    // Field props
    label?: string | null;
    labelPlacement?: LabelPlacement;
    error?: string;
    hint?: string;
    disabled?: boolean;
    clearable?: boolean;
    base?: boolean;
    rounded?: boolean;
    dense?: boolean;
    icon?: string | null;
    center?: boolean;
    /**
     * Dates to disable (not selectable)
     */
    disabledDates?: DisabledDate;
    onChange?: (value?: Date | null) => void;
    onClear?: () => void;
  }

  let {
    name = '',
    value = $bindable(),
    periodType = PeriodType.Day,
    iconOnly = false,
    stepper = false,
    label,
    labelPlacement = defaults.labelPlacement,
    error = '',
    hint = '',
    disabled = false,
    clearable = false,
    base = false,
    rounded = false,
    dense = false,
    icon,
    center = false,
    disabledDates,
    onChange,
    onClear,
    ...restProps
  }: Props & Omit<ComponentProps<typeof Button>, keyof Props> = $props();

  const { format, localeSettings } = getSettings();
  let dictionary = $derived($format.settings.dictionary);

  let open: boolean = $state(false);

  // let format: string = 'EEE, MMM d';
  // Show "Day of Week", "Year", etc based on perioType (see DayStepper, MonthStepper)
  let primaryFormat: string | string[] = $state('');
  let secondaryFormat: string | string[] = $state('');

  $effect(() => {
    switch (periodType) {
      case PeriodType.Month:
        primaryFormat = DateToken.Month_long;
        secondaryFormat = DateToken.Year_numeric;
        break;
      case PeriodType.Day:
      default:
        primaryFormat = [
          DateToken.Month_long,
          DateToken.DayOfMonth_withOrdinal,
          DateToken.Year_numeric,
        ];

        secondaryFormat = DateToken.DayOfWeek_long;
    }
  });

  let currentValue = $state<Date | null>();
  $effect(() => {
    currentValue = value;
  });
</script>

{#if iconOnly}
  <Button icon={mdiCalendar} onclick={() => (open = true)} {...restProps} />
{:else}
  <Field
    label={label ?? $format(value, PeriodType.Day, { custom: secondaryFormat })}
    {labelPlacement}
    {icon}
    {error}
    {hint}
    {disabled}
    {base}
    {rounded}
    {dense}
    {center}
  >
    {#snippet prepend()}
      <span>
        <input type="hidden" {name} {value} />

        {#if stepper}
          <Button
            icon={mdiChevronLeft}
            class="p-2"
            onclick={() => {
              if (value && periodType) {
                const { add } = getDateFuncsByPeriodType($localeSettings, periodType);
                value = add(value, -1);
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
        class="text-sm min-h-[1.25rem] whitespace-nowrap w-full focus:outline-none"
        style="text-align: inherit"
        onclick={() => (open = true)}
        {id}
      >
        {$format(value, PeriodType.Day, { custom: primaryFormat })}
      </button>
    {/snippet}
    {#snippet append()}
      <div>
        {#if clearable && value}
          <Button
            icon={mdiClose}
            class="text-surface-content/50 p-1"
            onclick={() => {
              value = null;
              onClear?.();
              onChange?.(value);
            }}
          />
        {/if}

        {#if stepper}
          <Button
            icon={mdiChevronRight}
            class="p-2"
            onclick={() => {
              if (value && periodType) {
                const { add } = getDateFuncsByPeriodType($localeSettings, periodType);
                value = add(value, 1);
                onChange?.(value);
              }
            }}
          />
        {/if}
      </div>
    {/snippet}
  </Field>
{/if}

<Dialog bind:open>
  {#if currentValue}
    <div
      class="flex flex-col justify-center bg-primary text-primary-content px-6 h-24"
      transition:slide
    >
      <div class="text-sm opacity-50">
        {$format(currentValue, PeriodType.Day, { custom: secondaryFormat })}
      </div>
      <div class="text-3xl">
        {$format(currentValue, PeriodType.Day, { custom: primaryFormat })}
      </div>
    </div>
  {/if}

  <div class="p-2 w-96">
    <DateSelect
      bind:selected={currentValue}
      {periodType}
      {disabledDates}
      on:dateChange={(e) => (currentValue = e.detail)}
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
        variant="fill"
        color="primary">{dictionary.Ok}</Button
      >
      <Button
        onclick={() => {
          open = false;
          currentValue = value;
        }}>{dictionary.Cancel}</Button
      >
    </div>
  {/snippet}
</Dialog>
