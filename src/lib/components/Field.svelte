<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiClose, mdiInformationOutline } from '@mdi/js';
  import { uniqueId } from 'lodash-es';

  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  import Button from './Button.svelte';
  import Icon from './Icon.svelte';

  const dispatch = createEventDispatcher<{
    clear: null;
  }>();

  export let label = '';
  export let labelPlacement: 'inset' | 'shrink' | 'top' | 'left' = 'inset';
  export let value: any = null;
  // export let placeholder = '';
  export let error = '';
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
  const theme = getComponentTheme('Field');

  $: hasValue = Array.isArray(value)
    ? value.length > 0
    : !!value /* anything truthy such as object, non-empty string, etc */;
  $: hasInsetLabel = ['inset', 'shrink'].includes(labelPlacement) && label !== '';

  $: hasPrepend = $$slots.prepend || icon != null;
  $: hasAppend = $$slots.append || iconRight != null || clearable || error;

  const id = uniqueId('field-');
  let labelEl: HTMLLabelElement | null = null;
</script>

<fieldset
  {disabled}
  class={cls(
    'Field',
    'group flex gap-1',
    labelPlacement !== 'left' ? 'flex-col' : 'items-center',
    error ? '[--color:theme(colors.red.500)]' : '[--color:theme(colors.accent.500)]',
    disabled && 'opacity-50 pointer-events-none',
    !base && (rounded ? 'rounded-full' : 'rounded'),
    theme.root,
    classes.root,
    $$props.class
  )}
>
  {#if label && ['top', 'left'].includes(labelPlacement)}
    <label
      class={cls(
        'block text-sm font-medium',
        'truncate group-hover:text-gray-700 group-focus-within:text-color-var group-hover:group-focus-within:text-color-var cursor-pointer',
        error ? 'text-red-500/80' : 'text-black/50',
        `placement-${labelPlacement}`,
        theme.label,
        classes.label
      )}
      for={id}
      bind:this={labelEl}
    >
      {label}
    </label>
  {/if}

  <div class="flex-1">
    <div
      class={cls(
        'border py-0 transition-shadow',
        disabled ? '' : 'hover:shadow',
        disabled ? '' : error ? 'hover:border-red-700' : 'hover:border-gray-700',
        {
          'px-2': !rounded,
          'px-6': rounded && !hasPrepend,
        },
        !base && ['bg-white', rounded ? 'rounded-full' : 'rounded'],
        error ? 'border-red-500' : 'border-black/20',
        'group-focus-within:shadow-md group-focus-within:border-color-var',
        theme.container,
        classes.container
      )}
    >
      <div class="flex items-center">
        {#if hasPrepend}
          <div
            class={cls(
              'prepend whitespace-nowrap flex items-center',
              theme.prepend,
              classes.prepend
            )}
          >
            <slot name="prepend" />

            {#if icon}
              <span class={cls('mr-3', rounded && !$$slots.prepend && 'ml-3')}>
                <Icon path={icon} class="text-black/50" />
              </span>
            {/if}
          </div>
        {/if}

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="flex-grow inline-grid" on:click>
          {#if label && ['inset', 'shrink'].includes(labelPlacement)}
            <label
              class={cls(
                'col-span-full row-span-full z-[1] flex items-center h-full truncate origin-top-left transition-all duration-200 group-hover:text-gray-700 group-focus-within:text-color-var group-hover:group-focus-within:text-color-var cursor-pointer',
                center && 'justify-center',
                error ? 'text-red-500/80' : 'text-black/50',
                `placement-${labelPlacement}`,
                (labelPlacement === 'inset' || hasValue) && 'shrink',
                theme.label,
                classes.label
              )}
              for={id}
              bind:this={labelEl}
            >
              {label}
            </label>
          {/if}

          <div
            class={cls(
              'input col-span-full row-span-full flex items-center',
              hasInsetLabel && 'pt-4',
              dense ? 'my-1' : 'my-2',
              center && 'text-center',
              theme.input,
              classes.input
            )}
          >
            <slot name="prefix" />

            <slot {id} />

            <slot name="suffix" />
          </div>
        </div>

        {#if hasAppend}
          <div class={cls('append whitespace-nowrap', theme.append, classes.append)}>
            {#if clearable && hasValue}
              <Button
                icon={mdiClose}
                class="text-black/50 p-1"
                on:click={() => {
                  value = Array.isArray(value) ? [] : typeof value === 'string' ? '' : null;
                  dispatch('clear');
                  labelEl.focus();
                }}
              />
            {/if}

            <slot name="append" />

            {#if error}
              <Icon path={mdiInformationOutline} class="text-red-500" />
            {:else if iconRight}
              <Icon path={iconRight} class="text-black/50" />
            {/if}
          </div>
        {/if}
      </div>
    </div>
    <div
      class={cls(
        error ? 'error' : 'hint',
        'text-xs ml-2 transition-transform ease-out overflow-hidden origin-top transform group-focus-within:scale-y-100',
        error ? 'text-red-500' : 'text-black/50 scale-y-0',
        theme.error,
        classes.error
      )}
    >
      {error || hint}
    </div>
  </div>

  <slot name="fieldset" />
</fieldset>

<style lang="postcss">
  fieldset:focus-within label.placement-shrink,
  label.shrink {
    transform: scale(0.75);
    width: 133%; /* offset 75% scale */
    height: 32px;
  }
</style>
