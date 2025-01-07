<script module>
  // Custom components: https://mdsvex.com/docs#custom-components
  import blockquote from './Blockquote.svelte';
  import a from './Link.svelte';
  import h1 from './Header1.svelte';
  import type { Snippet } from 'svelte';

  export { a, blockquote };
</script>

<script lang="ts">
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
  // frontmatter: https://mdsvex.com/docs#frontmatter-1
  // export let description = undefined;
</script>

{@render children?.()}
