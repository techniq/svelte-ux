<script lang="ts">
  import { overflow } from '$lib/actions/layout';
  import { cls } from '$lib/utils/styles';
  import { getComponentTheme } from './theme';

  const theme = getComponentTheme('Overflow');

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
  class={cls('Overflow', theme.root, $$props.class)}
>
  <slot {overflowX} {overflowY} />
</div>
