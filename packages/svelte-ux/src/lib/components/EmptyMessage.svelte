<script lang="ts">
  import { cls } from '../utils/styles';
  import { getComponentTheme } from './theme';

  const theme = getComponentTheme('EmptyMessage');
</script>

<div
  {...$$restProps}
  class={cls(
    'EmptyMessage',
    'grid place-items-center',
    'p-1 bg-black/10 shadow-inner ring-1 ring-black/30',
    'text-black/50 text-xs tracking-wider',
    'border rounded',
    theme.root,
    $$props.class
  )}
>
  <slot />
</div>
