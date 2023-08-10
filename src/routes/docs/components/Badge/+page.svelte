<script lang="ts">
  import { mdiFilterVariant, mdiPlus, mdiMinus } from '@mdi/js';

  import Badge from '$lib/components/Badge.svelte';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import NumberStepper from '$lib/components/NumberStepper.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';

  let value = 1;
</script>

<h1>Examples</h1>

<NumberStepper bind:value />

<h2>Button</h2>

<Preview>
  <Badge {value}>
    <Button variant="outline">Example</Button>
  </Badge>
</Preview>

<h2>Button w/ small</h2>

<Preview>
  <Badge {value} small>
    <Button variant="outline">Example</Button>
  </Badge>
</Preview>

<h2>Icon Button</h2>

<Preview>
  <Badge {value} circle>
    <Button icon={mdiFilterVariant} variant="outline" class="p-3" />
  </Badge>
</Preview>

<h2>Icon Button w/ small</h2>

<Preview>
  <Badge {value} circle small>
    <Button icon={mdiFilterVariant} variant="outline" class="p-3" />
  </Badge>
</Preview>

<h2>Dot</h2>

<Preview>
  <Badge {value} dot>
    <Button icon={mdiFilterVariant} variant="outline" class="p-3" />
  </Badge>
</Preview>

<h2>Dot w/ small</h2>

<Preview>
  <Badge {value} dot small>
    <Button icon={mdiFilterVariant} variant="outline" class="p-3" />
  </Badge>
</Preview>

<h2>Style</h2>

<Preview>
  <Badge {value} circle class="bg-green-500">
    <Button icon={mdiFilterVariant} variant="outline" class="p-3" />
  </Badge>
</Preview>

<h2>Value slot</h2>

<Preview>
  <Badge {value} circle>
    <Button icon={mdiFilterVariant} variant="outline" class="p-3" />
    <div slot="value" class="bg-green-500 text-white rounded-full">
      <Icon path={mdiPlus} />
    </div>
  </Badge>
</Preview>

<h2>Multiple</h2>

<Preview>
  <Badge placement="bottom-right" {value} dot circle class="bg-red-500">
    <Badge placement="top-right" {value} dot circle class="bg-green-500">
      <Button icon={mdiFilterVariant} variant="outline" class="p-3" />
    </Badge>
  </Badge>
</Preview>

<h2>Placement</h2>

<div class="grid grid-cols-5 gap-4">
  <div>
    <h3 class="text-sm text-black/50">Button w/ default</h3>
    <Preview>
      <Badge {value}>
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Button w/ top-left</h3>
    <Preview>
      <Badge {value} placement="top-left">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Button w/ top-right</h3>
    <Preview>
      <Badge {value} placement="top-right">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Button w/ bottom-left</h3>
    <Preview>
      <Badge {value} placement="bottom-left">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Button w/ bottom-right</h3>
    <Preview>
      <Badge {value} placement="bottom-right">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Button w/ default</h3>
    <Preview>
      <Badge {value} small>
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Button w/ top-left</h3>
    <Preview>
      <Badge {value} small placement="top-left">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Button w/ top-right</h3>
    <Preview>
      <Badge {value} small placement="top-right">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Button w/ bottom-left</h3>
    <Preview>
      <Badge {value} small placement="bottom-left">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Button w/ bottom-right</h3>
    <Preview>
      <Badge {value} small placement="bottom-right">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Icon Button w/ default</h3>
    <Preview>
      <Badge {value} circle>
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Icon Button w/ top-left</h3>
    <Preview>
      <Badge {value} circle placement="top-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Icon Button w/ top-right</h3>
    <Preview>
      <Badge {value} circle placement="top-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Icon Button w/ bottom-left</h3>
    <Preview>
      <Badge {value} circle placement="bottom-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Icon Button w/ bottom-right</h3>
    <Preview>
      <Badge {value} circle placement="bottom-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Icon Button w/ default</h3>
    <Preview>
      <Badge {value} circle small>
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Icon Button w/ top-left</h3>
    <Preview>
      <Badge {value} circle small placement="top-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Icon Button w/ top-right</h3>
    <Preview>
      <Badge {value} circle small placement="top-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Icon Button w/ bottom-left</h3>
    <Preview>
      <Badge {value} circle small placement="bottom-left">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-black/50">Icon Button w/ bottom-right</h3>
    <Preview>
      <Badge {value} circle small placement="bottom-right">
        <Button icon={mdiFilterVariant} class="border p-3" />
      </Badge>
    </Preview>
  </div>
</div>
