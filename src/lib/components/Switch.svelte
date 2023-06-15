<script lang="ts">
  import type { TailwindColors } from '$lib/types';
  import { uniqueId } from '$lib/utils/string';
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  export let id: string = uniqueId('switch-');
  export let value: any = undefined;
  export let checked: boolean | null = false;
  export let disabled: boolean = false;
  export let size: 'sm' | 'md' | 'lg' = 'lg';

  export let color: TailwindColors = 'accent';

  export let classes: {
    root?: string;
    input?: string;
    switch?: string;
    toggle?: string;
  } = {};
  const theme = getComponentTheme('Switch');
</script>

<div class={cls('Switch', 'inline-block', theme.root, classes.root)}>
  <input
    {id}
    type="checkbox"
    bind:checked
    on:change
    {value}
    class={cls('peer appearance-none inline', theme.input, classes.input)}
    {disabled}
  />

  <label
    for={id}
    data-checked={checked}
    class={cls(
      'switch',
      'border rounded-full grid align-items p-[2px] transition-shadow',
      {
        'w-6 h-4': size === 'sm',
        'w-8 h-5': size === 'md',
        'w-10 h-6': size === 'lg',
      },
      checked &&
        {
          accent: 'bg-accent-500 border-accent-500',
          red: 'bg-red-500 border-red-500',
          orange: 'bg-orange-500 border-orange-500',
          amber: 'bg-amber-500 border-amber-500',
          yellow: 'bg-yellow-500 border-yellow-500',
          lime: 'bg-lime-500 border-lime-500',
          green: 'bg-green-500 border-green-500',
          emerald: 'bg-emerald-500 border-emerald-500',
          teal: 'bg-teal-500 border-teal-500',
          cyan: 'bg-cyan-500 border-cyan-500',
          sky: 'bg-sky-500 border-sky-500',
          blue: 'bg-blue-500 border-blue-500',
          indigo: 'bg-indigo-500 border-indigo-500',
          violet: 'bg-violet-500 border-violet-500',
          purple: 'bg-purple-500 border-purple-500',
          fuchsia: 'bg-fuchsia-500 border-fuchsia-500',
          pink: 'bg-pink-500 border-pink-500',
          rose: 'bg-rose-500 border-rose-500',
        }[color],
      checked === false && 'bg-gray-300 border-gray-300',
      checked === null && 'border-gray-300',
      disabled
        ? 'opacity-50'
        : 'cursor-pointer peer-focus-visible:ring-2 ring-accent-400 ring-offset-1',
      theme.switch,
      classes.switch,
      $$props.class
    )}
  >
    <div
      data-checked={checked}
      class={cls(
        'toggle w-1/2 aspect-square h-full rounded-full transition-all duration-200 bg-white grid items-center justify-center transform',
        checked && 'translate-x-full',
        checked === null && 'border border-gray-300',
        theme.toggle,
        classes.toggle
      )}
    >
      <slot {checked} {value} />
    </div>
  </label>
</div>
