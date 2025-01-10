<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    style?: string;
    children?: Snippet<[{ scrollIntoView: (options?: boolean | ScrollIntoViewOptions) => void }]>;
  }

  let { class: className, style, children }: Props = $props();
  let node: HTMLElement | undefined = $state();

  function scrollIntoView(node: HTMLElement) {
    return (options?: Parameters<typeof node.scrollIntoView>['0']) => node.scrollIntoView(options);
  }
</script>

<div bind:this={node} class={className} {style}>
  {@render children?.({ scrollIntoView: scrollIntoView(node) })}
</div>
