<script lang="ts">
  import type { Readable } from 'svelte/store';

  type T = $$Generic;

  export let store: Readable<T>;
</script>

<slot value={$store} />
