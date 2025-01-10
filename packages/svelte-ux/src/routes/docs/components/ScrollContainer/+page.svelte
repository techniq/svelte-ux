<script lang="ts">
  import { Button, ScrollContainer } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Basic</h2>

<Preview>
  <ScrollContainer class="scroll-mt-6 scroll-mb-6">
    {#snippet children({ scrollIntoView })}
      <Button variant="fill" color="primary" onclick={() => scrollIntoView({ block: 'end' })}
        >Scroll to bottom</Button
      >
      {#each { length: 100 } as _, i}
        <div>Item: {i + 1}</div>
      {/each}
      <Button variant="fill" color="primary" onclick={() => scrollIntoView()}>Scroll to top</Button>
    {/snippet}
  </ScrollContainer>
</Preview>
