---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script>
  import api from '$lib/components/ScrollContainer.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

  import Button from '$lib/components/Button.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import ScrollContainer from '$lib/components/ScrollContainer.svelte';
</script>

# Examples

## Basic

<Preview>
  <ScrollContainer class="scroll-mt-6 scroll-mb-6" let:scrollIntoView>
    <Button variant="filled" color="blue" on:click={() => scrollIntoView({ block: 'end' })}>Scroll to bottom</Button>
    {#each { length: 100 } as _,i}
      <div>Item: {i + 1}</div>
    {/each}
    <Button variant="filled" color="blue" on:click={() => scrollIntoView()}>Scroll to top</Button>
  </ScrollContainer>
</Preview>

# API

<ApiDocs {api} />
