<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  interface Props {
    children?: Snippet;
  }

  let { children, ...restProps }: Props & HTMLAnchorAttributes = $props();
</script>

<!-- href provided by markdown/mdsvex -->
<!-- svelte-ignore a11y_missing_attribute -->
<a class="text-primary font-medium" {...restProps}>
  {@render children?.()}
</a>
