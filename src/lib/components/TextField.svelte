<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import clsx from 'clsx';
  import { mdiClose, mdiCurrencyUsd, mdiInformationOutline, mdiPercent } from '@mdi/js';
  import { uniqueId } from 'lodash-es';

  import cssVars from '../actions/cssVars';
  import multi from '../actions/multi';
  import type { Actions } from '../actions/multi';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import { isLiteralObject } from '../utils/object';
  import { autoFocus } from '$lib/actions';

  type InputValue = string | number;

  const dispatch = createEventDispatcher<{
    clear: null;
    change: { value: typeof value; inputValue: InputValue; operator: string };
  }>();

  export let label = '';
  export let value: InputValue | { [operator: string]: InputValue } = ''; // TODO: Can also include operator: { "operator": "value" }
  export let type: 'text' | 'password' | 'integer' | 'decimal' | 'currency' | 'percent' = 'text';
  export let placeholder = '';
  export let error = '';
  export let hint = '';
  export let autocomplete = 'off'; // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  export let multiline = false;
  export let disabled = false;
  export let clearable = false;
  export let base = false;
  export let rounded = false;
  export let filled = false;
  export let dense = false;
  export let icon: string | null = null;
  export let align: 'left' | 'center' | 'right' = 'left';
  export let shrinkLabel = false;
  export let autofocus = false;
  // TODO: Find way to conditionally set type based on `multiline` value
  export let actions: Actions<HTMLInputElement | HTMLTextAreaElement> = autofocus
    ? (node) => [autoFocus(node)]
    : undefined;
  export let operators: { label: string; value: string }[] = undefined;
  export let inputEl: HTMLInputElement | null = null;

  let inputType = 'text';
  $: switch (type) {
    case 'integer':
    case 'decimal':
    case 'currency':
    case 'percent':
      inputType = 'number';
      break;
    case 'password':
      inputType = 'password';
      break;
    case 'text':
    default:
      inputType = 'text';
  }

  $: inputValue = isLiteralObject(value) ? Object.values(value)[0] : value ?? null;
  $: operator = isLiteralObject(value) ? Object.keys(value)[0] : operators?.[0].value;

  function updateValue() {
    let newValue;
    if (inputValue && operator) {
      // Add with operator if used
      newValue = { [operator]: inputValue };
    } else {
      newValue = inputValue === '' ? null : inputValue;
    }

    value = newValue;
    dispatch('change', { value, inputValue, operator });
  }

  function handleInput(e) {
    inputValue = inputType === 'number' ? Number(e.target.value) : e.target.value;
    updateValue();
  }

  $: hasInputValue = inputValue != null && inputValue !== '';
  $: hasLabel = label !== '';

  $: hasPrepend = $$slots.prepend || icon != null;
  $: hasAppend = $$slots.append || clearable || error || operators;
  $: hasPrefix = $$slots.prefix || type === 'currency';
  $: hasSuffix = $$slots.suffix || type === 'percent';

  const id = uniqueId('field_');
  let labelEl: HTMLLabelElement | null = null;
</script>

<fieldset
  {disabled}
  use:cssVars={{
    color: error
      ? 'var(--color-red-500)'
      : filled
      ? 'var(--color-gray-600)'
      : 'var(--color-blue-500)',
  }}
  class={clsx(
    'group',
    disabled && 'opacity-50',
    !base && (rounded ? 'rounded-full' : 'rounded'),
    $$props.class
  )}
