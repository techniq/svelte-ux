<script lang="ts">
  let node: HTMLElement;

  // function scrollIntoView(options: Parameters<typeof node.scrollIntoView>['0']) {
  //   return (node: HTMLElement) => node.scrollIntoView(options);
  // }
  function scrollIntoView(node: HTMLElement) {
    return (options?: Parameters<typeof node.scrollIntoView>['0']) => node.scrollIntoView(options);
  }
</script>

<div bind:this={node} class={$$props.class} style={$$props.style}>
  <slot scrollIntoView={scrollIntoView(node)} />
</div>
