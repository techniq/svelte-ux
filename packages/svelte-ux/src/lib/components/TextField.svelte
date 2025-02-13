<script lang="ts">
  import { createEventDispatcher, type ComponentProps } from 'svelte';
  import type { AriaRole, HTMLInputAttributes } from 'svelte/elements';
  import { mdiClose, mdiCurrencyUsd, mdiEye, mdiInformationOutline, mdiPercent } from '@mdi/js';
  import { uniqueId } from 'lodash-es';
  import { cls } from '@layerstack/tailwind';
  import { isLiteralObject } from '@layerstack/utils/object';
  import { autoFocus, multi, type Actions } from '@layerstack/svelte-actions';

  import { DEFAULT_LABEL_PLACEMENT, type LabelPlacement } from '../types/index.js';
  import { getComponentSettings } from './settings.js';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import Input from './Input.svelte';
  import { type IconInput, asIconData } from '../utils/icons.js';

  type InputValue = string | number;

  const dispatch = createEventDispatcher<{
    clear: null;
    change: { value: typeof value; inputValue: InputValue | null; operator?: string };
  }>();

  const { classes: settingsClasses, defaults } = getComponentSettings('TextField');
  const { defaults: fieldDefaults } = getComponentSettings('Field');

  export let name: string | undefined = undefined;
  export let label = '';
  export let labelPlacement: LabelPlacement =
    defaults.labelPlacement ?? fieldDefaults.labelPlacement ?? DEFAULT_LABEL_PLACEMENT;
  export let value: InputValue | { [operator: string]: InputValue | null } | null = ''; // TODO: Can also include operator: { "operator": "value" }
  export let type:
    | 'text'
    | 'password'
    | 'integer'
    | 'decimal'
    | 'currency'
    | 'percent'
    | 'search'
    | 'email' = 'text';
  export let placeholder: string | undefined = undefined;
  export let error: string | string[] | boolean | undefined = '';
  export let hint = '';
  export let autocomplete: HTMLTextAreaElement['autocomplete'] = 'off'; // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  export let multiline = false;
  export let required = false;
  export let disabled = false;
  export let clearable = false;
  export let base = false;
  export let rounded = false;
  export let dense = false;
  export let icon: IconInput = null;
  export let iconRight: IconInput = null;
  export let align: 'left' | 'center' | 'right' = 'left';
  export let autofocus: boolean | Parameters<typeof autoFocus>[1] = false;
  // TODO: Find way to conditionally set type based on `multiline` value
  export let actions: Actions<HTMLInputElement | HTMLTextAreaElement> | undefined = autofocus
    ? (node) => [autoFocus(node, typeof autofocus === 'object' ? autofocus : undefined)]
    : undefined;
  export let operators: { label: string; value: string }[] | undefined = undefined;
  export let inputEl: HTMLInputElement | HTMLTextAreaElement | null = null;
  export let debounceChange: boolean | number = false;
  export let classes: {
    root?: string;
    container?: string;
    label?: string;
    input?: string;
    error?: string;
    prepend?: string;
    append?: string;
  } = {};

  // Input props
  export let mask: string | undefined = undefined;
  export let replace: string | undefined = undefined;
  export let accept: string | RegExp | undefined = undefined;
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize
  export let autocapitalize: ComponentProps<Input>['autocapitalize'] = undefined;
  export let role: AriaRole | undefined = undefined;

  /**
   * see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
   */
  export let min: number | undefined = undefined;
  /**
   * see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
   */
  export let max: number | undefined = undefined;
  /**
   * see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
   */
  export let step: number | undefined = type === 'decimal' ? 0.1 : 1;

  let inputType = 'text';
  $: switch (type) {
    case 'integer':
    case 'decimal':
    case 'currency':
    case 'percent':
      // TODO: typing '.' on iOS appears to clear input when using type="number"
      inputType = 'number';
      break;
    case 'password':
      inputType = 'password';
      break;
    case 'email':
      inputType = 'email';
      break;
    case 'search':
      inputType = 'search';
      break;
    case 'text':
    default:
      inputType = 'text';
  }
  let inputMode: HTMLInputAttributes['inputmode'] = undefined;
  $: switch (type) {
    case 'integer':
      inputMode = 'numeric';
      break;
    case 'decimal':
    case 'currency':
    case 'percent':
      inputMode = 'decimal';
      break;
    case 'email':
      inputMode = 'email';
      break;
    case 'search':
      inputMode = 'search';
      break;
    case 'text':
    case 'password':
    default:
      inputMode = 'text';
  }

  let inputValue: InputValue | null = value == null ? '' : String(value);
  $: potentialInputValue = isLiteralObject(value) ? Object.values(value)[0] : (value ?? null);
  $: if (inputType !== 'number' || inputValue != potentialInputValue) {
    // Update the inputValue, but when the input type is number only do it if the values are actually different.
    // This avoids the cursor jumping around when backspacing numbers around a decimal point, since
    // e.g. "123" and "123." are both 123.
    inputValue = potentialInputValue;
  }

  $: operator = isLiteralObject(value) ? Object.keys(value)[0] : operators?.[0].value;

  let lastTimeoutId: ReturnType<typeof setTimeout>;
  function updateValue() {
    let newValue: typeof value;
    const valueAsType = inputType === 'number' ? Number(inputValue) : inputValue;
    if (inputValue && operator) {
      // Add with operator if used
      newValue = { [operator]: valueAsType };
    } else {
      newValue = inputValue === '' ? null : valueAsType;
    }

    value = newValue;
    if (debounceChange) {
      clearTimeout(lastTimeoutId);
      lastTimeoutId = setTimeout(
        () => {
          dispatch('change', { value, inputValue, operator });
        },
        debounceChange === true ? 300 : debounceChange
      );
    } else {
      dispatch('change', { value, inputValue, operator });
    }
  }

  function handleInput(e: Event) {
    const elm = e.target as HTMLTextAreaElement | HTMLInputElement;
    if (accept) {
      // filter input based on accepted characters
      const regex = new RegExp(accept, 'g');
      inputValue = elm.value.match(regex)?.[0] ?? '';
      elm.value = inputValue;
    } else {
      inputValue = elm.value;
    }
    updateValue();
  }

  function textAreaMultiAction(n: HTMLTextAreaElement) {
    if (actions) {
      return actions(n);
    }
    return [];
  }

  function onSelectChange(e: Event) {
    operator = (e.target as HTMLSelectElement).value;
    updateValue();
  }

  $: hasInputValue = inputValue != null && inputValue !== '';
  $: hasInsetLabel = ['inset', 'float'].includes(labelPlacement) && label !== '';

  $: hasPrepend = $$slots.prepend || !!icon;
  $: hasAppend =
    $$slots.append || iconRight != null || clearable || error || operators || type === 'password';
  $: hasPrefix = $$slots.prefix || type === 'currency';
  $: hasSuffix = $$slots.suffix || type === 'percent';

  export let id = uniqueId('textfield-');
  let labelEl: HTMLLabelElement | null = null;
