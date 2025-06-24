<script lang="ts">
  import { overflow } from '@layerstack/svelte-actions';
  import { cls } from '@layerstack/tailwind';

  import { getComponentClasses } from './theme.js';

  let className: string | undefined = undefined;
  export { className as class };

  const settingsClasses = getComponentClasses('Overflow');

  let overflowX = 0;
  let overflowY = 0;
</script>

<div
  use:overflow
  on:overflow={(e) => {
    overflowX = e.detail.overflowX;
    overflowY = e.detail.overflowY;
  }}
  {...$$restProps}
  class={cls('Overflow', settingsClasses.root, className)}
>
  <slot {overflowX} {overflowY} />
</div>
