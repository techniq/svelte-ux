<script lang="ts">
  export let initial: any = null;

  let value = initial;

  function set(newValue: any) {
    value = newValue;
  }
</script>

<slot {value} {set} />
