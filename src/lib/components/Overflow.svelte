<script lang="ts">
  import { overflow } from '$lib/actions/layout';
  import { cls } from '$lib/utils/styles';

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
  class={cls('Overflow', $$props.class)}
>
  <slot {overflowX} {overflowY} />
</div>
