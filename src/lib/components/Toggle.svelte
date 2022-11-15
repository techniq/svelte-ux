<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let on = false;

  function toggle() {
    on = !on;
    dispatch('toggle', on);
    if (on) {
      dispatch('toggleOn');
    } else {
      dispatch('toggleOff');
    }
  }
  function toggleOn() {
    on = true;
    dispatch('toggle', on);
    dispatch('toggleOn');
  }
  function toggleOff() {
    on = false;
    dispatch('toggle', on);
    dispatch('toggleOff');
  }
</script>

<slot {on} {toggle} {toggleOn} {toggleOff} />
