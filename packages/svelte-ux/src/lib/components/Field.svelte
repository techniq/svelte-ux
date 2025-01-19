<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiClose, mdiInformationOutline } from '@mdi/js';
  import { uniqueId } from 'lodash-es';

  import { cls } from '@layerstack/tailwind';
  import { type LabelPlacement, DEFAULT_LABEL_PLACEMENT } from '../types/index.js';
  import { getComponentSettings } from './settings.js';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';

  const dispatch = createEventDispatcher<{
    clear: null;
  }>();

  const { classes: settingsClasses, defaults } = getComponentSettings('Field');

  export let label = '';
  export let labelPlacement: LabelPlacement = defaults.labelPlacement ?? DEFAULT_LABEL_PLACEMENT;
  export let value: any = null;
  export let placeholder = '';
  export let error: string | string[] | boolean | undefined = '';
  export let hint = '';
  // export let autocomplete = 'off'; // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  // export let multiline = false;
  export let disabled = false;
  export let clearable = false;
  export let base = false;
  export let rounded = false;
  export let dense = false;
  export let icon: string | null = null;
  export let iconRight: string | null = null;
  // export let align: 'left' | 'center' | 'right' = 'left';
  // export let actions: Actions = undefined;
  // export let inputEl: HTMLInputElement | null = null;
  export let center = false;
  export let classes: {
    root?: string;
    container?: string;
    label?: string;
    input?: string;
    error?: string;
    prepend?: string;
    append?: string;
  } = {};

  $: hasValue = Array.isArray(value)
    ? value.length > 0
    : !!value /* anything truthy such as object, non-empty string, etc */;
  $: hasInsetLabel = ['inset', 'float'].includes(labelPlacement) && label !== '';

  $: hasPrepend = $$slots.prepend || icon != null;
  $: hasAppend = $$slots.append || iconRight != null || clearable || error;

  export let id = uniqueId('field-');
  let labelEl: HTMLLabelElement | null = null;
</script>

<label
  for={id}
  role="group"
  class={cls(
    'Field',
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
        'truncate group-hover:text-surface-content/70 group-focus-within:text-primary group-hover:group-focus-within:text-[var(--color)] cursor-pointer',
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
          'px-6': rounded && !hasPrepend,
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
              settingsClasses.prepend,
              classes.prepend
            )}
          >
            <slot name="prepend" />

            {#if icon}
              <span class={cls('mr-3', rounded && !$$slots.prepend && 'ml-3')}>
                <Icon data={icon} class="text-surface-content/50" />
              </span>
            {/if}
          </div>
        {/if}

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="flex-grow inline-grid" on:click>
          {#if label && ['inset', 'float'].includes(labelPlacement)}
            <span
              class={cls(
                'label',
                'col-span-full row-span-full z-[1] flex items-center h-full truncate origin-top-left transition-all duration-200 group-hover:text-surface-content/70 group-focus-within:text-[var(--color)] group-hover:group-focus-within:text-[var(--color)] cursor-pointer',
                center && 'justify-center',
                error ? 'text-danger/80' : 'text-surface-content/50',
                `placement-${labelPlacement}`,
                (labelPlacement === 'inset' || hasValue) && 'shrink',
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
              center && 'text-center',
              settingsClasses.input,
              classes.input
            )}
          >
            <slot name="prefix" />

            <slot {id}>
              {#if value}
                {value}
              {:else if placeholder}
                <span class="text-surface-content/50">
                  {placeholder}
                </span>
              {:else}
                &nbsp
              {/if}
            </slot>

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
            {#if clearable && hasValue}
              <Button
                icon={mdiClose}
                {disabled}
                class="text-surface-content/50 p-1"
                on:click={() => {
                  value = Array.isArray(value) ? [] : typeof value === 'string' ? '' : null;
                  dispatch('clear');
                  labelEl?.focus();
                }}
              />
            {/if}

            <slot name="append" />

            {#if error}
              <Icon data={mdiInformationOutline} class="text-danger" />
            {:else if iconRight}
              <Icon data={iconRight} class="text-surface-content/50" />
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

  <slot name="root" />
</label>

<style lang="postcss">
  .Field:focus-within .label.placement-float,
  .label.shrink {
    transform: scale(0.75);
    width: 133%; /* offset 75% scale */
    height: 32px;
  }
</style>
