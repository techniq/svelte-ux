<script lang="ts">
  /**
   * Wrapper component to convenient subscribe to a store value when impractical (for example, slot `let:value`)
   */
  import type { Readable } from 'svelte/store';

  type T = $$Generic;

  export let value: Readable<T>;
</script>

<slot value={$value} />
