<script lang="ts">
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

  const settingsClasses = getComponentClasses('EmptyMessage');
</script>

<div
  {...$$restProps}
  class={cls(
    'EmptyMessage',
    'grid place-items-center',
    'p-1 bg-surface-300 _shadow-inner _ring-1 ring-surface-200/30',
    'text-surface-content/50 text-xs tracking-wider',
    'border border-surface-100/80 rounded',
    settingsClasses.root,
    $$props.class
  )}
>
  <slot />
</div>
