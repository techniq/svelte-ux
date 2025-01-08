<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    on?: boolean;
    onToggle?: (value: boolean) => void;
    onToggleOn?: () => void;
    onToggleOff?: () => void;
    children?: Snippet<
      [{ on: boolean; toggle: () => void; toggleOn: () => void; toggleOff: () => void }]
    >;
  }

  let {
    on = $bindable(false),
    onToggle,
    onToggleOn,
    onToggleOff,
    children,
  }: Props = $props();

  function toggle() {
    on = !on;
    onToggle?.(on);
    if (on) {
      onToggleOn?.();
    } else {
      onToggleOff?.();
    }
  }
  function toggleOn() {
    on = true;
    onToggle?.(on);
    onToggleOn?.();
  }
  function toggleOff() {
    on = false;
    onToggle?.(on);
    onToggleOff?.();
  }
</script>

{@render children?.({ on, toggle, toggleOn, toggleOff })}
