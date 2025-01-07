<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    on?: boolean;
    toggle?: (value: boolean) => void;
    toggleOn?: () => void;
    toggleOff?: () => void;
    children?: Snippet<
      [{ on: boolean; toggle: () => void; toggleOn: () => void; toggleOff: () => void }]
    >;
  }

  let {
    on = $bindable(false),
    toggle: _toggle,
    toggleOn: _toggleOn,
    toggleOff: _toggleOff,
    children,
  }: Props = $props();

  function toggle() {
    on = !on;
    _toggle?.(on);
    if (on) {
      _toggleOn?.();
    } else {
      _toggleOff?.();
    }
  }
  function toggleOn() {
    on = true;
    _toggle?.(on);
    _toggleOn?.();
  }
  function toggleOff() {
    on = false;
    _toggle?.(on);
    _toggleOff?.();
  }
</script>

{@render children?.({ on, toggle, toggleOn, toggleOff })}
