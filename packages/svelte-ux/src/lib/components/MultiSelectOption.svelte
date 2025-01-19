<script lang="ts">
  import { createEventDispatcher, type ComponentProps } from 'svelte';

  import Checkbox from './Checkbox.svelte';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';
  import Button from './Button.svelte';
  import { mdiCheck } from '@mdi/js';

  export let checked: boolean;
  export let indeterminate = false;
  export let disabled = false;
  export let variant: 'checkbox' | 'checkmark' | 'fill' = 'checkbox';

  export let classes: {
    root?: string;
    checkbox?: ComponentProps<Checkbox>['classes'];
    container?: string;
  } = {};
  const settingsClasses = getComponentClasses('MultiSelectOption');

  const dispatch = createEventDispatcher<{ change: null }>();
</script>

<div
  class={cls(
    'MultiSelectOption',
    'grid grid-cols-[1fr,auto]',
    settingsClasses.root,
    classes.root,
    $$props.class
  )}
  role="option"
  aria-selected={checked}
>
  {#if variant === 'checkbox'}
    <Checkbox
      bind:checked
      bind:indeterminate
      on:change={() => dispatch('change')}
      {disabled}
      classes={{
        root: 'px-2 rounded hover:bg-surface-content/5',
        label: 'py-2',
        ...settingsClasses.checkbox,
        ...classes.checkbox,
      }}
    >
      <div
        class={cls(
          'ml-1 inline-block text-sm text-surface-content',
          !disabled && 'cursor-pointer',
          settingsClasses.container,
          classes.container
        )}
      >
        <slot />
      </div>
    </Checkbox>
  {:else if variant === 'checkmark'}
    <Button
      icon={checked ? mdiCheck : 'M0'}
      {disabled}
      class={cls(
        'px-2 text-sm font-normal text-surface-content hover:bg-surface-content/5',
        'justify-start',
        settingsClasses.container,
        classes.container
      )}
      on:click={() => dispatch('change')}
    >
      <slot />
    </Button>
  {:else if variant === 'fill'}
    <Button
      {disabled}
      class={cls(
        'px-2 my-px text-sm font-normal',
        'justify-start',
        settingsClasses.container,
        classes.container
      )}
      variant={checked ? 'fill-light' : 'default'}
      color={checked ? 'primary' : 'default'}
      on:click={() => dispatch('change')}
    >
      <slot />
    </Button>
  {/if}
  <slot name="actions" />
</div>
