<script lang="ts">
  import { type ComponentProps, type Snippet } from 'svelte';

  import Checkbox from './Checkbox.svelte';
  import { cls } from '../utils/styles.js';
  import { getComponentClasses } from './theme.js';
  import Button from './Button.svelte';
  import { mdiCheck } from '@mdi/js';

  interface Props {
    checked: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    variant?: 'checkbox' | 'checkmark' | 'fill';
    classes?: {
      root?: string;
      checkbox?: ComponentProps<typeof Checkbox>['classes'];
      container?: string;
    };
    class?: string;
    onChange?: () => void;
    children?: Snippet;
    actions?: Snippet;
  }

  let {
    checked = $bindable(),
    indeterminate = $bindable(false),
    disabled = false,
    variant = 'checkbox',
    classes = {},
    class: className,
    onChange,
    children,
    actions,
  }: Props = $props();
  const settingsClasses = getComponentClasses('MultiSelectOption');
</script>

<div
  class={cls(
    'MultiSelectOption',
    'grid grid-cols-[1fr,auto]',
    settingsClasses.root,
    classes.root,
    className
  )}
  role="option"
  aria-selected={checked}
>
  {#if variant === 'checkbox'}
    <Checkbox
      bind:checked
      bind:indeterminate
      {onChange}
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
        {@render children?.()}
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
      onclick={() => onChange?.()}
    >
      {@render children?.()}
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
      onclick={() => onChange?.()}
    >
      {@render children?.()}
    </Button>
  {/if}
  {@render actions?.()}
</div>