</script>

<label
  for={id}
  role="group"
  class={cls(
    'TextField',
    'group flex gap-1',
    labelPlacement !== 'left' ? 'flex-col' : 'items-center',
    error ? '[--color:theme(colors.danger)]' : '[--color:theme(colors.primary)]',
    disabled && 'opacity-50 pointer-events-none',
    !base && (rounded ? 'rounded-full' : 'rounded'),
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
  bind:this={labelEl}
>
  {#if label && ['top', 'left'].includes(labelPlacement)}
    <span
      class={cls(
        'label',
        'block text-sm font-medium',
        'truncate group-hover:text-surface-content/70 group-focus-within:text-[var(--color)] group-hover:group-focus-within:text-[var(--color)] cursor-pointer',
        error ? 'text-danger/80' : 'text-surface-content/50',
        `placement-${labelPlacement}`,
        settingsClasses.label,
        classes.label
      )}
    >
      {label}
    </span>
  {/if}

  <div class="flex-1">
    <div
      class={cls(
        'border py-0 transition-shadow',
        disabled ? '' : 'hover:shadow',
        disabled ? '' : error ? 'hover:border-danger' : 'hover:border-surface-content',
        {
          'px-2': !rounded,
          'px-6': rounded && !hasPrepend, // TODO: `hasPrepend` always true for SelectField, etc.  See: https://github.com/sveltejs/svelte/issues/6059
        },
        !base && ['bg-surface-100', rounded ? 'rounded-full' : 'rounded'],
        error && 'border-danger',
        'group-focus-within:shadow-md group-focus-within:border-[var(--color)]',
        settingsClasses.container,
        classes.container
      )}
    >
      <div class="flex items-center">
        {#if hasPrepend}
          <div
            class={cls(
              'prepend flex items-center whitespace-nowrap',
              rounded && 'pl-3',
              settingsClasses.prepend,
              classes.prepend
            )}
          >
            <slot name="prepend" />
            {#if icon}
              <span class="mr-3">
                <Icon data={asIconData(icon)} class="text-surface-content/50" />
              </span>
            {/if}
          </div>
        {/if}

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div role={role === 'combobox' ? role : undefined} class="flex-grow inline-grid" on:click>
          {#if label && ['inset', 'float'].includes(labelPlacement)}
            <span
              class={cls(
                'label',
                'col-span-full row-span-full z-[1] flex items-center h-full truncate origin-top-left transition-all duration-200 group-hover:text-surface-content/70 group-focus-within:text-[var(--color)] group-hover:group-focus-within:text-[var(--color)] cursor-pointer',
                error ? 'text-danger/80' : 'text-surface-content/50',
                `placement-${labelPlacement}`,
                (labelPlacement === 'inset' || hasInputValue) && 'shrink',
                settingsClasses.label,
                classes.label
              )}
            >
              {label}
            </span>
          {/if}

          <div
            class={cls(
              'input col-span-full row-span-full flex items-center',
              hasInsetLabel && 'pt-4',
              dense ? 'my-1' : 'my-2',
              (hasPrefix || hasSuffix) &&
                label &&
                labelPlacement === 'float' &&
                !hasInputValue &&
                'opacity-0 transition-opacity',
              'group-focus-within:opacity-100'
            )}
          >
            <slot name="prefix" />

            {#if type === 'currency'}
              <Icon data={mdiCurrencyUsd} size="1.1em" class="text-surface-content/50 -mt-1" />
            {/if}

            {#if multiline}
              <textarea
                {id}
                {name}
                {placeholder}
                {autocomplete}
                {required}
                {disabled}
                value={inputValue}
                {autocapitalize}
                bind:this={inputEl}
                on:input={handleInput}
                on:focus
                on:blur
                on:keydown
                on:keypress
                class={cls(
                  'text-sm border-none w-full bg-transparent outline-none resize-none',
                  'placeholder-surface-content placeholder-opacity-0 group-focus-within:placeholder-opacity-50',
                  error && 'placeholder-danger',
                  (labelPlacement !== 'float' || !hasInsetLabel) && 'placeholder-opacity-50',
                  {
                    'text-left': align === 'left',
                    'text-center': align === 'center',
                    'text-right': align === 'right',
                  },
                  settingsClasses.input,
                  classes.input
                )}
                use:multi={textAreaMultiAction}
              ></textarea>
            {:else}
              <Input
                {id}
                {name}
                {placeholder}
                {required}
                {disabled}
                {autocomplete}
                type={inputType}
                inputmode={inputMode}
                value={String(inputValue ?? '')}
                {mask}
                {replace}
                {accept}
                {autocapitalize}
                {min}
                {max}
                {step}
                {actions}
                bind:inputEl
                on:input={handleInput}
                on:focus
                on:blur
                on:keydown
                on:keypress
                class={cls(
                  'text-sm border-none w-full bg-transparent outline-none truncate',
                  'selection:bg-surface-content/30',
                  'placeholder-surface-content placeholder-opacity-0 group-focus-within:placeholder-opacity-50',
                  error && 'placeholder-danger',
                  (labelPlacement !== 'float' || !hasInsetLabel) && 'placeholder-opacity-50',
                  {
                    'text-left': align === 'left',
                    'text-center': align === 'center',
                    'text-right': align === 'right',
                  },
                  settingsClasses.input,
                  classes.input
                )}
              />
            {/if}

            {#if type === 'percent'}
              <Icon data={mdiPercent} size="1.1em" class="text-surface-content/50 -mt-1 ml-1" />
            {/if}

            <slot name="suffix" />
          </div>
        </div>

        {#if hasAppend}
          <div
            class={cls(
              'append flex items-center whitespace-nowrap',
              settingsClasses.append,
              classes.append
            )}
          >
            {#if clearable && hasInputValue}
              <Button
                icon={mdiClose}
                {disabled}
                class="text-surface-content/50 p-1"
                on:click={() => {
                  inputValue = '';
                  operator = operators?.[0].value;
                  updateValue();
                  dispatch('clear');
                  labelEl?.focus();
                }}
              />
            {/if}

            {#if operators}
              <select
                {disabled}
                value={operator}
                on:change={onSelectChange}
                class="appearance-none bg-surface-content/5 border rounded-full mr-2 px-2 text-sm outline-none focus:border-opacity-50 focus:shadow-md"
                style="text-align-last: center;"
              >
                {#each operators ?? [] as { label, value }}
                  <option {value}>{label}</option>
                {/each}
              </select>
            {/if}

            {#if type === 'password'}
              <Button
                icon={mdiEye}
                {disabled}
                class="text-surface-content/50 p-2"
                on:click={() => {
                  if (inputType === 'password') {
                    inputType = 'text';
                  } else {
                    inputType = 'password';
                  }
                }}
              />
            {/if}

            <slot name="append" />

            {#if error}
              <Icon data={mdiInformationOutline} class="text-danger" />
            {:else if iconRight}
              <Icon data={asIconData(iconRight)} class="text-surface-content/50" />
            {/if}
          </div>
        {/if}
      </div>
    </div>

    <div
      class={cls(
        error ? 'error' : 'hint',
        'text-xs ml-2 transition-transform ease-out overflow-hidden origin-top transform group-focus-within:scale-y-100',
        error ? 'text-danger' : 'text-surface-content/50 scale-y-0',
        settingsClasses.error,
        classes.error
      )}
    >
      {error && error != true ? error : hint}
    </div>
  </div>
</label>

<style lang="postcss">
  .TextField:focus-within .label.placement-float,
  .label.shrink {
    transform: scale(0.75);
    width: 133%; /* offset 75% scale */
    height: 32px;
  }

  :global(input::placeholder),
  textarea::placeholder {
    transition: color 200ms; /* Move to tailwind plugin? */
  }
</style>
