<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<div
  class="ViewportCenter fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center"
>
  {@render children?.()}
</div>
