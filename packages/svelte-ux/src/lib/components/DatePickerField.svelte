<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { mdiCalendar, mdiCheck, mdiChevronLeft, mdiChevronRight, mdiClose } from '@mdi/js';
  import {
    DateToken,
    getDateFuncsByPeriodType,
    PeriodType,
    type DisabledDate,
  } from '@layerstack/utils';

  import Button from './Button.svelte';
  import Field from './Field.svelte';
  import Dialog from './Dialog.svelte';
  import DateSelect from './DateSelect.svelte';
  import { getComponentSettings, getSettings } from './settings.js';

  const dispatch = createEventDispatcher();
  const { classes: settingsClasses, defaults } = getComponentSettings('DatePickerField');

  export let name = '';
  export let value: Date | null = null;
  export let periodType: PeriodType = PeriodType.Day;
  export let iconOnly: boolean = false;
  export let stepper: boolean = false;

  // Field props
  export let label: string | null = null;
  export let labelPlacement = defaults.labelPlacement;
  // export let value = '';
  export let error = '';
  export let hint = '';
  export let disabled = false;
  export let clearable = false;
  export let base = false;
  export let rounded = false;
  export let dense = false;
  export let icon: string | null = null;
  export let center = false;

  /**
   * Dates to disable (not selectable)
   */
  export let disabledDates: DisabledDate | undefined = undefined;

  const { format, localeSettings } = getSettings();
  $: dictionary = $format.settings.dictionary;

  let open: boolean = false;

  // let format: string = 'EEE, MMM d';
  // Show "Day of Week", "Year", etc based on perioType (see DayStepper, MonthStepper)
  let primaryFormat: string | string[] = '';
  let secondaryFormat: string | string[] = '';

  $: switch (periodType) {
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

  $: currentValue = value;
</script>

{#if iconOnly}
  <Button icon={mdiCalendar} on:click={() => (open = true)} {...$$restProps} />
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
    let:id
  >
    <span slot="prepend">
      <input type="hidden" {name} {value} />

      {#if stepper}
        <Button
          icon={mdiChevronLeft}
          class="p-2"
          on:click={() => {
            if (value && periodType) {
              const { add } = getDateFuncsByPeriodType($localeSettings, periodType);
              value = add(value, -1);
              dispatch('change', value);
            }
          }}
        />
      {/if}
    </span>

    <button
      type="button"
      class="text-sm min-h-[1.25rem] whitespace-nowrap w-full focus:outline-none"
      style="text-align: inherit"
      on:click={() => (open = true)}
      {id}
    >
      {$format(value, PeriodType.Day, { custom: primaryFormat })}
    </button>

    <div slot="append">
      {#if clearable && value}
        <Button
          icon={mdiClose}
          class="text-surface-content/50 p-1"
          on:click={() => {
            value = null;
            dispatch('clear');
            dispatch('change', value);
          }}
        />
      {/if}

      {#if stepper}
        <Button
          icon={mdiChevronRight}
          class="p-2"
          on:click={() => {
            if (value && periodType) {
              const { add } = getDateFuncsByPeriodType($localeSettings, periodType);
              value = add(value, 1);
              dispatch('change', value);
            }
          }}
        />
      {/if}
    </div>
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

  <div slot="actions" class="flex items-center gap-2">
    <Button
      icon={mdiCheck}
      on:click={() => {
        open = false;
        value = currentValue;
        dispatch('change', value);
      }}
      variant="fill"
      color="primary">{dictionary.Ok}</Button
    >
    <Button
      on:click={() => {
        open = false;
        currentValue = value;
      }}>{dictionary.Cancel}</Button
    >
  </div>
</Dialog>
