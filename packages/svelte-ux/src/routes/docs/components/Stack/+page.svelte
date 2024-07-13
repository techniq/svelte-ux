<script lang="ts">
  import { mdiFilterVariant } from '@mdi/js';

  import { Button, SectionDivider, Stack } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Default</h2>

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

<h2>Gap</h2>

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

<h2>Justify</h2>

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

<h2>Template</h2>

<Preview>
  <Stack horizontal template="auto 1fr auto" gap={8}>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

<SectionDivider>Vertical</SectionDivider>

<h2>Default</h2>

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

<h2>Gap</h2>

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

<h2>Justify</h2>

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

<h2>Template</h2>

<Preview>
  <Stack vertical template="auto 1fr auto" gap={8} class="h-64">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </Stack>
</Preview>

<SectionDivider>Stack</SectionDivider>

<h2>Default</h2>

<Preview>
  <Stack stack inline>
    <Button variant="outline">Example</Button>
    <div
      class="bg-danger rounded-full h-4 w-4 text-xs text-danger-content flex items-center justify-center"
    >
      3
    </div>
  </Stack>
</Preview>

<h2>Corner with Button</h2>

<Preview>
  <Stack stack inline>
    <Button variant="outline">Example</Button>
    <div
      class="bg-danger rounded-full h-4 w-4 -mr-1 -mt-1 text-xs text-danger-content flex items-center justify-center self-start justify-self-end"
    >
      3
    </div>
  </Stack>
</Preview>

<h2>Corner with Icon Button</h2>

<Preview>
  <Stack stack inline>
    <Button variant="outline" icon={mdiFilterVariant} class="p-3" />
    <div
      class="bg-danger rounded-full h-4 w-4 text-xs text-danger-content flex items-center justify-center self-start justify-self-end"
    >
      3
    </div>
  </Stack>
</Preview>

<h2>Corner (multi) with Icon Button</h2>

<Preview>
  <Stack stack inline>
    <Button variant="outline" icon={mdiFilterVariant} class="p-3" />
    <div
      class="bg-danger rounded-full h-4 w-4 -mt-1 text-xs flex items-center justify-center self-start justify-self-end border border-surface-100"
    ></div>
    <div
      class="bg-success rounded-full h-4 w-4 text-xs flex items-center justify-center self-end justify-self-end border border-surface-100"
    ></div>
  </Stack>
</Preview>
