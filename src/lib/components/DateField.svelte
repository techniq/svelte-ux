<script lang="ts">
  /*
    TODO:
      - [ ] Controlled
      - [ ] Clearable
      - [ ] Date picker button
      - [ ] Clear value on blur if incomplete
      - [ ] on:change only if value changes (and only parsed value.
        - Maybe `dispatch('change', { value })` to allow other values (raw/string) to be returned as well
      - [ ] on:blur null/clear if invalid...?
  */

  import { createEventDispatcher } from 'svelte';
  import { parse as parseDate, format as formatDate } from 'date-fns';
  import { mdiClose } from '@mdi/js';

  import Button from './Button.svelte';
  import Field from './Field.svelte';

  import Input from './Input.svelte';
  import DatePickerField from './DatePickerField.svelte';

  export let value: Date = null;
  export let format = 'MM/dd/yyyy';
  export let mask = format.toLowerCase();
  export let replace = 'dmyh';

  // Field props
  export let label = '';
  export let error = '';
  export let hint = '';
  export let disabled = false;
  export let clearable = false;
  export let base = false;
  export let rounded = false;
  export let filled = false;
  export let dense = false;
  export let icon: string | null = null;

  const dispatch = createEventDispatcher();

  function onInputChange(e) {
    console.log('onInputChange', e.detail);

    const parsedValue = parseDate(e.detail.value, format, new Date());
    if (isNaN(parsedValue)) {
      value = null;
      dispatch('change', { value });
    } else {
      value = parsedValue;
      dispatch('change', { value });
    }
  }

  $: formatted = value ? formatDate(value, format) : undefined;

  // $: dispatch('change', { value });
</script>

<Field {label} {icon} {error} {hint} {disabled} {base} {rounded} {filled} {dense} let:id>
  <Input value={formatted} {mask} {replace} {id} on:change={onInputChange} />

  <span slot="append">
    {#if clearable && value}
      <Button
        icon={mdiClose}
        class="text-black/50 p-1"
        on:click={() => {
          value = null;
          dispatch('clear');
          dispatch('change', { value });
        }}
      />
    {/if}

    <DatePickerField
      iconOnly
      on:change={(e) => {
        value = e.detail;
        dispatch('change', { value });
      }}
      class="p-1"
    />
  </span>
</Field>
