---
name: $name
sourceUrl: $sourceUrl
docUrl: $docUrl
---

<script lang="ts">
  import { mdiFilterVariant } from '@mdi/js';

  import api from '$lib/components/Stack.svelte?raw&sveld';
  import ApiDocs from '$lib/components/ApiDocs.svelte';

	import Button from '$lib/components/Button.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import SectionDivider from '$lib/components/SectionDivider.svelte';
</script>

# Examples

## Default

<Preview>
  <Stack horizontal>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

## Gap

<Preview>
  <Stack horizontal gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

## Justify

<Preview>
  <Stack horizontal justify="start" gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

<Preview>
  <Stack horizontal justify="center" gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

<Preview>
  <Stack horizontal justify="end" gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

## Template

<Preview>
  <Stack horizontal template="auto 1fr auto" gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

<SectionDivider>Vertical</SectionDivider>

## Default

<Preview>
  <Stack vertical>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

## Gap

<Preview>
  <Stack vertical gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

## Justify

<Preview>
  <Stack vertical justify="start" gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

<Preview>
  <Stack vertical justify="center" gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

<Preview>
  <Stack vertical justify="end" gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

## Template

<Preview>
  <Stack vertical template="auto 1fr auto" gap={8} class="h-64">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

<SectionDivider>Stack</SectionDivider>

## Default

<Preview>
  <Stack stack inline>
    <Button variant="outlined">Example</Button>
    <div
      class="bg-red-500 rounded-full h-4 w-4 text-xs text-white flex items-center justify-center "
    >
      3
    </div>
  </Stack>
</Preview>

## Corner w/ Button

<Preview>
  <Stack stack inline>
    <Button variant="outlined">Example</Button>
    <div
      class="bg-red-500 rounded-full h-4 w-4 -mr-1 -mt-1 text-xs text-white flex items-center justify-center self-start justify-self-end"
    >
      3
    </div>
  </Stack>
</Preview>

## Corner /w Icon Button

<Preview>
  <Stack stack inline>
    <Button variant="outlined" icon={mdiFilterVariant} class="p-3" />
    <div
      class="bg-red-500 rounded-full h-4 w-4 text-xs text-white flex items-center justify-center self-start justify-self-end"
    >
      3
    </div>
  </Stack>
</Preview>

## Corner (multi) /w Icon Button

<Preview>
  <Stack stack inline>
    <Button variant="outlined" icon={mdiFilterVariant} class="p-3" />
    <div class="bg-red-500 rounded-full h-4 w-4 -mt-1 text-xs flex items-center justify-center self-start justify-self-end border border-white" />
    <div class="bg-green-500 rounded-full h-4 w-4 text-xs flex items-center justify-center self-end justify-self-end border border-white" />
  </Stack>
</Preview>

# API

<ApiDocs {api} />
