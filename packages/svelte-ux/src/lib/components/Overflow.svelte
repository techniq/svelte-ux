<script lang="ts">
  import { overflow } from '../actions/layout.js';
  import { cls } from '@layerstack/tailwind';
  import { getComponentClasses } from './theme.js';

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
  class={cls('Overflow', settingsClasses.root, $$props.class)}
>
  <slot {overflowX} {overflowY} />
</div>
