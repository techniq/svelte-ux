<script lang="ts">
  import type { Readable } from 'svelte/store';

  type T = $$Generic;

  export let value: Readable<T>;
</script>

<slot value={$value} />
