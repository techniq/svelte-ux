<script lang="ts">
  let on = false;

  function toggle() {
    on = !on;
  }
  function toggleOn() {
    on = true;
  }
  function toggleOff() {
    on = false;
  }
</script>

<slot {on} {toggle} {toggleOn} {toggleOff} />
