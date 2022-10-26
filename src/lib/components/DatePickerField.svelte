<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiCalendar, mdiCheck, mdiChevronLeft, mdiChevronRight, mdiClose } from '@mdi/js';

  import Button from './Button.svelte';
  import Field from './Field.svelte';
  import Dialog from './Dialog.svelte';
  import { getDateFuncsByPeriodType, PeriodType } from '../utils/date';
  import DateSelect from './DateSelect.svelte';
  import { dateDisplay } from '../utils/dateDisplay';

  const dispatch = createEventDispatcher();

  export let value: Date | null = null;
  export let periodType: PeriodType = PeriodType.Day;
  export let iconOnly: boolean = false;
  export let stepper: boolean = false;

  // Field props
  export let label: string | null = null;
  // export let value = '';
  export let error = '';
  export let hint = '';
  export let disabled = false;
  export let clearable = false;
  export let base = false;
  export let rounded = false;
  export let filled = false;
  export let dense = false;
  export let icon: string | null = null;
  export let center = false;

  let open: boolean = false;

  // let format: string = 'EEE, MMM d';
  // Show "Day of Week", "Year", etc based on perioType (see DayStepper, MonthStepper)
  let primaryFormat = '';
  let secondaryFormat = '';

  $: switch (periodType) {
    case PeriodType.Month:
      primaryFormat = 'MMMM';
      secondaryFormat = 'yyyy';
      break;
    case PeriodType.Day:
    default:
      primaryFormat = 'MMMM do, yyyy';
      secondaryFormat = 'eeee';
  }

  $: currentValue = value;
</script>

{#if iconOnly}
  <Button icon={mdiCalendar} on:click={() => (open = true)} {...$$restProps} />
{:else}
  <Field
    label={label ?? dateDisplay(value, { format: secondaryFormat })}
    {icon}
    {error}
    {hint}
    {disabled}
    {base}
    {rounded}
    {filled}
    {dense}
    {center}
    let:id
  >
    <span slot="prepend">
      {#if stepper}
        <Button
          icon={mdiChevronLeft}
          class="p-2"
          on:click={() => {
            if (value && periodType) {
              const { add } = getDateFuncsByPeriodType(periodType);
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
      {dateDisplay(value, { format: primaryFormat })}
    </button>

    <div slot="append">
      {#if clearable && value}
        <Button
          icon={mdiClose}
          class="text-black/50 p-1"
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
              const { add } = getDateFuncsByPeriodType(periodType);
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
  <div class="flex flex-col justify-center bg-accent-500 text-white px-6 h-24">
    <div class="text-sm text-white/50">
      {dateDisplay(currentValue, { format: secondaryFormat })}
    </div>
    <div class="text-3xl text-white">
      {dateDisplay(currentValue, { format: primaryFormat })}
    </div>
  </div>

  <div class="p-2 w-96">
    <DateSelect
      bind:selected={currentValue}
      {periodType}
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
      class="bg-blue-500 text-white hover:bg-blue-600">OK</Button
    >
    <Button
      on:click={() => {
        open = false;
        currentValue = value;
      }}>Cancel</Button
    >
  </div>
</Dialog>
