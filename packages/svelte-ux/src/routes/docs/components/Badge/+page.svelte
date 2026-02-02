<script lang="ts">
  import { Badge, Button, getSettings, Icon, NumberStepper } from 'svelte-ux';

  import LucideListFilter from '~icons/lucide/list-filter';

  const { icons } = getSettings();

  import Preview from '$lib/components/Preview.svelte';

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
    <Button icon={LucideListFilter} variant="outline" class="p-3" />
  </Badge>
</Preview>

<h2>Icon Button w/ small</h2>

<Preview>
  <Badge {value} circle small>
    <Button icon={LucideListFilter} variant="outline" class="p-3" />
  </Badge>
</Preview>

<h2>Dot</h2>

<Preview>
  <Badge {value} dot>
    <Button icon={LucideListFilter} variant="outline" class="p-3" />
  </Badge>
</Preview>

<h2>Dot w/ small</h2>

<Preview>
  <Badge {value} dot small>
    <Button icon={LucideListFilter} variant="outline" class="p-3" />
  </Badge>
</Preview>

<h2>Style</h2>

<Preview>
  <Badge {value} circle class="bg-success text-success-content">
    <Button icon={LucideListFilter} variant="outline" class="p-3" />
  </Badge>
</Preview>

<h2>Value slot</h2>

<Preview>
  <Badge {value} circle>
    <Button icon={LucideListFilter} variant="outline" class="p-3" />
    <div slot="value" class="bg-success text-success-content rounded-full">
      <Icon data={icons.plus} />
    </div>
  </Badge>
</Preview>

<h2>Multiple</h2>

<Preview>
  <Badge placement="bottom-right" {value} dot circle class="bg-danger">
    <Badge placement="top-right" {value} dot circle class="bg-success">
      <Button icon={LucideListFilter} variant="outline" class="p-3" />
    </Badge>
  </Badge>
</Preview>

<h2>Placement</h2>

<div class="grid grid-cols-5 gap-4">
  <div>
    <h3 class="text-sm text-surface-content/50">Button w/ default</h3>
    <Preview>
      <Badge {value}>
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Button w/ top-left</h3>
    <Preview>
      <Badge {value} placement="top-left">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Button w/ top-right</h3>
    <Preview>
      <Badge {value} placement="top-right">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Button w/ bottom-left</h3>
    <Preview>
      <Badge {value} placement="bottom-left">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Button w/ bottom-right</h3>
    <Preview>
      <Badge {value} placement="bottom-right">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Button w/ default</h3>
    <Preview>
      <Badge {value} small>
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Button w/ top-left</h3>
    <Preview>
      <Badge {value} small placement="top-left">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Button w/ top-right</h3>
    <Preview>
      <Badge {value} small placement="top-right">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Button w/ bottom-left</h3>
    <Preview>
      <Badge {value} small placement="bottom-left">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Button w/ bottom-right</h3>
    <Preview>
      <Badge {value} small placement="bottom-right">
        <Button variant="outline">Example</Button>
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Icon Button w/ default</h3>
    <Preview>
      <Badge {value} circle>
        <Button icon={LucideListFilter} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Icon Button w/ top-left</h3>
    <Preview>
      <Badge {value} circle placement="top-left">
        <Button icon={LucideListFilter} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Icon Button w/ top-right</h3>
    <Preview>
      <Badge {value} circle placement="top-right">
        <Button icon={LucideListFilter} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Icon Button w/ bottom-left</h3>
    <Preview>
      <Badge {value} circle placement="bottom-left">
        <Button icon={LucideListFilter} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Icon Button w/ bottom-right</h3>
    <Preview>
      <Badge {value} circle placement="bottom-right">
        <Button icon={LucideListFilter} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Icon Button w/ default</h3>
    <Preview>
      <Badge {value} circle small>
        <Button icon={LucideListFilter} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Icon Button w/ top-left</h3>
    <Preview>
      <Badge {value} circle small placement="top-left">
        <Button icon={LucideListFilter} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Icon Button w/ top-right</h3>
    <Preview>
      <Badge {value} circle small placement="top-right">
        <Button icon={LucideListFilter} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Icon Button w/ bottom-left</h3>
    <Preview>
      <Badge {value} circle small placement="bottom-left">
        <Button icon={LucideListFilter} class="border p-3" />
      </Badge>
    </Preview>
  </div>

  <div>
    <h3 class="text-sm text-surface-content/50">Icon Button w/ bottom-right</h3>
    <Preview>
      <Badge {value} circle small placement="bottom-right">
        <Button icon={LucideListFilter} class="border p-3" />
      </Badge>
    </Preview>
  </div>
</div>
