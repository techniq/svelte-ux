<script lang="ts">
  import { mdiFilterVariant } from '@mdi/js';

  import { Button, SectionDivider } from 'svelte-ux';
  import Preview from '$lib/components/Preview.svelte';
</script>

<h1>Examples</h1>

<h2>Default</h2>

<Preview>
  <div class="grid grid-flow-col">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<h2>Gap</h2>

<Preview>
  <div class="grid grid-flow-col gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<h2>Justify</h2>

<Preview>
  <div class="grid grid-flow-col justify-start gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<Preview>
  <div class="grid grid-flow-col justify-center gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<Preview>
  <div class="grid grid-flow-col justify-end gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<h2>Template</h2>

<Preview>
  <div class="grid grid-flow-col grid-cols-[auto,1fr,auto] gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<SectionDivider>Vertical</SectionDivider>

<h2>Default</h2>

<Preview>
  <div class="grid">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<h2>Gap</h2>

<Preview>
  <div class="grid gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<h2>Justify</h2>

<Preview>
  <div class="grid justify-start gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<Preview>
  <div class="grid justify-center gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<Preview>
  <div class="grid justify-end gap-2">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<h2>Template</h2>

<Preview>
  <div class="grid grid-rows-[auto,1fr,auto] gap-2 h-64">
    <div class="border">item</div>
    <div class="border">item</div>
    <div class="border">item</div>
  </div>
</Preview>

<SectionDivider>Stack</SectionDivider>

<h2>Default</h2>

<Preview>
  <div class="inline-grid place-items-center">
    <Button class="col-span-full row-span-full border">Example</Button>
    <div
      class="col-span-full row-span-full bg-danger rounded-full h-4 w-4 text-xs text-danger-content flex items-center justify-center"
    >
      3
    </div>
  </div>
</Preview>

<h2>Corner with Button</h2>

<Preview>
  <div class="inline-grid">
    <Button class="col-span-full row-span-full border">Example</Button>
    <div
      class="col-span-full row-span-full bg-danger rounded-full h-4 w-4 -mr-1 -mt-1 text-xs text-danger-content flex items-center justify-center self-start justify-self-end"
    >
      3
    </div>
  </div>
</Preview>

<h2>Corner with Icon Button</h2>

<Preview>
  <div class="inline-grid">
    <Button icon={mdiFilterVariant} class="col-span-full row-span-full border p-3" />
    <div
      class="col-span-full row-span-full bg-danger rounded-full h-4 w-4 text-xs text-danger-content flex items-center justify-center self-start justify-self-end"
    >
      3
    </div>
  </div>
</Preview>

<h2>Corner (multi) with Icon Button</h2>

<Preview>
  <div class="inline-grid">
    <Button icon={mdiFilterVariant} class="col-span-full row-span-full border p-3" />
    <div
      class="col-span-full row-span-full self-start justify-self-end bg-danger rounded-full h-4 w-4 -mt-1 text-xs flex items-center justify-center border border-surface-100"
    ></div>
    <div
      class="col-span-full row-span-full self-end justify-self-end bg-success rounded-full h-4 w-4 text-xs flex items-center justify-center border border-surface-100"
    ></div>
  </div>
</Preview>