>
  <div
    class={clsx(
      'border py-0 transition-shadow',
      disabled ? '' : 'hover:shadow',
      disabled ? '' : error ? 'hover:border-red-700' : 'hover:border-gray-700',
      {
        'px-2': !rounded,
        'px-6': rounded && !hasPrepend, // TODO: `hasPrepend` always true for SelectField, etc.  See: https://github.com/sveltejs/svelte/issues/6059
      },
      !base && [rounded ? 'rounded-full' : 'rounded', filled ? 'bg-black/10' : 'bg-white'],
      error ? 'border-red-500' : 'border-black/20',
      'group-focus-within:shadow-md group-focus-within:border-color-var'
    )}
  >
    <div class="flex items-center">
      {#if hasPrepend}
        <div class={clsx('prepend whitespace-nowrap', rounded && 'pl-3')}>
          <slot name="prepend" />
          {#if icon}
            <span class="mr-3">
              <Icon path={icon} class="text-black/50" />
            </span>
          {/if}
        </div>
      {/if}

      <div class="flex-grow inline-grid" on:click>
        {#if label}
          <label
            class={clsx(
              'col-span-full row-span-full z-[1] flex items-center h-full truncate origin-top-left transition-all duration-200 group-hover:text-gray-700 group-focus-within:text-color-var group-hover:group-focus-within:text-color-var cursor-pointer',
              error ? 'text-red-500/80' : 'text-black/50',
              (shrinkLabel || hasInputValue) && 'shrink'
            )}
            for={id}
            bind:this={labelEl}
          >
            {label}
          </label>
        {/if}

        <div
          class={clsx(
            'col-span-full row-span-full input flex items-center',
            hasLabel && 'pt-4',
            dense ? 'my-1' : 'my-2',
            (hasPrefix || hasSuffix) &&
              label &&
              !shrinkLabel &&
              !hasInputValue &&
              'opacity-0 transition-opacity',
            'group-focus-within:opacity-100'
          )}
        >
          <slot name="prefix" />

          {#if type === 'currency'}
            <Icon path={mdiCurrencyUsd} size="1.1em" class="text-black/50 -mt-1" />
          {/if}

          {#if multiline}
            <textarea
              {id}
              {placeholder}
              {autocomplete}
              value={inputValue}
              on:input={handleInput}
              on:focus
              on:blur
              on:keydown
              on:keypress
              class={clsx(
                'text-sm placeholder-black placeholder-opacity-0 group-focus-within:placeholder-opacity-30 resize-none',
                (shrinkLabel || !hasLabel) && 'placeholder-opacity-30',
                {
                  'text-left': align === 'left',
                  'text-center': align === 'center',
                  'text-right': align === 'right',
                }
              )}
              use:multi={actions}
            />
          {:else}
            <input
              {id}
              {placeholder}
              {autocomplete}
              type={inputType}
              bind:this={inputEl}
              value={inputValue}
              on:input={handleInput}
              on:focus
              on:blur
              on:keydown
              on:keypress
              class={clsx(
                'text-sm truncate placeholder-black placeholder-opacity-0 group-focus-within:placeholder-opacity-30 selection:bg-gray-500/30',
                (shrinkLabel || !hasLabel) && 'placeholder-opacity-30',
                {
                  'text-left': align === 'left',
                  'text-center': align === 'center',
                  'text-right': align === 'right',
                }
              )}
              use:multi={actions}
            />
          {/if}

          {#if type === 'percent'}
            <Icon path={mdiPercent} size="1.1em" class="text-black/50 -mt-1 ml-1" />
          {/if}

          <slot name="suffix" />
        </div>
      </div>

      {#if hasAppend}
        <div class="append whitespace-nowrap">
          {#if clearable && hasInputValue}
            <Button
              icon={mdiClose}
              class="text-black/50 p-1"
              on:click={() => {
                inputValue = '';
                operator = operators ? operators[0].value : null;
                updateValue();
                dispatch('clear');
                labelEl?.focus();
              }}
            />
          {/if}

          {#if operators}
            <!-- svelte-ignore a11y-no-onchange -->
            <select
              value={operator}
              on:change={(e) => {
                operator = e.target.value;
                updateValue();
              }}
              class="appearance-none bg-black/5 border border-black/20 rounded-full mr-2 px-2 text-sm outline-none focus:border-opacity-50 focus:shadow-md"
              style="text-align-last: center;"
            >
              {#each operators ?? [] as { label, value }}
                <option {value}>{label}</option>
              {/each}
            </select>
          {/if}

          <slot name="append" />

          {#if error}
            <Icon path={mdiInformationOutline} class="text-red-500" />
          {/if}
        </div>
      {/if}
    </div>
  </div>
  <div
    class={clsx(
      'hint',
      'text-xs ml-2 transition-transform ease-out overflow-hidden origin-top transform group-focus-within:scale-y-100',
      error ? 'text-red-500' : 'text-black/50 scale-y-0'
    )}
  >
    {error || hint}
  </div>
</fieldset>

<style lang="postcss">
  label {
    /* border: 1px solid rgba(255, 0, 0, 0.5); */
    width: 100%;
  }
  fieldset:focus-within label,
  label.shrink {
    transform: scale(0.75);
    width: 133%; /* offset 75% scale */
    height: 32px;
  }

  .prepend {
    /* background: rgba(0, 255, 0, 0.1); */
  }

  .append {
    /* background: rgba(0, 255, 0, 0.1); */
  }

  :global([slot='prefix']) {
    /* background: rgba(0, 255, 0, 0.1); */
  }

  :global([slot='suffix']) {
    /* background: rgba(0, 255, 0, 0.1); */
  }

  input,
  textarea {
    @apply border-none w-full bg-transparent outline-none /*leading-4*/;
    /* background: rgba(0, 0, 255, 0.1); */
  }

  input::placeholder,
  textarea::placeholder {
    transition: color 200ms; /* Move to tailwind plugin? */
  }

  /* Hide +/- buttons */
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
</style>
