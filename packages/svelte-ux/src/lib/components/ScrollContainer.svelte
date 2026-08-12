<script lang="ts">
  let node: HTMLElement;

  // function scrollIntoView(options: Parameters<typeof node.scrollIntoView>['0']) {
  //   return (node: HTMLElement) => node.scrollIntoView(options);
  // }
  function scrollIntoView(node: HTMLElement) {
    return (options?: Parameters<typeof node.scrollIntoView>['0']) => node.scrollIntoView(options);
  }

  let className: string | undefined = undefined;
  export { className as class };
</script>

<div bind:this={node} class={className} {...$$restProps}>
  <slot scrollIntoView={scrollIntoView(node)} />
</div>
