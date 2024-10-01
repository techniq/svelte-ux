<script lang="ts">
  import { uniqueId } from '@layerstack/utils';
  import { cls, type ThemeColors } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  export let id: string = uniqueId('switch-');
  export let name = '';
  export let value: any = undefined;
  export let checked: boolean | null = false;
  export let required = false;
  export let disabled = false;
  export let size: 'sm' | 'md' | 'lg' = 'lg';

  export let color: ThemeColors = 'primary';

  export let classes: {
    root?: string;
    input?: string;
    switch?: string;
    toggle?: string;
  } = {};
  const settingsClasses = getComponentClasses('Switch');
</script>

<div class={cls('Switch', 'inline-block', settingsClasses.root, classes.root)}>
  <!-- TODO: Consider dispatch custom event for `change` so `e.target.checked` is guaranteed downstream -->
  <input
    {id}
    {name}
    type="checkbox"
    bind:checked
    on:change
    {value}
    class={cls('peer appearance-none block h-0', settingsClasses.input, classes.input)}
    {required}
    {disabled}
  />

  <label
    for={id}
    data-checked={checked}
    class={cls(
      'switch',
      'group border rounded-full grid align-items p-[2px] transition-shadow',
      {
        'w-6 h-4': size === 'sm',
        'w-8 h-5': size === 'md',
        'w-10 h-6': size === 'lg',
      },
      checked &&
        {
          primary: 'bg-primary border-primary',
          secondary: 'bg-secondary border-secondary',
          accent: 'bg-accent border-accent',
          neutral: 'bg-neutral border-neutral',
          info: 'bg-info border-info',
          success: 'bg-success border-success',
          warning: 'bg-warning border-warning',
          danger: 'bg-danger border-danger',
        }[color],
      {
        primary: 'ring-primary/60',
        secondary: 'ring-secondary/60',
        accent: 'ring-accent/60',
        neutral: 'ring-neutral/60',
        info: 'ring-info/60',
        success: 'ring-success/60',
        warning: 'ring-warning/60',
        danger: 'ring-danger/60',
      }[color],
      checked === false && 'bg-surface-content/20',
      disabled ? 'opacity-50' : 'cursor-pointer peer-focus-visible:ring-2 ring-offset-1',
      settingsClasses.switch,
      classes.switch,
      $$props.class
    )}
  >
    <div
      data-checked={checked}
      class={cls(
        'toggle w-1/2 aspect-square h-full rounded-full transition-all duration-200 bg-surface-100 grid items-center justify-center transform',
        'group-active:w-[60%] aspect-auto',
        checked && 'translate-x-full group-active:translate-x-[65%]',
        checked === null && 'border',
        settingsClasses.toggle,
        classes.toggle
      )}
    >
      <slot {checked} {value} />
    </div>
  </label>
</div>
