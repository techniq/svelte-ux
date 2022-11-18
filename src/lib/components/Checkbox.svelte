<script lang="ts">
  /*
    TODO:
			- [ ] change color
      - [ ] bind:group (array of values)
        - Smelte
          - https://github.com/matyunya/smelte/blob/2bdabb642fbba956757a7bec5a5896fc356ed51e/src/components/Checkbox/Checkbox.svelte#L24
          - https://github.com/matyunya/smelte/pull/184
          - https://svelte.dev/repl/1565708677134e418e256234984d90ef?version=3.29.0
        - svelte-mui
          - https://github.com/vikignt/svelte-mui/blob/master/src/Checkbox.svelte
          - https://svelte-mui.now.sh/checkbox/checkbox-group
        - Svelte Material UI
          - https://sveltematerialui.com/demo/checkbox
          - https://github.com/hperrin/svelte-material-ui/blob/master/packages/checkbox/Checkbox.svelte
      - [ ] use:draw
  */

  import clsx from 'clsx';
  import { mdiCheck, mdiMinus } from '@mdi/js';

  import Icon from './Icon.svelte';
  import { uniqueId } from '$lib/utils/string';

  export let id = uniqueId('checkbox_');
  export let value: any = undefined;
  export let checked: boolean = false;
  export let indeterminate: boolean = false;
  export let disabled: boolean = false;
  export let circle: boolean = false;
  export let size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';

  export let classes: {
    root?: string;
    checkbox?: string;
    label?: string;
    icon?: string;
  } = {};
</script>

<div class={clsx('inline-flex gap-x-1 items-center', classes.root, $$props.class)}>
  <input
    {id}
    type="checkbox"
    bind:checked
    on:change
    {value}
    class="peer appearance-none absolute"
    {disabled}
  />
  <label
    for={id}
    class={clsx(
      'inline-grid place-items-center border-2',
      circle ? 'rounded-full' : 'rounded',
      'peer-disabled:opacity-50 transition-shadow duration-300',
      !disabled &&
        'peer-hover:border-accent-500 peer-focus-visible:ring-2 ring-accent-400 ring-offset-1',
      checked
        ? disabled
          ? 'bg-gray-500 border-gray-500'
          : 'bg-accent-500 border-accent-500'
        : 'border-gray-500',
      classes.checkbox
    )}
  >
    <Icon
      path={indeterminate ? mdiMinus : mdiCheck}
      class={clsx(
        'pointer-events-none text-white transition-transform',
        checked ? 'scale-100' : 'scale-0',
        classes.icon
      )}
      size={{
        xs: '.75rem', // 12px
        sm: '.875rem', // 14px
        md: '1rem', // 16px
        lg: '1.125rem', // 18px
      }[size]}
    />
  </label>

  {#if $$slots.default}
    <label
      for={id}
      class={clsx(
        'peer-disabled:opacity-50',
        {
          xs: 'text-xs', // 12px
          sm: 'text-sm', // 14px
          md: 'text-md', // 16px
          lg: 'text-lg', // 18px
        }[size],
        classes.label
      )}
    >
      <slot />
    </label>
  {/if}
</div>
