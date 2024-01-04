<script lang="ts">
  let self: ConstructorOfATypedSvelteComponent | undefined | null = undefined;
  export { self as this };

  let component;
</script>

{#if self}
  <svelte:component this={self} bind:this={component} {...$$restProps}>
    <slot {component} />
  </svelte:component>
{:else}
  <slot />
{/if}
