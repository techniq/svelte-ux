<script lang="ts">
  let node: HTMLElement;
</script>

<div bind:this={node} class={$$props.class} style={$$props.style}>
  <slot scrollIntoView={(options) => node.scrollIntoView(options)} />
</div>
