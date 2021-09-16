<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import clsx from 'clsx';
  import { mdiCalendarRange, mdiChevronLeft, mdiChevronRight } from '@mdi/js';

  import Button from './Button.svelte';
  import DateRange from './DateRange.svelte';
  import DateRangeDisplay from './DateRangeDisplay.svelte';
  import Dialog from './Dialog.svelte';
  import Field from './Field.svelte';

  import { getDateFuncsByPeriodType, getPeriodTypeName } from '../utils/date';
  import type { DateRange as DateRangeType } from '../utils/dateRange';

  const dispatch = createEventDispatcher();

  export let value: DateRangeType = {
    from: null,
    to: null,
    periodType: null,
  };
  export let stepper: boolean = false;
  export let fullWidth: boolean = false;

  // Field props
  export let label: string | null = null;
  // export let value = '';
  export let error = '';
  export let hint = '';
  export let disabled = false;
  // export let clearable = false;
  export let base = false;
  export let rounded = false;
  export let filled = false;
  export let dense = false;
  export let icon: string | null = null;

  let open: boolean = false;
  let format: string = undefined;

  let currentValue = value;
</script>

<Field
  label={label ?? (value.periodType ? getPeriodTypeName(value.periodType) : '')}
  icon={icon ?? mdiCalendarRange}
  {error}
  {hint}
  {disabled}
  {base}
  {rounded}
  {filled}
  {dense}
  let:id
  {...$$restProps}
>
  <span slot="prepend">
    <slot name="prepend" />

    {#if stepper}
      <Button
        icon={mdiChevronLeft}
        class="p-2"
        on:click={() => {
          if (value && value.from && value.to && value.periodType) {
            const { difference, start, end, add } = getDateFuncsByPeriodType(value.periodType);
            const offset = difference(value.from, value.to) - 1;
            value = {
              from: start(add(value.from, offset)),
              to: end(add(value.to, offset)),
              periodType: value.periodType,
            };
            dispatch('change', value);
          }
        }}
      />
    {/if}
  </span>

  <button
    class={clsx('text-sm whitespace-nowrap w-full focus:outline-none', {
      'text-left': fullWidth,
    })}
    on:click={() => (open = true)}
    {id}
  >
    <DateRangeDisplay {value} {format} />
  </button>

  <div slot="append">
    <slot name="append" />

    {#if stepper}
      <Button
        icon={mdiChevronRight}
        class="p-2"
        on:click={() => {
          if (value && value.from && value.to && value.periodType) {
            const { difference, start, end, add } = getDateFuncsByPeriodType(value.periodType);
            const offset = difference(value.to, value.from) + 1;
            value = {
              from: start(add(value.from, offset)),
              to: end(add(value.to, offset)),
              periodType: value.periodType,
            };
            dispatch('change', value);
          }
        }}
      />
    {/if}
  </div>
</Field>

<Dialog bind:open>
  <div class="flex flex-col justify-center bg-accent-500 text-white px-6 h-24">
    <div class="text-sm text-white/50">
      {currentValue.periodType ? getPeriodTypeName(currentValue.periodType) : ''}&nbsp;
    </div>
    <div class="text-3xl text-white">
      <DateRangeDisplay value={currentValue} />
    </div>
  </div>

  <div class="p-2 w-160 bg-gray-100 border-b">
    <DateRange bind:selected={currentValue} />
  </div>

  <div slot="actions">
    <Button
      on:click={() => {
        open = false;
        value = currentValue;
        dispatch('change', value);
      }}
      class="text-blue-500 hover:bg-blue-500">OK</Button
    >
    <Button
      on:click={() => {
        open = false;
        currentValue = value;
      }}>Cancel</Button
    >
  </div>
</Dialog>
