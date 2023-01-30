<script lang="ts">
  import { overflow } from '$lib/actions/layout';

  let overflowX = 0;
  let overflowY = 0;
</script>

<div
  use:overflow
  on:overflowX={(e) => (overflowX = e.detail)}
  on:overflowY={(e) => (overflowY = e.detail)}
  {...$$restProps}
>
  <slot {overflowX} {overflowY} />
</div>
