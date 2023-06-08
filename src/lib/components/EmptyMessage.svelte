<script lang="ts">
  import { cls } from '../utils/styles';
</script>

<div
  {...$$restProps}
  class={cls(
    'EmptyMessage',
    'grid place-items-center',
    'p-1 bg-black/10 shadow-inner ring-1 ring-black/30',
    'text-black/50 text-xs tracking-wider',
    'border rounded',
    $$props.class
  )}
>
  <slot />
</div>
