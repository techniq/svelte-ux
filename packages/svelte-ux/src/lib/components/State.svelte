<script lang="ts">
  type T = $$Generic;

  export let initial: T | null = null;

  let value = initial;

  function set(newValue: T) {
    value = newValue;
  }
</script>

<slot {value} {set} />
